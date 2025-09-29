type Product = {
  id: number;
  name: string;
  release_year: string;
  cover_image: string;
  price: number;
};

type ProductsResponse = {
  data: Product[];
  links: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
  meta: {
    current_page: number;
    current_page_url: string;
    from: number;
    path: string;
    per_page: number;
    to: number;
    total?: number;
    last_page: number;
  };
};

export type { ProductsResponse, Product };
