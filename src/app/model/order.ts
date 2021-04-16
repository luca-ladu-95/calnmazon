import {Product} from './product';

export class Order {
  id?: number;
  dataOrdine: string;
  numOrd: string;
  id_user: number;
  products: Product[];
}
