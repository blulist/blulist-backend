import { Controller, Get, Param } from '@nestjs/common';
import { StreamService } from './stream.service';

@Controller('stream')
export class StreamController {
  constructor(private streamService: StreamService) {}

  @Get('playlist/:slug/banner')
  onGetPlaylistBanner(@Param('slug') slug: string) {
    return this.streamService.playlistBanner(slug);
  }

  @Get('track/:uniqueId/thumbnail')
  onGetTrackThumbnail(@Param('uniqueId') uniqueId: string) {
    return this.streamService.trackThumbnail(uniqueId);
  }

  @Get('track/:uniqueId/mp')
  onStreamTrack(@Param('uniqueId') uniqueId: string) {
    return this.streamService.streamTrack(uniqueId);
  }
}
