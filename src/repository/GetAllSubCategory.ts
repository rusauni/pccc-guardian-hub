import axios from 'axios';
import { API_BASE } from '@/config/api';
import { SubCategory, SubCategoriesResponse } from '@/models/SubCategory';

/**
 * Fetches all subcategories from the API
 * @returns Promise containing an array of SubCategory objects
 */
export const getAllSubCategories = async (): Promise<SubCategory[]> => {
  try {
    const response = await axios.get<SubCategoriesResponse>(
      `${API_BASE}/items/sub_category`, {
        params: {
          'fields': 'id,sub_name,slug,category_id.id,category_id.name,category_id.slug'
        },
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error; // Re-throw to let the component handle it
  }
};

/**
 * Fetches subcategories filtered by category ID
 * @param categoryId The ID of the category to filter subcategories by
 * @returns Promise containing an array of SubCategory objects
 */
export const getSubCategoriesByCategoryId = async (categoryId: number): Promise<SubCategory[]> => {
  try {
    const allSubCategories = await getAllSubCategories();
    
    // Filter subcategories by category ID
    return allSubCategories.filter(subCategory => 
      subCategory.category_id.id === categoryId
    );
  } catch (error) {
    console.error(`Error fetching subcategories for category ${categoryId}:`, error);
    throw error; // Re-throw to let the component handle it
  }
};
