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
  delete_at: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  description: null | string;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: null;
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
