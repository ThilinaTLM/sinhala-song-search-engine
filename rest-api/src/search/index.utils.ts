import { MappingTypeMapping } from '@elastic/elasticsearch/lib/api/types';
import { Song } from '../schema/song.schema';

export function elasticSearchMappings(): MappingTypeMapping {
  return {
    properties: {
      id: {
        type: 'keyword',
      },
      title: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
      },
      singer: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
      },
      lyricist: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
      },
      composer: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
      },
      album: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
      },
      year: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
      },
      genre: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
      },
      lyrics: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
      },
      metaphors: {
        type: 'nested',
        properties: {
          start: {
            type: 'integer',
          },
          end: {
            type: 'integer',
          },
          metaphor: {
            type: 'text',
            fields: {
              keyword: {
                type: 'keyword',
              },
            },
          },
          explanation: {
            type: 'text',
            fields: {
              keyword: {
                type: 'keyword',
              },
            },
          },
        },
      },
    },
  };
}

export function toElasticsearchIndex(song: Song) {
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    id: song._id || '',
    title: song.title,
    singer: song.singer,
    lyricist: song.lyricist,
    composer: song.composer,
    album: song.album,
    year: song.year,
    genre: song.genre,
    lyrics: song.lyrics,
    metaphors: song.metaphors.map((metaphor) => ({
      start: metaphor.start,
      end: metaphor.end,
      metaphor: metaphor.metaphor,
      explanation: metaphor.explanation,
    })),
  };
}
