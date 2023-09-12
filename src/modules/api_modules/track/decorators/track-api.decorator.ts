import { applyDecorators, Get } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

export function ApiGetTrackByUniqueId() {
  return applyDecorators(
    ApiNotFoundResponse({
      schema: {
        example: {
          message: 'فایل یافت نشد.',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          data: {
            uniqueId: '255ff2f0-9',
            title: 'Khaab',
            performer:
              'Ramin Tajangi x Putak x Shayea x Hichkas x Khalvat x Sajadii x Rez',
            duration: 592,
            isHaveThumbnail: false,
          },
        },
      },
    }),
    Get('/:uniqueId'),
  );
}
