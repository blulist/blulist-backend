import { Module } from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { TrackService } from './track.service';

@Module({
  exports: [TrackRepository],
  providers: [TrackRepository, TrackService],
})
export class TrackModule {}
