import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
  year: number;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  lyrics: string;

  @Prop({ required: true })
  metaphors: Metaphor[];
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
