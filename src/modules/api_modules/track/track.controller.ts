import { Controller, Param, UseFilters, UseInterceptors } from '@nestjs/common';
import { TrackService } from './track.service';
import { ApiGetTrackByUniqueId } from './decorators/track-api.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../shared/interceptors/response.interceptor';
import { HttpExceptionFilter } from '../shared/filters/http-exception.filter';

@ApiTags('🎵 Track')
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('/track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @ApiGetTrackByUniqueId()
  onGetTrack(@Param('uniqueId') uniqueId: string) {
    return this.trackService.getTrackBySlug(uniqueId);
  }
}
