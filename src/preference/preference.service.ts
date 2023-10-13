import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PackageService } from '../package/package.service';
import { PreferenceRepository } from './preference.repository';
import {
  PreferenceCreateUpdateDto,
  PreferenceDto,
  PreferenceResponseDto,
} from './dto';
import { Preference } from '@prisma/client';
import {
  PreferenceToPreferenceResponseDtoMapper,
  PreferenceCreateDtoToPreferenceDtoMapper,
} from '../common/mapper';

@Injectable()
export class PreferenceService {
  private readonly logger: Logger = new Logger(PackageService.name);

  constructor(private preferenceRepository: PreferenceRepository) {}

  async createPreference(
    currentUser: number,
    preferenceCreateDto: PreferenceCreateUpdateDto,
  ): Promise<PreferenceResponseDto> {
    this.logger.log(
      `createPreference: execution started by user- ${currentUser}`,
    );
    const preferenceDto: PreferenceDto = this.mapPreferenceArraysToString(
      currentUser,
      preferenceCreateDto,
    );

    const preference: Preference =
      await this.preferenceRepository.savePreference(
        currentUser,
        preferenceDto,
      );

    if (!preference) {
      throw new InternalServerErrorException('Preference not created');
    }

    return this.mapPreferenceToResponseDto(preference);
  }

  async updatePreference(
    currentUser: number,
    userId: number,
    preferenceUpdateDto: PreferenceCreateUpdateDto,
  ): Promise<PreferenceResponseDto> {
    this.logger.log(
      `updatePreference: execution started by user- ${currentUser}`,
    );
    const preferenceDto: PreferenceDto = this.mapPreferenceArraysToString(
      userId,
      preferenceUpdateDto,
    );

    await this.getPreferenceByUserId(currentUser, userId);

    const preference: Preference =
      await this.preferenceRepository.updatePreference(userId, preferenceDto);

    if (!preference) {
      throw new InternalServerErrorException('Preference not updated');
    }

    return this.mapPreferenceToResponseDto(preference);
  }

  async getPreferenceByUserId(currentUser: number, userId: number) {
    this.logger.log(
      `getPreferenceByUserId: execution started by user- ${currentUser}`,
    );

    const preference: Preference =
      await this.preferenceRepository.getPreferenceByUserId(userId);
    if (!preference) {
      throw new NotFoundException('No Preference for user found');
    }

    return this.mapPreferenceToResponseDto(preference);
  }

  async getPreferenceById(currentUser: number, preferenceId: number) {
    this.logger.log(
      `getPreferenceById: execution started by user- ${currentUser}`,
    );

    const preference: Preference =
      await this.preferenceRepository.getPreferenceById(preferenceId);
    if (!preference) {
      throw new NotFoundException(
        `No Preference with ${preferenceId} id found`,
      );
    }

    return this.mapPreferenceToResponseDto(preference);
  }

  private mapPreferenceToResponseDto(
    preference: Preference,
  ): PreferenceResponseDto {
    return PreferenceToPreferenceResponseDtoMapper(preference);
  }

  private mapPreferenceArraysToString(
    userId: number,
    preferenceCreateUpdateDto: PreferenceCreateUpdateDto,
  ): PreferenceDto {
    return PreferenceCreateDtoToPreferenceDtoMapper(
      userId,
      preferenceCreateUpdateDto,
    );
  }
}
