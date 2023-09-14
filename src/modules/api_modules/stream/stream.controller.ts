import { Controller, Param, Req, Res, UseFilters } from '@nestjs/common';
import { StreamService } from './stream.service';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiGetPlaylistBanner,
  ApiGetTrackThumbnail,
  ApiStreamTrack,
} from './decorators/stream-api.decorator';
import { HttpExceptionFilter } from '../shared/filters/http-exception.filter';
import { SkipThrottle } from '@nestjs/throttler';
import { Request, Response } from 'express';

@ApiTags('📥 Stream')
@UseFilters(HttpExceptionFilter)
@SkipThrottle()
@Controller('stream')
export class StreamController {
  constructor(private streamService: StreamService) {}

  @ApiGetPlaylistBanner()
  onGetPlaylistBanner(@Param('slug') slug: string) {
    return this.streamService.playlistBanner(slug);
  }

  @ApiGetTrackThumbnail()
  onGetTrackThumbnail(@Param('uniqueId') uniqueId: string) {
    return this.streamService.trackThumbnail(uniqueId);
  }

  @ApiStreamTrack()
  onStreamTrack(
    @Param('uniqueId') uniqueId: string,
    @Req() req: Request,
    @Res({ passthrough: false }) res: Response,
  ) {
    return this.streamService.streamTrack(uniqueId, req, res);
  }
}
