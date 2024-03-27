import { Module } from '@nestjs/common';
import { VaccinesService } from './vaccines.service';
import { VaccinesController } from './vaccines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaccine } from './entities/vaccine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccine])],
  controllers: [VaccinesController],
  providers: [VaccinesService],
})
export class VaccinesModule {}
