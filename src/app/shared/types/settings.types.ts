import { Attachment, Currency } from ".";


export type Setting = {
    id?: string;
    values: Values;
}

export type Values = {
    general: General;
    activation: Activation;
    wallet_points: WalletPoints;
    email: Email;
    vendor_commissions: VendorCommissions;
    refund: Refund;
    newsletter: Newsletter;
    analytics: Analytics;
    delivery: Delivery;
    google_reCaptcha: GoogleReCaptcha;
    payment_methods: PaymentMethods;
    maintenance: Maintenance;
}

export type Language = {
    language: string;
    code: string;
    icon: string;
}

export type DayInterval = {
    title: string;
    description: string;
}

export type General = {
    light_logo_image?: Attachment;
    dark_logo_image?: Attachment;
    favicon_image?: Attachment;
    tiny_logo_image?: Attachment;
    light_logo_image_id?: number;
    dark_logo_image_id?: number;
    tiny_logo_image_id?: number;
    favicon_image_id?: number;
    site_title: string;
    site_tagline: string;
    default_timezone: string;
    default_currency_id: string;
    admin_site_language_direction: string;
    min_order_amount: number;
    min_order_free_shipping: number;
    product_sku_prefix: string;
    default_currency: Currency;
    mode: string;
    copyright: string;
}

export type Activation = {
    multivendor: boolean;
    point_enable: boolean;
    coupon_enable: boolean;
    wallet_enable: boolean;
    catalog_enable: boolean;
    stock_product_hide: boolean;
    store_auto_approve: boolean;
    product_auto_approve: boolean;
}

export type WalletPoints = {
    signup_points: number;
    min_per_order_amount: number;
    point_currency_ratio: number;
    reward_per_order_amount: number;
}

export type Email = {
    mail_host: string;
    mail_port: number;
    mail_mailer: string;
    mail_password: string;
    mail_username: string;
    mail_encryption: string;
    mail_from_name: string;
    mail_from_address: string;
    mailgun_domain: string;
    mailgun_secret: string;
}

export type VendorCommissions = {
    status: number,
    min_withdraw_amount: number,
    default_commission_rate: number,
    is_category_based_commission: number
}

export type Refund = {
    status: boolean;
    refundable_days: number;
}

export type Newsletter = {
    status: string;
    mailchip_api_key: string;
    mailchip_list_id: string;
}

export type Analytics = {
    facebook_pixel: {
        status: boolean;
        pixel_id: string;
    }
    google_analytics: {
        status: boolean;
        measurement_id: string;
    }
}

export type Delivery = {
    default_delivery: boolean;
    default: DeliveryDay;
    same_day_delivery: boolean;
    same_day: DeliveryDay;
    same_day_intervals: DayInterval[];
}

export type DeliveryDay = {
    title: Setting;
    description: string;
}

export type DeliveryBlock = {
    delivery_description: string | null;
    delivery_interval: string | null;
}

export type GoogleReCaptcha = {
    secret: string
    status: boolean;
    site_key: string
}

export type PaymentMethods = {
    paypal?: Paypal;
    stripe?: StripeAndRazorpay;
    razorpay?: StripeAndRazorpay;
    mollie?: Mollie;
    enzona_cup?: Enzona;
    enzona_usd?: Enzona;
    transfermovil_cup?: Transfermovil;
    transfermovil_usd?: Transfermovil;
    tropipay?: Tropipay;
    cod: COD;
    cash_on_delivery: CashOnDelivery;
}

export type Transfermovil = {
    status: boolean;
    sandbox_mode: boolean;
    entity: string;
    source: string;
}

export type Enzona = {
    status: boolean;
    sandbox_mode: boolean;
    merchant_id: string;
    key: string;
    secret: string;
}

export type Tropipay = {
    status: boolean;
    sandbox_mode: boolean;
    merchant_id: string;
    secret: string;
}


export type CashOnDelivery = {
    status: boolean;
}

export type Paypal = {
    status: boolean;
    client_id: string
    client_secret: string
    sandbox_mode: string
}

export type StripeAndRazorpay = {
    key: string;
    secret: string;
    status: boolean;
}

export type Mollie = {
    status: boolean;
    secret_key: string;
}

export type COD = {
    status: boolean;
}

export type Maintenance = {
    title: string;
    maintenance_mode: boolean;
    maintenance_image_id: string;
    maintenance_image: Attachment;
    description: string;
}
