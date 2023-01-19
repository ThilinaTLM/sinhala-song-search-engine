import {
  IndicesIndexSettings,
  MappingTypeMapping,
} from '@elastic/elasticsearch/lib/api/types';
import { Song } from '../schema/song.schema';

export const settings: IndicesIndexSettings = {
  analysis: {
    analyzer: {
      default: {
        type: 'standard',
      },
    },
  },
  index: {
    analysis: {
      analyzer: {
        sinhala_analyzer: {
          type: 'custom',
          tokenizer: 'icu_tokenizer',
          filter: ['edgeNgram'],
          char_filter: ['dotFilter'],
        },
        singlish_analyzer: {
          type: 'custom',
          tokenizer: 'standard',
          filter: ['edgeNgram'],
          char_filter: ['dotFilter'],
        },
        betterFuzzy: {
          type: 'custom',
          tokenizer: 'standard',
          filter: ['lowercase', 'edgeNgram'],
        },
      },
      filter: {
        edgeNgram: {
          type: 'edge_ngram',
          min_gram: 2,
          max_gram: 50,
          side: 'front',
        },
      },
      char_filter: {
        dotFilter: {
          type: 'mapping',
          mappings: ['\\u002E => \\u0020'],
        },
      },
    },
  },
};

export const mappings: MappingTypeMapping = {
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
      analyzer: 'sinhala_analyzer',
      search_analyzer: 'standard',
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
          analyzer: 'sinhala_analyzer',
          search_analyzer: 'standard',
          fields: {
            keyword: {
              type: 'keyword',
            },
          },
        },
        explanation: {
          type: 'text',
          analyzer: 'sinhala_analyzer',
          search_analyzer: 'standard',
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

export function makeIndex(song: Song) {
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
