export interface Results {
  meta: Meta;
  links: Links;
  data: Category[];
}

export interface Result {
  data: Category;
  meta: Meta;
  links: Links;
}

export interface Category {
  id: string;
  name: string;
  deleted_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  description: null | string;
}

export interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}

export interface Meta {
  currentPage: number;
  from: number;
  lastPage: number;
  path: string;
  perPage: number;
  to: number;
  total: number;
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}
