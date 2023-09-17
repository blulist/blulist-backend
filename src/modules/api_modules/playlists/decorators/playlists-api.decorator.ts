import { applyDecorators, Get, UseInterceptors } from '@nestjs/common';
import {
  ApiNotFoundResponse,
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
    ApiNotFoundResponse({
      schema: {
        example: {
          message: 'پلی لیست یافت نشد',
          error: 'Not Found',
          statusCode: 404,
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
    ApiQuery({ name: 'page', required: true, type: Number, example: 1 }),
    ApiQuery({
      name: 'limit',
      required: true,
      type: Number,
      example: 10,
      description: 'Max: 30',
    }),
    ApiQuery({
      name: 'sort',
      required: false,
      type: String,
      schema: {
        enum: ['like', 'view'],
      },
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          data: {
            playlists: [
              {
                slug: 'e9d2b7f0',
                name: '🌱 شجریـآن چیل',
                isHaveBanner: true,
                viewCount: 6,
                createdAt: '2023-09-05T13:18:27.457Z',
                tracksCount: 6,
                likesCount: 0,
              },
            ],
            hasNextPage: true,
            hasPrevPage: true,
            nextPage: 4,
            playlistsCount: 4,
          },
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
          data: {
            tracks: [
              {
                uniqueId: '99c06196-4',
                title: 'باران',
                performer: 'MooVan',
                duration: 368,
                isHaveThumbnail: false,
              },
            ],
            tracksCount: 6,
            hasNextPage: true,
            hasPrevPage: false,
            nextPage: 2,
          },
        },
      },
    }),
    ApiNotFoundResponse({
      schema: {
        example: {
          message: 'پلی لیست یافت نشد',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
    Get('/:slug/tracks'),
  );
}
