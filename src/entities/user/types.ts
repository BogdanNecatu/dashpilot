export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Hair {
  color: string;
  type: string;
}

export interface Company {
  name: string;
  department: string;
  title: string;
  address: Address;
}

export interface Bank {
  cardNumber: string;
  cardType: string;
  cardExpire: string;
  currency: string;
  iban: string;
}

export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  birthDate: string;
  image: string;
  height: number;
  weight: number;
  university: string;
  username: string;
  password: string;
  eyeColor: string;
  hair: Hair;
  address: Address;
  bank: Bank;
  company: Company;
  crypto: Crypto;
  bloodGroup: string;
  ein: string;
  ssn: string;
  macAddress: string;
  ip: string;
  userAgent: string;
  role: string;
}

export interface UsersApiResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export type UserStore = {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;

  // Mutaciones
  setUsers: (users: User[], total: number, page: number, limit: number) => void;
  hydrateUsers: () => void;
  setLoading: (loading: boolean) => void;
  setError: (msg: string) => void;

  // Selectores
  getAllUsers: () => User[];
  getUserById: (id: number) => User | undefined;
  hasUsers: () => boolean;
};
