export type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

export interface ColorOption {
  value: string;
  label: string;
  hex: string;
}
export interface ProductProps {
  brandName: string;
  category?: string;
  color: string;
  colors: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  description: string;
  docId: string;
  featureImage: string;
  file: string;
  productName: string;
  promotion: string;
  quantity: number;
  quantityInStock: string;
  regularPrice: string;
  salePrice: string;
  schedule: string;
  shopId: string;
  size: string;
  sku: string;
  stockStatus: string;
  subCategory: string;
}

export interface FirebaseDate {
  _seconds: number;
  _nanoseconds: number;
}

export interface Screen {
  name: string;
  title: string;
  description: string;
  image: string;
  order: number;
  color: string;
}

export type OnBoardingScreen = Record<string, Screen>;

export interface SubCategory {
  docId: string;
  name: string;
  description: string;
  image: string | null | Blob;
}

export interface Category {
  name: string;
  description: string;
  image: string | null | Blob;
  subCategories?: SubCategory[];
}
export interface FormComponentProps {
  values?: any;
  setFieldValue?: any;
  isEdit?: boolean;
}

export interface BannerProps {
  categoryId: string;
  description?: string;
  docId: string;
  image: string;
  title?: string;
  type: string;
}

export interface ColorType {
  label: string;
  value: string;
  hex: string;
}

export interface SizeType {
  label: string;
  value: string;
}

export interface ProductType {
  name: string;
  price: string;
  mainImage: string;
  otherImages?: string[];
  category: string;
  storeId: string;
  regularPrice: string;
  sizes?: SizeType[];
  colors?: ColorType[];
  description: string;
}

export interface UserType {
  createdAt: FirebaseDate;
  docId: string;
  email: string;
  isVerified: boolean;
  passwordResetExpires: null;
  passwordResetToken: null;
  role: string;
  updatedAt: FirebaseDate;
}

export interface User {
  docId: string;
  email: string;
  isVerified: boolean;
  userName: string;
  lastName: string;
  firstName: string;
  userId: string;
  phone: string;
  image: string;
  role: string;
  address: string;
  district: string;
  city: string;
}

export interface AuthType {
  accessToken: string;
  isAuthenticated: boolean;
  user: UserType;
}

export interface OrderType {
  createdAt: FirebaseDate;
  docId: string;
  orderDetails: any[];
  orderNumber: number;
  orderStatus: string;
  owner: string;
  ownerId: string;
  paymentId: string;
  paymentMethod: string;
  paymentStatus: string;
  quotedPrice: number;
  sentConfirmationEmail: string;
  shippedToUser: string;
  shippingAddress: {
    division: string;
    shippingPrice: number;
    shippingName: string;
    region: string;
    shoppingPhoneNumber: string;
    shippingEmail: string;
  };
  status: {
    ordered: {
      date: FirebaseDate;
      status: string;
    };
    shipped: {
      date: FirebaseDate;
      status: string;
    };
    confirmed: {
      date: FirebaseDate;
      status: string;
    };
    delivered: {
      date: FirebaseDate;
      status: string;
    };
  };
  updatedAt: FirebaseDate;
}

export enum UserRoles {
  Admin = "admin",
  Vendor = "vendor",
  Client = "client",
}

export interface DLocation {
  area: string;
  cost: number;
  region: string;
  docId: string;
}
