export interface Course {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  teacherId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  enrollCount: number;
  likeCount: number;
  isRecommended: boolean;
  materials: CourseMaterial[];
}

export interface CourseMaterial {
  id: string;
  type: 'document' | 'video' | 'audio' | 'image';
  title: string;
  url: string;
  duration?: number;
} 