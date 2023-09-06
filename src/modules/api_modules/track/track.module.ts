import { Module } from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  exports: [TrackRepository],
  controllers: [TrackController],
  providers: [TrackRepository, TrackService],
})
export class TrackModule {}
