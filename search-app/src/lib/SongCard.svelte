<script lang="ts">
    import musicIcon from '../assets/compact-disk.svg'
    import type {SearchHit} from "@elastic/elasticsearch/lib/api/types";

    export let hit: SearchHit;
    let metaphors = []
    let matched = false

    const toggleModal = () => {
        const dialog = document.getElementById("modal-" + hit._id)
        dialog.classList.toggle("hidden")
    }

    $: {
        let _metaphorMatched = []
        let _explanationMatched = []
        if (hit && hit.inner_hits && hit.inner_hits.metaphors) {
            _metaphorMatched.push(...hit.inner_hits.metaphors.hits.hits.map(h => h._source.metaphor))
        }
        if (hit && hit.inner_hits && hit.inner_hits.explanation) {
            _explanationMatched.push(...hit.inner_hits.explanation.hits.hits.map(h => h._source.metaphor))
        }
        metaphors = hit && hit._source.metaphors.map(m => ({
            metaphor: m.metaphor,
            explanation: m.explanation,
            metaphorMatched: _metaphorMatched.includes(m.metaphor),
            explanationMatched: _explanationMatched.includes(m.metaphor)
        })) || []
    }


</script>


<div class="max-w-sm p-6 border border-gray-200 rounded-lg shadow-md
        bg-gradient-to-br from-purple-600 to-blue-500
        dark:border-gray-700 cursor-pointer transition-transform hover:scale-105"
     on:click={toggleModal}
>
    <!-- music svg -->
    <div class="flex justify-start items-center mb-6">
        <img src={musicIcon} alt="song" class="w-[100px] h-[100px]"/>
    </div>

    <div>
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {hit._source.title}
        </h5>
        {#each hit._source.singer.replace(/(^,)|(,$)/g, '').split(",") as singer }
            <div class="text-xs bg-green-300 rounded p-1 mr-1 my-0.5 w-fit inline-block">
                {singer}
            </div>
        {/each}
        {#each hit._source.composer.replace(/(^,)|(,$)/g, '').split(",") as composer }
            <div class="text-xs bg-yellow-300 rounded p-1 mr-1 my-0.5 w-fit inline-block">
                {composer}
            </div>
        {/each}
        {#each hit._source.lyricist.replace(/(^,)|(,$)/g, '').split(",") as lyricist }
            <div class="text-xs bg-red-300 rounded p-1 mr-1 my-0.5 w-fit inline-block">
                {lyricist}
            </div>
        {/each}
    </div>
    <div class="my-2">
        <span class="text-xs text-blue-300 mr-2 rounded border-2 border-blue-300 px-1 inline-block">
            SCORE: {hit._score.toString().slice(0, 4)}
        </span>
        {#if hit.inner_hits && hit.inner_hits.metaphors}
            <span class="text-xs text-blue-300 mr-2 rounded border-2 border-blue-300 px-1 inline-block">
            METAPHOR MATCH: {hit.inner_hits.metaphors.hits.total.value}
        </span>
        {/if}
        {#if hit.inner_hits && hit.inner_hits.explanation}
            <span class="text-xs text-blue-300 mr-2 rounded border-2 border-blue-300 px-1 inline-block">
            MEANING MATCH: {hit.inner_hits.explanation.hits.total.value}
        </span>
        {/if}
    </div>
    <p class="my-3 text-sm dark:text-gray-400">
        {hit._source.lyrics.slice(0, 120) + '...'}
    </p>
</div>


<div id={"modal-" + hit._id} class="relative z-10 hidden" role="dialog">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 overflow-y-auto py-7">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative w-full h-full max-w-2xl md:h-auto">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-start justify-between p-4 pl-6 pt-8 rounded-t dark:border-gray-600">
                        <h3 class="text-3xl font-bold text-black dark:text-white ">
                            {hit._source.title}
                        </h3>
                        <button type="button"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
                                rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600
                                dark:hover:text-white"
                                on:click={toggleModal}
                        >
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-6 space-y-6 text-left">
                        <div class="grid grid-cols-2 gap-2">
                            <div class="flex justify-start flex-col my-3">
                                <h6 class="text-gray-500 text-xs uppercase">singer</h6>
                                <span>{hit._source.singer}</span>
                            </div>
                            <div class="flex justify-start flex-col my-3">
                                <h6 class="text-gray-500 text-xs uppercase">composer</h6>
                                <span>{hit._source.composer}</span>
                            </div>
                            <div class="flex justify-start flex-col my-3">
                                <h6 class="text-gray-500 text-xs uppercase">lyricist</h6>
                                <span>{hit._source.lyricist}</span>
                            </div>
                            <div class="flex justify-start flex-col my-3">
                                <h6 class="text-gray-500 text-xs uppercase">genre</h6>
                                <span>{hit._source.genre}</span>
                            </div>
                            <div class="flex justify-start flex-col my-3">
                                <h6 class="text-gray-500 text-xs uppercase">album</h6>
                                <span>{hit._source.album}</span>
                            </div>
                            <div class="flex justify-start flex-col my-3">
                                <h6 class="text-gray-500 text-xs uppercase">year</h6>
                                <span>{hit._source.year}</span>
                            </div>
                        </div>
                        <div>
                            <h6 class="text-gray-500 text-xs uppercase">lyrics</h6>
                            <p class="whitespace-pre-wrap">{hit._source.lyrics}</p>
                        </div>
                        <div>
                            {#each metaphors as metaphor}
                                <div class="rounded border-gray-500 grid grid-cols-[200px_1fr] my-4 gap-2">
                                    <div class="rounded p-2" class:bg-yellow-200={metaphor.metaphorMatched}>
                                        <h6 class="text-gray-500 text-xs uppercase rounded w-fit">
                                            metaphor
                                            {#if metaphor.metaphorMatched}
                                                (matched)
                                            {/if}
                                        </h6>
                                        <p class="whitespace-pre-wrap">{metaphor.metaphor}</p>
                                    </div>
                                    <div class="rounded p-2" class:bg-yellow-200={metaphor.explanationMatched}>
                                        <h6 class="text-gray-500 text-xs uppercase rounded w-fit">
                                            explanation
                                            {#if metaphor.explanationMatched}
                                                (matched)
                                            {/if}
                                        </h6>
                                        <p class="whitespace-pre-wrap">{metaphor.explanation}</p>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>