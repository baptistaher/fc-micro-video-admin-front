export interface Results {
  data: CastMember[];
  links: Links;
  meta: Meta;
}

export interface Result {
  data: CastMember;
  links: Links;
  meta: Meta;
}

export interface CastMember {
  id: string;
  createdAt: string;

  name: string;

  type: number;
  updatedAt: string;

  deletedAt: string | null;
}

export interface Links {
  first: string;
  last: string;
  next: string;
  prev: string;
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

export interface CastMemberParams {
  page?: number;
  perPage?: number;
  type?: number;
  search?: string;
  // isActive?: boolean;
}
