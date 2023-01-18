import { Controller, Get, Post } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SongService } from '../song/song.service';
import { elasticSearchMappings, toElasticsearchIndex } from './index.utils';

@Controller('search')
export class SearchController {
  static INDEX_NAME = 'songs';

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly songService: SongService,
  ) {}

  @Get()
  search() {
    // get all songs
    return this.elasticsearchService.search(
      {
        index: SearchController.INDEX_NAME,
        query: {
          match_all: {},
        },
      },
      {
        ignore: [404],
      },
    );
  }

  @Post('index')
  async index() {
    const songs = await this.songService.getAllSongs();
    // delete index if exists
    await this.elasticsearchService.indices.delete({
      index: SearchController.INDEX_NAME,
    });
    // create elastic search index
    await this.elasticsearchService.indices.create({
      index: SearchController.INDEX_NAME,
      mappings: elasticSearchMappings(),
    });

    // index all songs
    for (const song of songs) {
      await this.elasticsearchService.index({
        index: SearchController.INDEX_NAME,
        id: song.getId(),
        document: toElasticsearchIndex(song),
      });
    }
  }
}
