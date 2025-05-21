import axios from 'axios';
import { API_BASE, ENDPOINTS, getAssetUrl } from '@/config/api';

export interface FeaturedArticle {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  date_created: string;
  category: {
    name: string;
    slug: string;
    id: number;
  };
}

export interface FeaturedArticlesResponse {
  data: Array<{
    id: number;
    title: string;
    articles: Array<{
      articles_id: FeaturedArticle;
    }>;
  }>;
}

export const getFeaturedPosts = async (): Promise<FeaturedArticle[]> => {
  try {
    console.log('Fetching featured articles from:', ENDPOINTS.FEATURED_ARTICLES);
    
    const response = await axios.get<FeaturedArticlesResponse>(
      ENDPOINTS.FEATURED_ARTICLES,
      {
        params: {
          fields: [
            'id',
            'title',
            'articles.articles_id.id',
            'articles.articles_id.title',
            'articles.articles_id.slug',
            'articles.articles_id.thumbnail',
            'articles.articles_id.date_created',
            'articles.articles_id.category.name',
            'articles.articles_id.category.slug',
            'articles.articles_id.category.id'
          ].join(',')
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      }
    );

    console.log('API Response:', response.data);

    if (!response.data?.data?.[0]?.articles) {
      console.warn('Unexpected API response structure:', response.data);
      return [];
    }

    // Transform the response to match the existing pattern
    const featuredArticles = response.data.data[0].articles;
    return featuredArticles.map(item => ({
      ...item.articles_id,
      thumbnail: item.articles_id.thumbnail,
      thumbnailUrl: getAssetUrl(item.articles_id.thumbnail)
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Check specifically for CORS errors
      if (error.message === 'Network Error' && !error.response) {
        console.error('CORS Error detected when fetching featured posts. This is likely due to the API server blocking requests from this origin.');
        console.error('Try using a CORS proxy or configure the API server to allow requests from this origin.');
      }
      
      console.error('Axios error details:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        responseData: error.response?.data,
        requestUrl: error.config?.url,
        requestMethod: error.config?.method,
        requestHeaders: error.config?.headers,
      });
    } else {
      console.error('Unexpected error fetching featured posts:', error);
    }
    throw error; // Re-throw to let the component handle it
  }
};
