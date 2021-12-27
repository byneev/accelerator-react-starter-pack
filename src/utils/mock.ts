import { ProductProps } from '../types/product-type';

export const getMockProduct = () : ProductProps => ({
  'id': 1,
  'name': 'Честер Bass',
  'vendorCode': 'SO757575',
  'type': 'electric',
  'description': 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
  'previewImg': 'img/content/guitar-1.jpg',
  'stringCount': 7,
  'rating': 4,
  'price': 17500,
});
