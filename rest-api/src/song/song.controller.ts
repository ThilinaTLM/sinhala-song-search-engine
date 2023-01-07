import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SongService } from './song.service';
import { Song } from 'src/schema/song.schema';

@Controller('song')
export class SongController {
  constructor(private songService: SongService) {}

  @Get()
  getAllSongs() {
    return this.songService.getAllSongs();
  }

  @Get(':id')
  getSong(@Param('id') id: string) {
    return this.songService.getSong(id);
  }

  @Post()
  addSong(@Body() song: Song) {
    return this.songService.addSong(song);
  }

  @Put(':id')
  editSong(@Param('id') id: string, @Body() song: Song) {
    return this.songService.editSong(id, song);
  }

  @Delete(':id/trash')
  trashSong(@Param('id') id: string) {
    return this.songService.trashSong(id, true);
  }

  @Put(':id/restore')
  restoreSong(@Param('id') id: string) {
    return this.songService.trashSong(id, false);
  }
}
