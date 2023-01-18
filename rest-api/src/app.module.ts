import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongModule } from './song/song.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    SongModule,
    MongooseModule.forRoot(
      'mongodb://root:root@localhost:27017/songs-db?authSource=admin',
    ),
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
