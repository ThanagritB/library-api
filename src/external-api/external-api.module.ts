import { Module } from '@nestjs/common';
import { ExternalApiService } from './external-api.service';
import { ExternalApiController } from './external-api.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule], // Use for HTTP request to external API.
  providers: [ExternalApiService],
  controllers: [ExternalApiController],
})
export class ExternalApiModule {}
