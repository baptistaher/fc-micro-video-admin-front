export const categoryResponse = {
  data: [
    {
      id: '1',
      name: 'Category 1',
      description: 'Description for Category 1',
      is_active: true,
      created_at: '2024-06-01T00:00:00Z',
      updated_at: '2024-06-01T00:00:00Z',
      deleted_at: null,
    },
  ],
  links: {
    first: 'http://localhost:8000/categories?page=1',
    last: 'http://localhost:8000/categories?page=1',
    prev: '',
    next: '',
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 10,
    path: 'http://localhost:8000/categories',
    to: 1,
    total: 1,
  },
};
