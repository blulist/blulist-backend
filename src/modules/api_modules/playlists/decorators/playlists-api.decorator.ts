import { applyDecorators, Get, UseInterceptors } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ResponseInterceptor } from '../../shared/interceptors/response.interceptor';

export function GetPlaylist() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Public Playlist',
    }),
    UseInterceptors(ResponseInterceptor),
    ApiParam({
      name: 'slug',
      required: true,
      example: '96aa8e44',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          data: {
            slug: 'e9d2b7f0',
            name: '🌱 شجریـآن چیل',
            isHaveBanner: true,
            viewCount: 4,
            createdAt: '2023-09-05T13:18:27.457Z',
            tracksCount: 6,
            likesCount: 0,
          },
        },
      },
    }),
    Get('/:slug'),
  );
}
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
              slug: 'd0192c40',
              name: 'test',
              isHaveBanner: false,
              viewCount: 0,
              createdAt: '2023-09-05T22:26:14.802Z',
              tracksCount: 1,
              likesCount: 0,
            },
            {
              slug: 'e9d2b7f0',
              name: '🌱 شجریـآن چیل',
              isHaveBanner: true,
              viewCount: 4,
              createdAt: '2023-09-05T13:18:27.457Z',
              tracksCount: 6,
              likesCount: 0,
            },
            {
              slug: 'ffc8619c',
              name: '🤌 rap remix',
              isHaveBanner: true,
              viewCount: 1,
              createdAt: '2023-09-05T12:43:21.145Z',
              tracksCount: 1,
              likesCount: 0,
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
