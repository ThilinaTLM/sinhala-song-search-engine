import { Injectable } from '@nestjs/common';
import { Song, SongDocument } from 'src/schema/song.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SongService {
  constructor(@InjectModel(Song.name) private songModel: Model<SongDocument>) {
  }

  async getSong(id: string): Promise<Song> {
    return this.songModel.findById(id).exec();
  }

  async getAllSongs(): Promise<Song[]> {
    return this.songModel.find().exec();
  }

  async addSong(song: Song): Promise<Song> {
    song.createdAt = new Date();
    song.updatedAt = new Date();
    const newSong = new this.songModel(song);
    return newSong.save();
  }

  async editSong(id: string, song: Song): Promise<Song> {
    song.updatedAt = new Date();
    return this.songModel.findByIdAndUpdate(id, song, {
      new: false,
    });
  }

  async trashSong(id: string, trash: boolean): Promise<Song> {
    const song = (await this.songModel.findById(id).exec()) as Song;
    song.trashed = trash;
    return this.songModel.findByIdAndUpdate(id, song, {
      new: false,
    });
  }
}
