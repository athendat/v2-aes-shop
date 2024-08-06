import { Attachment } from ".";

export type ThemeOption = {
    id: string;
    options: Option;
}

export type Option = {
    logo: Logo;
    general: General;
    seo: SEO;
    header: Header;
    footer: Footer;
    blog: Blog;
    product: ProductThemeOption;
    collection: Collection;
    seller: Seller;
    about_us: AboutUs;
    contact_us: Contact;
    error_page: ErrorPage;
}

export type Logo = {
    header_logo_id: string;
    footer_logo_id: string;
    favicon_icon_id: string;
    favicon_icon: Attachment;
    header_logo: Attachment;
    footer_logo: Attachment;
}

type General = {
    site_title: string;
    site_tagline: string;
    sticky_cart_enable: boolean;
    preloader_enable: boolean;
    back_to_top_enable: boolean;
    cart_style: string;
    language_direction: string;
    hover_color: string;
    primary_color: string;
    secondary_color: string;
    link_color: string;
    mode: string;
}

export type SEO = {
    meta_tags: string;
    meta_title: string;
    meta_description: string;
    og_title: string;
    og_description: string;
    og_image_id: string;
    og_image: Attachment;
}

export type Header = {
    sticky_header_enable: boolean;
    header_options: string;
    page_top_bar_enable: boolean;
    top_bar_content: TopBarContent[];
    page_top_bar_dark: boolean;
    support_number: string;
    today_deals: [];
    category_ids: string[];
}

export type TopBarContent = {
    content: string;
}

export type Footer = {
    footer_style: string;
    footer_copyright: boolean;
    copyright_content: string;
    footer_about: string;
    about_address: string;
    about_email: string;
    // footer_categories_id: string[];
    // footer_categories: Category[];
    footer_categories: string[];
    footer_pages: [];
    useful_link: CustomDropdown[];
    help_center: CustomDropdown[];
    support_number: string;
    support_email: string;
    play_store_url: string;
    app_store_url: string;
    social_media_enable: boolean;
    facebook: string;
    instagram: string;
    twitter: string;
    pinterest: string;
}


export type CustomDropdown = {
    id: string;
    name: string;
    value: string;
}

export type Blog = {
    blog_style: string;
    blog_sidebar_type: string;
    blog_author_enable: boolean;
    read_more_enable: boolean;
}

export type Seller = {
    about: About;
    services: Services;
    steps: Steps;
    start_selling: Step;
    store_layout: string;
    store_details: string;
}

export type AboutUs = {
    about: AboutSection;
    clients: Clients;
    team: Team;
    testimonial: Testimonial;
    blog: BlogSection;
}

export type AboutSection = {
    status: boolean;
    content_left_image_id: string;
    content_left_image_url: string;
    content_left_image: Attachment;
    content_right_image_id: string;
    content_right_image_url: string;
    content_right_image: Attachment;
    sub_title: string;
    title: string;
    description: string;
    futures: AboutFutures[];
}

export type AboutFutures = {
    icon: string;
    title: string;
}

export type About = {
    status: boolean;
    title: string;
    description: string;
    image_url: string;
}

export type Clients = {
    status: boolean;
    sub_title: string;
    title: string;
    content: ClientsContent[];
}

export type ClientsContent = {
    icon: string;
    title: string;
    description: string;
}

export type Team = {
    status: boolean;
    sub_title: string;
    title: string;
    members: Member[];
}

export type Member = {
    profile_image_url: string;
    profile_image_id: string;
    profile_image: Attachment;
    name: string;
    designation: string;
    description: string;
    instagram: string;
    twitter: string;
    pinterest: string;
    facebook: string;
}

export type Testimonial = {
    status: boolean;
    sub_title: string;
    title: string;
    reviews: OptionsReview[];
}

export type OptionsReview = {
    title: string;
    profile_image_id: string;
    profile_image_url: string;
    profile_image: Attachment;
    name: string;
    designation: string;
    review: string;
}

type BlogSection = {
    status: boolean;
    blog_ids: string[];
}

type Services = {
    status: boolean;
    title: string
    service_1: Service;
    service_2: Service;
    service_3: Service;
    service_4: Service;
}

export type Service = {
    status: boolean;
    title: string;
    description: string;
    image_url: string;
}

export type Steps = {
    status: boolean;
    title: string;
    step_1: Step;
    step_2: Step;
    step_3: Step;
}

export type Step = {
    status: boolean;
    title: string;
    description: string;
}

export type Contact = {
    contact_image_url: string;
    contact_image_id: string;
    contact_image: Attachment;
    detail_1: Detail;
    detail_2: Detail;
    detail_3: Detail;
    detail_4: Detail;
}

export type Detail = {
    label: string;
    icon: string;
    text: string;
}

export type ErrorPage = {
    error_page_content: string;
    back_button_enable: boolean;
    back_button_text: string;
}

export type ProductThemeOption = {
    product_layout: string;
    is_trending_product: boolean;
    banner_enable: boolean;
    banner_image_id: string;
    banner_image_url: string;
    banner_image: Attachment;
    safe_checkout: boolean,
    safe_checkout_image: string,
    secure_checkout: boolean,
    secure_checkout_image_id: string,
    secure_checkout_image: Attachment,
    encourage_order: boolean,
    encourage_max_order_count: number,
    encourage_view: boolean,
    encourage_max_view_count: number,
    sticky_checkout: boolean,
    sticky_product: boolean,
    social_share: boolean,
    shipping_and_return: string,
}

export type Collection = {
    collection_layout: string;
    collection_banner_image_id: string;
    collection_banner_image_url: string;
    collection_banner_image: Attachment;
}

export type Images = {
    image_id: string,
    image: Attachment,
}
