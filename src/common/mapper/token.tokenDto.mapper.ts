import { TokenDto } from '../../auth/dto';

export function mapTokenToTokenDto(token: string): TokenDto {
  return {
    token: token,
  };
}
