// elastic search utils builder

import elastic from "../api/elastic";
import type {Result} from "../api/elastic";
import type {SearchResponse} from "@elastic/elasticsearch/lib/api/types";

export interface QueryBuilderOpts {
    query: string;
    fields: string[]; // title, singer, lyricist, composer, album, year, genre
    page: number;
}

export class QueryBuilder {

    static PAGE_SIZE = 15;
    static KEYWORD_FIELD_BOOST_SCORES: any = {
        "title": {
            "boost": 10
        },
        "singer": {
            "boost": 5
        },
        "lyricist": {
            "boost": 5
        },
        "composer": {
            "boost": 5
        },
        "album": {
            "boost": 10
        },
        "year": {
            "boost": 2
        },
        "genre": {
            "boost": 7
        },
    }

    private readonly text: string;
    private readonly options: QueryBuilderOpts;
    private readonly fields: string[];
    private readonly page: number;

    constructor(options: QueryBuilderOpts) {
        this.options = options;
        this.fields = options.fields;
        this.page = options.page;
        this.text = options.query.trim();
    }

    query() {
        let query: any = {
            bool: {
                should: []
            }
        }
        if (this.text.length === 0) {
            return {
                from: (this.page - 1) * QueryBuilder.PAGE_SIZE,
                size: QueryBuilder.PAGE_SIZE,
                query: {match_all: {}}
            }
        }

        const keywordFields = Object.keys(QueryBuilder.KEYWORD_FIELD_BOOST_SCORES)
        const fields = this.fields.filter(f => keywordFields.includes(f))
        for (const field of fields) {
            query.bool.should.push({
                // "fuzzy": {
                //     [field]: {
                //         "value": this.text,
                //         "fuzziness": "1",
                //         "boost": 2
                //     }
                // },
                "match": {
                    [field]: {
                        "query": this.text,
                        "boost": 10
                    }
                }
            })
        }

        if (this.fields.includes("lyrics")) {
            query.bool.should.push({
                "match": {
                    "lyrics": {
                        "query": this.text,
                        "analyzer": "sinhala_analyzer",
                        "boost": 1
                    }
                }
            })
        }

        if (this.fields.includes("metaphors")) {
            query.bool.should.push({
                "nested": {
                    "path": "metaphors",
                    "query": {
                        "fuzzy": {
                            "metaphors.metaphor": {
                                "value": this.text,
                                "fuzziness": "1",
                                "boost": 20,
                            }
                        }
                    },
                    "inner_hits": {
                        "name": "metaphors",
                        "size": 10,
                        "sort": [
                            {
                                "metaphors.start": {
                                    "order": "asc"
                                }
                            }
                        ],
                        "_source": [
                            "metaphors.metaphor",
                            "metaphors.explanation"
                        ]
                    }
                }
            })
        }

        if (this.fields.includes("explanation")) {
            query.bool.should.push({
                "nested": {
                    "path": "metaphors",
                    "query": {
                        "fuzzy": {
                            "metaphors.explanation": {
                                "value": this.text,
                                "fuzziness": "1",
                                "boost": 20,
                            }
                        }
                    },
                    "inner_hits": {
                        "name": "explanation",
                        "size": 10,
                        "sort": [
                            {
                                "metaphors.start": {
                                    "order": "asc"
                                }
                            }
                        ],
                        "_source": [
                            "metaphors.metaphor",
                            "metaphors.explanation"
                        ]
                    }
                }
            })
        }

        return {
            from: (this.page - 1) * QueryBuilder.PAGE_SIZE,
            size: QueryBuilder.PAGE_SIZE,
            query
        }
    }

    execute(): Promise<Result<SearchResponse>> {
        return elastic.search(this.query())
    }
}
