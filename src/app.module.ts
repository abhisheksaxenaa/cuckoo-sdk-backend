import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreModule } from './firestore/firestore.module';
import { RawReadingsService } from './models/application.service';
import { CloudStorageService } from './cloud-storage/google-cloud-storage.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get<string>('SA_KEY'))
        // FIXME: Get the envs
        // Useful for pipelines
        return ({
          keyFilename: configService.get<string>('SA_KEY'),

        })
      },
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     type: 'postgres',
    //     host: config.get<string>('DB_HOST'),
    //     port: +config.get<number>('DB_PORT'),
    //     username: config.get<string>('DB_USER'),
    //     password: config.get<string>('DB_PASS'),
    //     database: config.get<string>('DB_NAME'),
    //     synchronize: ['dev', 'development'].includes(
    //       config.get<string>('NODE_ENV'),
    //     ), // only if dev-mode
    //     autoLoadEntities: true,
    //   }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, RawReadingsService, CloudStorageService],
})
export class AppModule { }
