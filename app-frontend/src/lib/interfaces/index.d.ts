type PageProps = {
   params: Promise<{ slug: string }>;
};

type Banner = {
   id: string;
   image: string;
   alt?: string;
   title?: string;
   description?: string;
};

type CarouselCardProps = {
   cardContentClassName?: string | undefined;
   cardClassName?: string | undefined;
   carouselItemClassName?: string | undefined;
   children?: React.ReactNode | string;
};

type CarouselSliderProps = CarouselCardProps & {
   images?: Banner[];
   carouselContentClassName?: string | undefined;
   orientation?: "horizontal" | "vertical" | undefined;
   id?: string;
   togglerPosition?: string;
   showTitle?: boolean;
   enableScroll?: boolean;
   renderBackground?: boolean;
   loop?: boolean;
};

type Testimonial = {
   id: string;
   image: string;
   alt: string | null;
   name: string;
   designation: string | null;
   testimonial: string;
};

type WorkCardProps = {
   image: string;
   heading: string;
   category: string;
   style: string;
};

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

type PackagesData = {
   id: string;
   title: string;
   image: string;
   alt: string | null;
   price: string;
};

type Client = {
   id: string;
   image: string;
   alt: string | null;
};

type ClientsResponse = PaginationResponse & {
   data: Client[] | [];
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

type Experts = {
   id: string;
   image: string;
   alt: string | null;
   title: string;
   description: string;
};

type Product = {
   id: string;
   image: string;
   alt: string | null;
   title: string;
   description: string | null;
};

type Blog = {
   id: string;
   title: string;
   content: string;
   image: string;
   alt?: string | null;
   createdAt: string;
   updatedAt: string;
};

type Vlog = {
   id: string;
   url: string;
}

type BlogResponse = PaginationResponse & {
   data: Blog[] | [];
};

type VlogResponse = PaginationResponse & {
   data : Vlog[] | [];
}

type About = {
   id: string;
   image: string;
   alt: string | null;
   short_description: string;
   long_description: string | null;
};

type Mission = {
   id: string;
   image: string;
   alt: string | null;
   description: string;
};

type Vision = Mission;

type Seo = {
   id: string;
   title: string;
   description: string;
   page: string;
};

type PagesBanner = {
   id: string;
   image: string;
   alt: string | null;
   title: string | null;
   page: string;
};

type Heading = {
   id: string;
   title: string;
   description: string | null;
   section: string;
};

type Seo = {
   id: string;
   title: string;
   description: string;
   page: string;
}

type Contact = {
   id: string;
   location: string;
   map: string | null;
   contactno_one: string;
   contactno_two: string | null;
   email_one: string;
   email_two: string | null;
};

