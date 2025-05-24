import { PostSearchResult } from '@/repository/SearchPostsByKeyword';
import { DocumentSearchResult } from '@/repository/SearchDocumentsByKeyword';

export type SearchResultType = 'Post' | 'Document';

export interface SearchResultItem {
  type: SearchResultType;
  id: number;
  postInfo?: PostSearchResult;
  documentInfo?: DocumentSearchResult;
  title: string; // Computed property based on type
  url: string; // Computed property for navigation or preview
}

/**
 * Create a unified search result item from a post
 */
export const createPostSearchResult = (post: PostSearchResult): SearchResultItem => ({
  type: 'Post',
  id: post.id,
  postInfo: post,
  title: post.title,
  url: `/${post.category.slug}/${post.slug}`
});

/**
 * Create a unified search result item from a document
 */
export const createDocumentSearchResult = (document: DocumentSearchResult): SearchResultItem => ({
  type: 'Document',
  id: document.id,
  documentInfo: document,
  title: document.title,
  url: document.fileUrl || ''
});

/**
 * Transform API search results into unified search result items
 */
export const transformSearchResults = (
  posts: PostSearchResult[], 
  documents: DocumentSearchResult[]
): SearchResultItem[] => {
  const postResults = posts.map(createPostSearchResult);
  const documentResults = documents.map(createDocumentSearchResult);
  
  // Combine both result types
  return [...postResults, ...documentResults];
};
