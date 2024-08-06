
export type Theme = {
  id: string;
  name: string;
  slug: string;
  image: string;
  status:  boolean;
  active:  boolean;
  system_reserved:  boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type Paris = {
  id: string;
  content: Content;
  slug: string;
}

export type Content = {
  home_banner : HomeBanner;
  featured_banners: FeaturedBanners;
  main_content: MainContent;
  news_letter: NewsLetter;
  products_ids: string[];
}

export type HomeBanner = {
  status: boolean;
  main_banner: Link;
  sub_banner_1: Link;
  sub_banner_2: Link;
}

export type Link = {
  redirect_link: RedirectLink;
  image_url: string;
}

export type RedirectLink = {
  link_type: string;
  link: string | number;
  product_ids: number;
}

export type FeaturedBanners = {
  title?: string
  status: boolean;
  banners: Banners[];
}

export type Banners = {
  redirect_link: RedirectLink;
  image_url: string;
  status: boolean;
}

export type MainContent = {
  status: boolean;
  sidebar : Sidebar;
  section1_products: ProductSection;
  section2_categories_list: CategoriesSection;
  section3_two_column_banners: TwoBanners;
  section4_products: ProductSection;
  section5_coupons: FullWidthBanner;
  section6_two_column_banners: TwoBanners;
  section7_products: ProductSection;
  section8_full_width_banner: FullWidthBanner;
  section9_featured_blogs: BlogSection;
}

export type Sidebar = {
  status: boolean;
  categories_icon_list: CategoriesIconList;
  left_side_banners: TwoBanners;
  sidebar_products: SidebarProducts;
}

export type CategoriesIconList = {
  title: string;
  description?: string;
  image_url?: string;
  category_ids: string[];
  status: boolean;
}

export type TwoBanners = {
  status: boolean;
  banner_1: Link;
  banner_2: Link;
}

export type SidebarProducts = {
  title: string;
  product_ids: string[];
  status: boolean;
}

export type ProductSection = {
  title: string;
  description?: string;
  product_ids: string[];
  status: boolean;
}

export type CategoriesSection = {
  title: string;
  description: string;
  category_ids?: string[];
  image_url: string;
  status: boolean;
}

export type FullWidthBanner = {
  redirect_link: RedirectLink;
  image_url: string;
  status: boolean;
}

export type BlogSection = {
  title: string;
  description?: string;
  status: boolean;
  blog_ids: string[];
}

export type NewsLetter = {
  title: string;
  sub_title: string;
  image_url: string;
  status: boolean;
}

//  Tokyo Interface
export type Tokyo = {
  id: string;
  content: ContentTokyo;
  slug: string;
}

export type ContentTokyo = {
  home_banner: HomeBanner;
  categories_icon_list: CategoriesIconListTokyo;
  coupons: FullWidthBanner;
  featured_banners: FeaturedBanners;
  main_content: MainContentTokyo;
  full_width_banner: FullWidthBanner;
  slider_products: SliderProductsTokyo;
  news_letter: NewsLetter;
  products_ids: string[];
}

export type CategoriesIconListTokyo = {
  title?: string;
  status: boolean;
  category_ids: string[];
  image_url: string
}

export type MainContentTokyo = {
  sidebar: SidebarTokyo;
  section1_products: ProductSection;
  section2_slider_products: ProductSection;
  section3_products: ProductSection;
  section4_products: ProductSection;
}

export type SidebarTokyo = {
  status: boolean;
  right_side_banners: TwoBanners;
}

export type SliderProductsTokyo = {
  status: boolean;
  product_slider_1?: ProductSection;
  product_slider_2?: ProductSection;
  product_slider_3?: ProductSection;
  product_slider_4?: ProductSection;
}

//  Osaka Interface
export type Osaka = {
  id: string;
  content: ContentOsaka;
  slug: string;
}

export type ContentOsaka = {
  home_banner: HomeBannerOsaka;
  categories_icon_list: CategoriesSection;
  coupons: FullWidthBanner;
  products_list_1: ProductSection;
  offer_banner: FullWidthBanner;
  products_list_2: ProductSection;
  product_bundles: ProductBundles;
  slider_products: SliderProductsTokyo;
  featured_blogs: BlogSection;
  news_letter: NewsLetter;
  products_ids: string[];
}

export type HomeBannerOsaka = {
  status: boolean;
  main_banner: Link;
  sub_banner_1: Link;
}

export type ProductBundles = {
  status: boolean;
  bundles: Bundles[];
}

export type Bundles = {
  title: string;
  sub_title: string;
  redirect_link: RedirectLink;
  image_url: string;
  status: boolean
}

//  Rome Interface
export type Rome = {
  id: string;
  content: ContentRome;
  slug: string
}

export type ContentRome = {
  home_banner: homeBannerRome;
  categories_image_list: CategoriesIconListTokyo;
  value_banners: FeaturedBanners;
  categories_products: CategoriesIconList;
  two_column_banners: TwoBanners;
  slider_products: SliderProductsTokyo;
  full_width_banner: FullWidthBanner;
  products_list_1: ProductSection;
  featured_blogs: BlogSection
  news_letter: NewsLetter;
  products_ids: string[];
}

export type homeBannerRome = {
  status: boolean;
  bg_image_url: string;
  main_banner: Link;
  sub_banner_1: Link;
  sub_banner_2: Link;
  sub_banner_3: Link;
}

//  Madrid Interface
export type Madrid = {
  id: string;
  content: MadridContent;
  slug: string;
}

export type MadridContent = {
  home_banner: HomeBannerMadrid;
  featured_banners: FeaturedBanners;
  categories_image_list: CategoriesIconListTokyo;
  products_list_1: ProductSection;
  bank_wallet_offers: BankWalletOffers;
  product_with_deals: ProductWithDeals;
  full_width_banner: FullWidthBanner;
  products_list_2: ProductSection;
  products_list_3: ProductSection;
  two_column_banners: TwoBanners;
  products_list_4: ProductSection;
  products_list_5: ProductSection;
  delivery_banners: TwoBanners
  products_list_6: ProductSection;
  products_list_7: ProductSection;
  featured_blogs: BlogSection;
  products_ids: string[];
}

export type HomeBannerMadrid = {
  status: boolean;
  main_banner: Link;
}

export type BankWalletOffers = {
  title: string;
  status: boolean;
  offers : Offer[];
}

export type Offer = {
  coupon_code: string;
  image_url: string;
  redirect_link: RedirectLink;
  status: boolean;
}

export type ProductWithDeals = {
  title: string;
  status: boolean;
  products_list: ProductSection;
  deal_of_days: DealOfDays;
}

export type DealOfDays = {
  title: string;
  status: boolean;
  image_url: string;
  label: string;
  deals: Deal[];
}

export type Deal = {
  offer_title: string
  product_id: string
  status: boolean;
  end_date: string;
}

export type ServicesBanner = {
  status: boolean;
  services : Services[];
}

export type Services = {
  title: string;
  sub_title: string;
  status: boolean;
  image_url: string;
}

//  Berlin Interface
export type Berlin = {
  id: string;
  content: BerlinContent;
  slug: string;
}

export type BerlinContent = {
  home_banner: HomeBannerOsaka;
  services_banner?: ServicesBanner;
  main_content: MainContentBerlin;
  full_width_banner: FullWidthBanner;
  product_list_1: ProductSection;
  news_letter: NewsLetter;
  products_ids: string[];
}

export type MainContentBerlin = {
  status: boolean
  sidebar: SidebarBerlin;
  section1_products: ProductSection;
  section2_categories_icon_list: CategoriesIconList;
  section3_two_column_banners: TwoBanners;
  section4_products: ProductSection;
}

export type SidebarBerlin = {
  status: boolean;
  categories_icon_list: CategoriesIconList;
  right_side_banners : RightSideBanners;
  sidebar_products: ProductSection;
}

export type RightSideBanners = {
  status: boolean;
  banner_1: Link;
}

//  Denver Interface
export type Denver = {
  id: string;
  content: DenverContent;
  slug: string;
}

export type DenverContent = {
  home_banner: HomeBannerMadrid;
  categories_icon_list: CategoriesSection;
  products_list_1: ProductSection;
  two_column_banners: TwoBanners;
  slider_product_with_banner: SliderProductWithBanner;
  coupon_banner: FullWidthBanner;
  products_list_2: ProductSection;
  products_list_3: ProductSection;
  news_letter: NewsLetter;
  products_ids: string[];
}

export type SliderProductWithBanner = {
  slider_products: SliderProductsTokyo;
  left_side_banners: RightSideBanners;
}
