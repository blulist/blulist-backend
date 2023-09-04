import { ConfigService } from '@nestjs/config';
import { Configs } from '../../../../config/configuration';
import axios from 'axios';

async function getFileLink(
  file_id: string,
  configService: ConfigService<Configs>,
): Promise<string> {
  const { data } = await axios.get<string>(
    `${configService.get('TELETEGRAM_SERVICE')}/${file_id}`,
  );
  return data;
}
