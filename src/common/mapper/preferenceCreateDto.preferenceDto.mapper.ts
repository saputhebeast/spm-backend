import { PreferenceCreateUpdateDto, PreferenceDto } from '../../preference/dto';

export function PreferenceCreateDtoToPreferenceDtoMapper(
  userId: number,
  preference: PreferenceCreateUpdateDto,
): PreferenceDto {
  const response = new PreferenceDto();
  response.userId = userId;
  response.brand = preference.brand.join(',');
  response.type = preference.type.join(',');
  response.color = preference.color.join(',');
  response.material = preference.material.join(',');

  return response;
}
