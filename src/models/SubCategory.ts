/**
 * SubCategory model interfaces for the application
 */

/**
 * SubCategory interface matching the API response structure
 */
export interface SubCategory {
  id: number;
  sub_name: string;
  slug: string;
  category_id: {
    id: number;
    name: string;
    slug: string;
  };
}

/**
 * API response structure for subcategory collections
 */
export interface SubCategoriesResponse {
  data: SubCategory[];
  meta?: {
    total_count: number;
    filter_count: number;
  };
}
