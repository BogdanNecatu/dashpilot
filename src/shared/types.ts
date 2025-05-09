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
