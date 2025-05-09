export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  birthDate: string;
  image: string;
}

export interface UsersApiResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface UserStore {
  users: User[];
  total: number;
  loading: boolean;
  page: number;
  totalPages: number;
  error: string | null;
  setUsers: (users: User[], total: number, page: number, limit: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (msg: string | null) => void;
}
