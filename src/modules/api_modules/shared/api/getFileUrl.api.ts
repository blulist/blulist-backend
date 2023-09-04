import { ConfigService } from '@nestjs/config';
import { Configs } from '../../../../config/configuration';
import axios from 'axios';

export async function getFileLink(
  file_id: string,
  configService: ConfigService<Configs>,
): Promise<string> {
  const { data } = await axios.get<string>(
    `${configService.get('TELETEGRAM_SERVICE')}/telegram/file-url/${file_id}`,
  );
  return data;
}
