import axios from 'axios';
import type {Hits} from "./utils";
import {preprocess} from "./utils";

const BASE_URL = 'http://localhost:3000/api';

const client = axios.create({
    baseURL: BASE_URL,
})

export interface Result<T = any> {
    data: T;
    error: string | null;
    ok: boolean;
}

export const api = {

    async search(query: any): Promise<Result<Hits>> {
        query = query || { query: { match_all: {} } };
        const res = await client.post(`/search`, query)
        if (res.status < 300) {
            return {
                data: preprocess.search(res.data),
                error: null,
                ok: true
            }
        } else {
            return {
                data: null as unknown as Hits,
                error: res.data,
                ok: false
            }
        }
    }

}

export default api;