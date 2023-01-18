<script lang="ts">
    import api from "../api/api";
    import { onMount } from 'svelte';
    import SongCard from "../lib/SongCard.svelte";
    import {goto,} from '$app/navigation';
    import FuzzySearch from 'fuzzy-search';

    let songs = [];
    let search = "";
    let filteredSongs = [];

    $: filteredSongs = songFilter(songs, search);

    function songFilter(songs, term) {
        const searcher = new FuzzySearch(songs, ['title', 'singer', 'composer', 'lyricist'], {
            caseSensitive: false,
        });
        return searcher.search(term).sort((a: any, b: any) => new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1);
    }


    onMount(async () => {
        const res = await api.song.all();
        if (res.status === 200) {
            songs = res.data;
        }
    });

    const onAdd = () => {
        goto('/song');
    };

    const onTrashed = async (id) => {
        const song = songs.filter(song => song['_id'] === id)[0];
        if (!song) {
            alert('Song not found');
            return;
        }
        let res;
        if (song.trashed) {
            res = await api.song.restore(id);
        } else {
            res = await api.song.trash(id);
        }
        if (res.status < 300) {
            songs = songs.map(s => s['_id'] === id ? {...s, trashed: !s.trashed} : s);
        }
    };

</script>


<div class="container mx-auto px-4">
    <div class="flex justify-between items-center mt-6">
        <div class="flex items-center">
            <h1 class="text-2xl font-bold">Songs List [{filteredSongs.length}]</h1>
            <button class="btn btn-sm ml-3" on:click={onAdd}>Add Song</button>
        </div>
        <div class="flex items-center">
            <input type="text"
                   placeholder="Search"
                   class="input input-sm input-bordered input-primary w-full max-w-xs"
                     bind:value={search}
            />

        </div>
    </div>


    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {#each filteredSongs as song (song['_id'])}
            {#if (song.trashed === false)}
                <SongCard title={song.title} singer={song.singer} id={song['_id']} trashed={song.trashed}
                          on:trash={() => onTrashed(song['_id'])}
                />
            {/if}
        {/each}
    </div>


    <p class="mt-6">Trashed</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {#each filteredSongs as song (song['_id'])}
            {#if (song.trashed)}
                <SongCard title={song.title} singer={song.singer} id={song['_id']} trashed={song.trashed}
                    on:trash={() => onTrashed(song['_id'])}
                />
            {/if}
        {/each}
    </div>
</div>