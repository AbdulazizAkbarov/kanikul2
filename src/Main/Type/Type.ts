export type AddBannerProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  onRefresh?: () => void;
};
export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  role: "admin" | "customer";
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
  categoryId: string;
};

export type AddBuyurtmaProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRefresh?: () => void;
};

export type FormValues = {
  title: string;
  imageUrl: string;
  isActive: boolean;
  customerId: number;
  productId: number;
  quantity: number;
  name: string;
  description: string;
  createdAt?: string;
  email: string;
  password: string;
  image: string;
  role: "admin" | "customer";
};

export type AddCategoryProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  onRefresh?: () => void;
};
export type Category = {
  id: number;
  name: string;
  description: string;
  createdAt?: string;
};

export type AddMahsulotlarPageProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  onRefresh?: () => void;
};
export type AddMijozlarProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onRefresh: () => void;
};

export type OrderItem = {
  productId: number;
  quantity: number;
  price: number;
};

export type Order = {
  id: number;
  customerId: number;
  status: string;
  totalPrice: number;
  items: OrderItem[];
};

export type Banner = {
  id: number;
  title: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
};

export type EditMijozlarProps = {
  selected?: User;
  setSelected: (value: User | undefined) => void;
};
