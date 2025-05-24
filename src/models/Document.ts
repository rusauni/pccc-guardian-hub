/**
 * Document model interfaces for the application
 */

/**
 * Document interface matching the API response structure
 */
export interface Document {
  id: number;
  title: string;
  file: string;
  fileUrl?: string; // Added field for the full URL
  description: string | null;
  category: number | {
    name: string;
  };
  document_number: string;
  document_type?: string;
  document_type_id?: {
    document_type_name: string;
  };
  issuing_agency?: string;
  agency_id?: {
    agency_name: string;
  };
  effective_date?: string;
  sub_category?: string | null;
  tags?: number[];
}

/**
 * API response structure for document collections
 */
export interface DocumentsResponse {
  data: Document[];
  meta?: {
    total_count: number;
    filter_count: number;
  };
}
