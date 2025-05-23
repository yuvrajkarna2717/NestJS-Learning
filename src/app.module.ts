import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Note } from './notes/note.entity';
import { HealthController } from './health/health.controller';
import { HealthService } from './health/health.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URI,
      entities: [Note],
      synchronize: true, // disable this in production
      ssl: {
        rejectUnauthorized: false, // required by Neon
      },
    }),
    NotesModule,
    HealthModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, HealthService],
})
export class AppModule {}
