import { Controller, Get, Param } from '@nestjs/common';
import { StreamService } from './stream.service';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiGetPlaylistBanner,
  ApiGetTrackThumbnail,
  ApiStreamTrack,
} from './decorators/stream-api.decorator';

@ApiTags('📥 Stream')
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
  onStreamTrack(@Param('uniqueId') uniqueId: string) {
    return this.streamService.streamTrack(uniqueId);
  }
}
