import axios from "axios";
import type {AxiosResponse} from "axios";
import type {Song} from "../schema/song";

const client = axios.create({
    baseURL: "http://localhost:3000/api",
});

const api = {
    song: {
        get: (id: string): Promise<AxiosResponse<Song>> => client.get(`/song/${id}`),
        all: (): Promise<AxiosResponse<Song[]>> => client.get("/song"),
        add: (song: Song): Promise<AxiosResponse<Song>> => client.post("/song", song),
        update: (id: string, song: Song): Promise<AxiosResponse<Song>> => client.put(`/song/${id}`, song),
        trash: (id: string): Promise<AxiosResponse<Song>> => client.delete(`/song/${id}/trash`),
        restore: (id: string): Promise<AxiosResponse<Song>> => client.put(`/song/${id}/restore`),
    }
}

export default api;