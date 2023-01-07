<script lang="ts">
    import {Song} from "../../schema/song";
    import TextBox from "$lib/TextBox.svelte";
    import MetaphorEditor from "$lib/MetaphorEditor.svelte";
    import api from "../../api/api";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";


    let disabled = false;

    let songId = "";
    let title = "";
    let singer = "";
    let lyricist = "";
    let composer = "";
    let album = "";
    let year = "";
    let genre = "";
    let lyrics = "";
    let metaphors = [];

    const onSave = async () => {
        const song = new Song();
        song.title = title;
        song.singer = singer;
        song.lyricist = lyricist;
        song.composer = composer;
        song.album = album;
        song.year = year;
        song.genre = genre;
        song.lyrics = lyrics;
        song.metaphors = metaphors;

        song.singer = song.singer.trim() || 'Unknown';
        song.lyricist = song.lyricist.trim() || 'Unknown';
        song.composer = song.composer.trim() || 'Unknown';
        song.album = song.album.trim() || 'Unknown';
        song.year = song.year.trim() || 'Unknown';
        song.genre = song.genre.trim() || 'Unknown';

        let errors = song.isValid()
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        console.log(song);
        let res;
        if (songId) {
            res = await api.song.update(songId, song);
            if (res.status < 300) {
                alert("Song updated");
                await goto("/");
            } else {
                alert("Error adding song");
            }
        } else {
            res = await api.song.add(song)
            if (res.status < 300) {
                alert("Song added successfully");
                await goto("/");
            } else {
                alert("Error adding song");
            }
        }

    }

    const onCancel = () => {
        console.log("cancel");
        goto("/");
    }

    onMount(async () => {
        // get query params id
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            const res = await api.song.get(id);
            if (res.status < 300) {
                const song = res.data;
                title = song.title;
                singer = song.singer;
                lyricist = song.lyricist;
                composer = song.composer;
                album = song.album;
                year = song.year;
                genre = song.genre;
                lyrics = song.lyrics;
                metaphors = song.metaphors;
                songId = res.data["_id"];
            } else {
                alert("Error getting song");
            }
        }
    })

</script>

<!-- use svelte + tailwind css + daisy ui -->
<div class="flex flex-col items-center justify-center min-h-screen py-2 my-3">
    <div class="w-full max-w-3xl px-6 py-4 bg-gray-100 border-2 shadow-lg sm:rounded-xl">
        <h1 class="text-xl font-semibold text-center text-black mb-6">Edit Song</h1>
        <form >
            <div class="grid grid-cols-3 gap-4 mb-3">
                <div class="relative z-0 w-full mb-1">
                    <TextBox bind:value={title} label="Title" disabled={disabled} />
                </div>
                <div class="relative z-0 w-full mb-1">
                    <TextBox bind:value={singer} label="Singer" disabled={disabled} />
                </div>
                <div class="relative z-0 w-full mb-1">
                    <TextBox bind:value={lyricist} label="Lyricist" disabled={disabled} />
                </div>
                <div class="relative z-0 w-full mb-1">
                    <TextBox bind:value={composer} label="Composer" disabled={disabled} />
                </div>
                <div class="relative z-0 w-full mb-1">
                    <TextBox bind:value={album} label="Album" disabled={disabled} />
                </div>
                <div class="relative z-0 w-full mb-1">
                    <TextBox bind:value={year} label="Year" disabled={disabled} />
                </div>
                <div class="relative z-0 w-full mb-1">
                    <TextBox bind:value={genre} label="Genre" disabled={disabled} />
                </div>
            </div>
            <div>
                <MetaphorEditor bind:lyrics={lyrics} bind:metaphors={metaphors} />
            </div>

            <div class="flex items-center justify-center">
                <button type="button" class="btn btn-sm btn-primary w-[100px] mx-2" on:click={onSave}>
                    {#if songId}
                        Update
                    {:else}
                        Save
                    {/if}
                </button>
                <button type="button" class="btn btn-sm w-[100px] mx-2" on:click={onCancel}>Cancel</button>
            </div>
        </form>
    </div>
</div>




