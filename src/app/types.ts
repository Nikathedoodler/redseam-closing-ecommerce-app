type Product = {
  id: number;
  name: string;
  release_year: string;
  cover_image: string;
  price: number;
};

type ProductResponse = {
  available_colors: string[];
  available_sizes: string[];
  brand: {
    id: number;
    image: string;
    name: string;
  };
  cover_image: string;
  description: string;
  id: number;
  images: string[];
  name: string;
  price: number;
  quantity: number;
  release_year: string;
  size: string;
  total_price: number;
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

type HeaderCartCount = {
  count: number;
  onCartClick: () => void;
};

export type { ProductsResponse, Product, ProductResponse, HeaderCartCount };
