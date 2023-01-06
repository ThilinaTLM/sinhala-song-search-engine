import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongModule } from './song/song.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SongModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:root@cluster0.fvkyjyf.mongodb.net',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
