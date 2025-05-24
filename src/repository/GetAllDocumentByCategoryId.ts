import axios from 'axios';
import { API_BASE } from '@/config/api';
import { Document, DocumentsResponse } from '@/models/Document';

/**
 * Fetches documents from the API filtered by category ID
 * @param categoryId The ID of the category to filter documents by
 * @returns Promise containing an array of Document objects
 */
export const getAllDocumentByCategoryId = async (categoryId: number): Promise<Document[]> => {
  try {
    const response = await axios.get<DocumentsResponse>(
      `${API_BASE}/items/documents`, {
        params: {
          'filter[category][_eq]': categoryId,
          'fields': 'id,title,file,description,category.name,document_number,sub_category,agency_id,document_type_id,agency_id.agency_name,document_type_id.document_type_name,effective_date'
        },
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
    console.error(`Error fetching documents for category ${categoryId}:`, error);
    throw error; // Re-throw to let the component handle it
  }
};
