export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
  isEarned: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  department: string;
  employeeCode: string;
  points: number;
  badges: Badge[];
  joinedAt: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface LoginResult {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}
