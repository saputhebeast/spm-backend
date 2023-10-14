export class PreferenceResponseDto {
  id: number;
  brand: string[];
  color: string[];
  type: string[];
  material: string[];
  userId: number;
  user: {
    id: number;
    email: string;
    isActive: boolean;
  };
}
