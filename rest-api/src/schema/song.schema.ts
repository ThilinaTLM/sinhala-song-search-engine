import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type SongDocument = HydratedDocument<Song>;

@Schema()
export class Song {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  singer: string;

  @Prop({ required: true })
  lyricist: string;

  @Prop({ required: true })
  composer: string;

  @Prop({ required: true })
  album: string;

  @Prop({ required: true })
  year: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  lyrics: string;

  @Prop({ required: true })
  metaphors: Metaphor[];

  @Prop({ required: true })
  trashed: boolean;

  @Prop({ required: false })
  updatedAt: Date;

  @Prop({ required: false })
  createdAt: Date;

  getId(): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this._id;
  }

  static fromObject(obj: any) {
    const song = new Song();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    song._id = obj._id;
    song.title = obj.title;
    song.singer = obj.singer;
    song.lyricist = obj.lyricist;
    song.composer = obj.composer;
    song.album = obj.album;
    song.year = obj.year;
    song.genre = obj.genre;
    song.lyrics = obj.lyrics;
    song.metaphors = obj.metaphors;
    song.trashed = obj.trashed;
    song.updatedAt = obj.updatedAt;
    song.createdAt = obj.createdAt;
    return song;
  }
}

export class Metaphor {
  @Prop({ required: true })
  start: number;

  @Prop({ required: true })
  end: number;

  @Prop({ required: true })
  metaphor: string;

  @Prop({ required: true })
  explanation: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
