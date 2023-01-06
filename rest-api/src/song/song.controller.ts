import { Body, Controller, Get, Post } from '@nestjs/common';
import { SongService } from './song.service';
import { Song } from 'src/schema/song.schema';

@Controller('song')
export class SongController {
  constructor(private songService: SongService) {}

  @Get()
  getAllSongs() {
    return this.songService.getAllSongs();
  }

  @Post()
  // json body
  addSong(@Body() song: Song) {
    return this.songService.addSong(song);
  }
}
