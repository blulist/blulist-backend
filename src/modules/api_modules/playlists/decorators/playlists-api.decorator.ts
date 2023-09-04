import { applyDecorators, Get, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';

export function GetAllPlaylistsApi() {
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

export function GetPlaylistTracks() {
  return applyDecorators(
    ApiOperation({
      summary: 'get playlist tracks',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          data: [
            {
              uniqueId: '18d2d2bb-1',
              title: 'Adam Barfi~MelonMusic.ir',
              performer: 'Parsalip',
              duration: 165,
              isHaveThumbnail: false,
            },
            {
              uniqueId: '9e47930a-4',
              title: 'H u r t',
              performer: 'MooVan x Olafur Arnalds',
              duration: 214,
              isHaveThumbnail: true,
            },
          ],
        },
      },
    }),
    Get('/:slug/tracks'),
  );
}
