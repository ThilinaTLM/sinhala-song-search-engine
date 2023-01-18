// elastic search utils builder

const KEYWORD_FIELDS = [
    "title", "singer", "lyricist", "composer", "album", "year", "genre", "lyrics"
]

const ADVANCED_FIELDS = [
    "metaphors"
]

const PAGE_SIZE = 20;

export interface Options {
    query: string;
    fields: string[]; // title, singer, lyricist, composer, album, year, genre
    page: number;
}


export function queryBuilder(opt: Options): any {
    const page = opt.page
    let query: any = {
        bool: {
            should: []
        }
    }
    for (const field of opt.fields) {
        if (KEYWORD_FIELDS.includes(field)) {
            query.bool.should.push({
                "fuzzy": {
                    [field]: {
                        "value": opt.query,
                        "fuzziness": "1"
                    }
                }
            })
        }
    }
    return {
        from: (page - 1) * PAGE_SIZE,
        size: PAGE_SIZE,
        query
    }
}
