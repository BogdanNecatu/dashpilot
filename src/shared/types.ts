export interface AuthUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  country: string;
  registeredAt: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

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

export interface StoreState {
  users: User[];
  total: number;
  totalPages: number;
  page: number;
  loading: boolean;
  error: string | null;
  fetchUsers: (page: number, limit: number) => Promise<void>;
}
