export interface PaginationConfig {
  total?: number;
  page: number;
  limit: number;
  sort?: number;
  sortBy?: number;
}
export interface PageData {
  total?: number;
  records: number;
}
