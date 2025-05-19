import axios from 'axios';

export interface PostDetail {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  thumbnailUrl: string;
  summary: string;
  content: any; // Using any type as per requirement for EditorParser to parse JSON to HTML
  date_updated: string;
  category: {
    name: string;
    slug: string;
    id: number;
  };
}

export interface PostDetailResponse {
  data: PostDetail[];
}

// Use proxy in development to avoid CORS issues
const isDevelopment = import.meta.env.MODE === 'development';
const BASE_URL = isDevelopment ? '/api' : 'https://dashboard.pccc40.com';

const processContentBlocks = (blocks: any[]): any[] => {
  if (!blocks || !Array.isArray(blocks)) return [];
  
  return blocks.map(block => {
    if (block.type === 'image' && block.data?.file?.url) {
      // Process image block
      return {
        ...block,
        data: {
          ...block.data,
          file: {
            ...block.data.file,
            url: `https://dashboard.pccc40.com${block.data.file.url}`
          }
        }
      };
    } else if (block.type === 'video' && block.data?.file?.url) {
      // Process video block
      return {
        ...block,
        data: {
          ...block.data,
          file: {
            ...block.data.file,
            url: `https://dashboard.pccc40.com${block.data.file.url}`
          }
        }
      };
    }
    return block;
  });
};

export const getPostDetailBySlug = async (slug: string): Promise<PostDetail | null> => {
  try {
    const response = await axios.get<PostDetailResponse>(
      `${BASE_URL}/items/articles`,
      {
        params: {
          'filter[slug][_eq]': slug,
          limit: 1,
          fields: '*,category.name,category.slug,category.id',
        }
      }
    );

    if (response.data.data && response.data.data.length > 0) {
      const post = response.data.data[0];
      
      // Process content blocks if they exist
      if (post.content?.blocks) {
        post.content = {
          ...post.content,
          blocks: processContentBlocks(post.content.blocks)
        };
      }
      
      return post;
    }
    return null;
  } catch (error) {
    console.error('Error fetching post detail:', error);
    throw error;
  }
};
