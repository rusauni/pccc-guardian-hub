import axios from 'axios';
import { API_BASE, BASE_URL, getAssetUrl } from '@/config/api';

export interface PostDetail {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  thumbnailUrl: string;
  summary: string;
  content: any; // Using any type as per requirement for EditorParser to parse JSON to HTML
  date_created: string;
  category: {
    name: string;
    slug: string;
    id: number;
  };
}

export interface PostDetailResponse {
  data: PostDetail[];
}

// Process content blocks to handle image and video URLs

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
            url: `${BASE_URL}${block.data.file.url}`
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
            url: `${BASE_URL}${block.data.file.url}`
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
      `${API_BASE}/items/articles`,
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
          blocks: post.content.blocks
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
