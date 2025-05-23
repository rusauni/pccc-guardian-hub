import axios from 'axios';
import { API_BASE } from '@/config/api';

/**
 * Document interface matching the API response structure
 */
export interface Document {
  id: number;
  title: string;
  file: string;
  fileUrl?: string; // Added field for the full URL
  description: string | null;
  category: any | null;
  document_number: string;
  document_type: string;
  issuing_agency: string;
  effective_date: string;
}

/**
 * API response structure for document collections
 */
export interface DocumentsResponse {
  data: Document[];
}

/**
 * Fetches all documents from the API
 * @returns Promise containing an array of Document objects
 */
export const getAllDocuments = async (): Promise<Document[]> => {
  try {
    const response = await axios.get<DocumentsResponse>(
      `${API_BASE}/items/documents`,
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
    console.error('Error fetching documents:', error);
    throw error; // Re-throw to let the component handle it
  }
};

