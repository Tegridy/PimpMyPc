export interface ProductCategory {
  id: number;
  title: string;
  iconName?: string;
  subCategories?: ProductCategory[];
}
