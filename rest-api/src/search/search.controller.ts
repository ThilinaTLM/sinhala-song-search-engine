import { Body, Controller, Post } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SongService } from '../song/song.service';
import { makeIndex, mappings, settings } from './index.utils';

@Controller('search')
export class SearchController {
  static INDEX_NAME = 'songs';

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly songService: SongService,
  ) {}

  @Post()
  search(@Body() query: any) {
    return this.elasticsearchService.search(
      {
        index: SearchController.INDEX_NAME,
        ...query,
      },
      {
        ignore: [404],
      },
    );
  }

  @Post('index')
  async index() {
    let songs: any[] = await this.songService.getAllSongs();

    // delete index if exists
    try {
      await this.elasticsearchService.indices.delete({
        index: SearchController.INDEX_NAME,
      });
    } catch (e) {
      // ignore
    }

    // create elastic search index
    await this.elasticsearchService.indices.create({
      index: SearchController.INDEX_NAME,
      settings: settings,
      mappings: mappings,
    });

    // index all songs
    songs = songs.map(makeIndex);
    songs.forEach((song) => {
      this.elasticsearchService.index({
        index: SearchController.INDEX_NAME,
        id: song.id,
        document: song,
      });
    });

    return {
      message: 'Indexing complete',
    };
  }
}
