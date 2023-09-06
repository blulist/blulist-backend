import { applyDecorators, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';

export function ApiGetPlaylistBanner() {
  return applyDecorators(
    ApiNotFoundResponse({
      schema: {
        example: {
          message: 'پلی لیست یافت نشد',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          message: 'پلی لیست بنر ندارد',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
    Get('playlist/:slug/banner'),
  );
}

export function ApiGetTrackThumbnail() {
  return applyDecorators(
    ApiNotFoundResponse({
      schema: {
        example: {
          message: 'موزیک یافت نشد',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          message: 'موزیک بنر ندارد',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),

    Get('track/:uniqueId/thumbnail'),
  );
}

export function ApiStreamTrack() {
  return applyDecorators(
    ApiNotFoundResponse({
      schema: {
        example: {
          message: 'موزیک یافت نشد',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
    Get('track/:uniqueId/mp'),
  );
}
