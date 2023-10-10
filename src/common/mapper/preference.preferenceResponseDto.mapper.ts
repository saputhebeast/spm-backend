import { Preference } from '@prisma/client';
import { PreferenceResponseDto } from '../../preference/dto';

export function PreferenceToPreferenceResponseDtoMapper(
  preference: Preference,
): PreferenceResponseDto {
  const response = new PreferenceResponseDto();

  response.id = preference.id;
  response.brand = preference.brand.split(',');
  response.color = preference.color.split(',');
  response.type = preference.type.split(',');
  response.material = preference.material.split(',');

  response.userId = preference.userId;
  return response;
}
