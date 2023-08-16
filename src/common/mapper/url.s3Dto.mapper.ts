import { S3Dto } from '../../storage/dto';

export function mapUrlToS3Dto(url: string): S3Dto {
  return {
    url: url,
  };
}
