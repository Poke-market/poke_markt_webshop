export interface paginationInfo {
  count: number;
  page: number;
  pages: number;
  prev: null;
  next: null;
  first: null;
  last: null;
}

export interface requestInfo {
  endpoint: string;
  method: string;
}
