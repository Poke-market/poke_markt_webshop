export interface ApiResponse {
  status: string;
  data: {
    info: {
      count: number;
      page: number;
      pages: number;
      prev: string | null;
      next: string | null;
      first: string;
      last: string;
    };
    items: {
      _id: string;
      name: string;
      description: string;
      photoUrl: string;
      price: number;
      category: string;
      tags: string[];
      createdAt: string;
      updatedAt: string;
    }[];
  };
}
