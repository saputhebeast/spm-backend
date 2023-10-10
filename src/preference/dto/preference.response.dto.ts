export class PreferenceResponseDto {
  id: number;
  brand: string[];
  color: string[];
  type: string[];
  material: string[];
  user: {
    id: number;
    email: string;
    isActive: boolean;
  };
}
