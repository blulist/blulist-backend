import { applyDecorators, Get, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';

export function getAllPlaylistsApi() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get All Public Playlists',
    }),
    UseInterceptors(ResponseInterceptor),
    ApiQuery({ name: 'page', required: true, type: Number }),
    ApiQuery({ name: 'limit', required: true, type: Number }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          data: [
            {
              slug: '96aa8e44',
              name: 'Test',
              viewCount: 'Test',
              isHaveBanner: true,
              createdAt: '2023-09-02T09:44:08.591Z',
              tracksCount: 60,
              likesCount: 1000,
            },
            {
              slug: '29f0f1d7',
              name: 'HipHop | Rap',
              viewCount: 'HipHop | Rap',
              isHaveBanner: false,
              createdAt: '2023-09-02T09:26:47.266Z',
              tracksCount: 0,
              likesCount: 0,
            },
            {
              slug: 'b42f7ecd',
              name: '☔️ Soft & Chill',
              viewCount: '☔️ Soft & Chill',
              isHaveBanner: true,
              createdAt: '2023-09-01T11:48:18.796Z',
              tracksCount: 9,
              likesCount: 1,
            },
          ],
        },
      },
    }),
    Get('/'),
  );
}
