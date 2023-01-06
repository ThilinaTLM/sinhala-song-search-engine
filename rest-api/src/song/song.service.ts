import { Injectable } from '@nestjs/common';
import { Song, SongDocument } from 'src/schema/song.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SongService {
  constructor(@InjectModel(Song.name) private songModel: Model<SongDocument>) {}

  async getAllSongs(): Promise<Song[]> {
    return this.songModel.find().exec();
  }

  async addSong(song: Song): Promise<Song> {
    const newSong = new this.songModel(song);
    return newSong.save();
  }
}
