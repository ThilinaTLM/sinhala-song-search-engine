<script lang="ts">
    import musicIcon from '../assets/compact-disk.svg'

    export let song;

    function shortLyrics(song: any) {
        const lyrics: string = song.lyrics
        return lyrics.slice(0, 100) + '...'
    }

</script>


<div class="max-w-sm p-6 border border-gray-200 rounded-lg shadow-md
        dark:border-gray-700 cursor-pointer transition-transform hover:scale-105" >
    <!-- music svg -->
    <div class="flex justify-start items-center mb-6">
        <img src={musicIcon} alt="song" class="w-[50px] h-[50px]"/>
    </div>

    <a href="#">
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {song.title}
        </h5>
        <h6 class="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
            {song.singer}
        </h6>
    </a>
    <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">
        {shortLyrics(song)}
    </p>
</div>