import axios from 'axios';
import { API_BASE } from '@/config/api';

/**
 * Document interface matching the API response structure for search results
 */
export interface DocumentSearchResult {
  id: number;
  title: string;
  file: string;
  fileUrl?: string; // Added field for the full URL
  description: string | null;
  category: number | null;
  document_number: string;
  document_type: string;
  issuing_agency: string;
  effective_date: string;
  tags?: number[];
}

/**
 * API response structure for document search results
 */
export interface DocumentSearchResponse {
  data: DocumentSearchResult[];
  meta: {
    total_count: number;
    filter_count: number;
  };
}

/**
 * Searches for documents by keyword
 * @param keyword The search term to look for in documents
 * @returns Promise containing an array of DocumentSearchResult objects
 */
export const searchDocumentsByKeyword = async (keyword: string): Promise<DocumentSearchResult[]> => {
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const response = await axios.get<DocumentSearchResponse>(
      `${API_BASE}/items/documents?search=${encodedKeyword}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    // Add the full URL to each document's file
    const documentsWithFileUrls = response.data.data.map(doc => ({
      ...doc,
      fileUrl: doc.file ? `http://dashboard.pccc40.com/assets/${doc.file}` : undefined
    }));

    return documentsWithFileUrls;
  } catch (error) {
    console.error('Error searching documents:', error);
    throw error; // Re-throw to let the component handle it
  }
};
