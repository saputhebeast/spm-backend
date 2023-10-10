import { PreferenceCreateUpdateDto, PreferenceDto } from '../../preference/dto';

export function PreferenceCreateDtoToPreferenceDtoMapper(
  userId: number,
  preference: PreferenceCreateUpdateDto,
): PreferenceDto {
  const response = new PreferenceDto();
  response.userId = userId;
  response.brand =
    preference.brand.length > 1
      ? preference.brand.join(',')
      : preference.brand[0];
  response.type =
    preference.type.length > 1 ? preference.type.join(',') : preference.type[0];
  response.color =
    preference.color.length > 1
      ? preference.color.join(',')
      : preference.color[0];
  response.material =
    preference.material.length > 1
      ? preference.material.join(',')
      : preference.material[0];
  response.size =
    preference.size.length > 1 ? preference.size.join(',') : preference.size[0];

  return response;
}
