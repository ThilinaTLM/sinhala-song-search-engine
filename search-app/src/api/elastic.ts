import axios from 'axios';
import type {SearchResponse} from "@elastic/elasticsearch/lib/api/types";

const BASE_URL = 'http://localhost:3000/api';

const client = axios.create({
    baseURL: BASE_URL,
})

export interface Result<T = any> {
    data: T;
    error: string | null;
    ok: boolean;
}

export const elastic = {

    async search(query: any): Promise<Result<SearchResponse>> {
        query = query || { query: { match_all: {} } };
        const res = await client.post(`/search`, query)
        if (res.status < 300) {
            return {
                data: res.data,
                error: null,
                ok: true
            }
        } else {
            return {
                data: null as unknown as SearchResponse,
                error: res.data,
                ok: false
            }
        }
    }

}

export default elastic;