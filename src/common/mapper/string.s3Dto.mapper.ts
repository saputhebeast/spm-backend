import { S3Dto } from '../../storage/dto';

export function mapStringToS3Dto(url: string): S3Dto {
  return {
    url: url,
  };
}
