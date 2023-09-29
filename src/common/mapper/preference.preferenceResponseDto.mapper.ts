import { Preference, User } from '@prisma/client';
import { PreferenceResponseDto } from '../../preference/dto';

export function PreferenceToPreferenceResponseDtoMapper(
  preference: Preference,
  user: User,
): PreferenceResponseDto {
  const response = new PreferenceResponseDto();

  response.id = preference.id;
  response.brand = preference.brand.split(',');
  response.color = preference.color.split(',');
  response.type = preference.type.split(',');
  response.material = preference.material.split(',');

  response.user.id = user.id;
  response.user.email = user.email;
  response.user.isActive = user.isActive;
  return response;
}
