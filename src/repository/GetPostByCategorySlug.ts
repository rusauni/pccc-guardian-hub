import axios from 'axios';

export interface Post {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  thumbnailUrl: string;
  summary: string;
  date_updated: string;
  category: {
    name: string;
    slug: string;
    id: number;
  };
}

export interface PostResponse {
  data: Post[];
}

const BASE_URL = 'https://dashboard.pccc40.com';

export const getPostsByCategorySlug = async (categorySlug: string): Promise<Post[]> => {
  try {
    const response = await axios.get<PostResponse>(
      `${BASE_URL}/items/articles`,
      {
        params: {
          'filter[category][slug][_eq]': categorySlug,
          fields: 'id,title,slug,thumbnail,summary,date_updated,category.name,category.slug,category.id'
        }
      }
    );

    // Transform the response to add thumbnailUrl
    const transformedPosts = response.data.data.map(post => ({
      ...post,
      thumbnailUrl: `${BASE_URL}/assets/${post.thumbnail}`
    }));

    return transformedPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}; 