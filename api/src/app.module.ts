import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PatientsModule } from './patients/patients.module';
import { VaccinationRecordsModule } from './vaccination-records/vaccination-records.module';
import { VaccinesModule } from './vaccines/vaccines.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV');
        return {
          type: 'better-sqlite3',
          database: 'db.sqlite3',
          synchronize: nodeEnv !== 'production',
        };
      },
    }),
    PatientsModule,
    VaccinationRecordsModule,
    VaccinesModule,
  ],
})
export class AppModule {}
