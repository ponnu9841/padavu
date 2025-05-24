type ReactChildren = {
   children: React.ReactNode;
};

type ExtendedFile = File & {
   url: string;
};

type PaginationResponse = {
   page: number;
   limit: number;
   totalItems: number;
   totalPages: number;
   hasNextPage: boolean;
   hasPreviousPage: boolean;
};

type Banner = {
   id: string;
   image: string;
   alt?: string;
   title?: string;
   description?: string;
};

type Package = {
   id: string;
   title: string;
   description: string;
   long_description: string | null;
   image: string;
   alt: string | null;
   price: string;
};

type Client = {
   id: string;
   image: string;
   alt: string | null;
};

type Work = {
   id: string;
   image: string;
   alt: string | null;
   title: string | null;
   description: string | null;
};

type WorksResponse = PaginationResponse & {
   data: Work[] | [];
};
