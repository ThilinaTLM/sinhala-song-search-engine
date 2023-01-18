
export interface Hits {
    hits: [];
    count: number;
}


export const preprocess = {
    search(data: any): Hits {
        const count = data.hits.total.value;
        const hits = data.hits.hits.map((hit: any) => {
            return hit._source
        })
        return {hits, count}
    }
}
