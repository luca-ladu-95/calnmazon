import {Indirizzo} from './indirizzo';
import {MetodoPagamento} from './metodo-pagamento';

export class User {
  id?: number;
  nome: string;
  cognome: string;
  email: string;
  password?: string;
  ruolo: number;
  indirizzo?: Indirizzo;
  metodoPagamento: MetodoPagamento;
}
