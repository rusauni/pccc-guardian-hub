// Centralized category management for the application

// Category interface
export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  order: number;
  children?: Category[];
}

// Categories as a record object for direct access via property names
export const CATEGORIES = {
  TIN_TUC_PCCC: {
    id: 1,
    name: "Tin tức PCCC",
    slug: "tin-tuc-pccc",
    parent_id: null,
    order: 0
  },
  HUONG_DAN: {
    id: 2,
    name: "Hướng dẫn",
    slug: "huong-dan",
    parent_id: null,
    order: 1
  },
  HUONG_DAN_CONG_DONG: {
    id: 3,
    name: "Hướng dẫn cộng đồng",
    slug: "huong-dan-cong-dong",
    parent_id: 2,
    order: 2
  },
  HUONG_DAN_NGHIEP_VU: {
    id: 4,
    name: "Hướng dẫn nghiệp vụ",
    slug: "huong-dan-nghiep-vu",
    parent_id: 2,
    order: 3
  },
  THU_TUC_HANH_CHINH: {
    id: 5,
    name: "Thủ tục hành chính",
    slug: "thu-tuc-hanh-chinh",
    parent_id: null,
    order: 4
  },
  TAI_LIEU: {
    id: 6,
    name: "Tài liệu",
    slug: "tai-lieu",
    parent_id: null,
    order: 5
  },
  VAN_BAN_PHAP_QUY: {
    id: 7,
    name: "Văn bản pháp quy",
    slug: "van-ban-phap-quy",
    parent_id: 6,
    order: 6
  },
  NGHIEN_CUU_TRAO_DOI: {
    id: 8,
    name: "Nghiên cứu - Trao đổi",
    slug: "nghien-cuu-trao-doi",
    parent_id: 6,
    order: 7
  },
  VIDEO_KY_NANG_PCCC: {
    id: 9,
    name: "Video kỹ năng PCCC",
    slug: "video-ky-nang-pccc",
    parent_id: null,
    order: 8
  }
} as const;

// Type for category keys
export type CategoryKey = keyof typeof CATEGORIES;

// Get array of all categories for iteration
export const CATEGORIES_ARRAY = Object.values(CATEGORIES) as Category[];

// Helper function to get category by slug
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return CATEGORIES_ARRAY.find(category => category.slug === slug);
};

// Helper function to get category by ID
export const getCategoryById = (id: number): Category | undefined => {
  return CATEGORIES_ARRAY.find(category => category.id === id);
};

// Helper function to get children of a category
export const getChildCategories = (parentId: number | null): Category[] => {
  return CATEGORIES_ARRAY.filter(category => category.parent_id === parentId);
};

// Build hierarchical category structure
export const buildCategoryTree = (): Category[] => {
  const rootCategories = CATEGORIES_ARRAY.filter(category => category.parent_id === null);
  
  const result = rootCategories.map(rootCategory => {
    const children = getChildCategories(rootCategory.id);
    return {
      ...rootCategory,
      children: children.length > 0 ? children : undefined
    };
  });
  
  return result.sort((a, b) => a.order - b.order);
};

// Get all categories in hierarchical structure
export const CATEGORY_TREE = buildCategoryTree();
