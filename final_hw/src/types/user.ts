export enum UserRole {
  GUEST = 'GUEST',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  email?: string;
  studentId?: string;
  avatar?: string;
  nickname?: string;
  signature?: string;
} 