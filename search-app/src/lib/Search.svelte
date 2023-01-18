<script lang="ts">

    import { createEventDispatcher} from "svelte";
    const dispatch = createEventDispatcher();

    let options = [
        "title",
        "singer",
        "composer",
        "lyricist",
        "album",
        "year",
        "genre",
        "lyrics",
        "metaphors"
    ]

    export let selectedOptions = ["title"];
    export let query = "";

    const isChecked = (option) => {
        return selectedOptions.includes(option);
    }

    const onCheck = (option) => {
        if (isChecked(option)) {
            selectedOptions = selectedOptions.filter((o) => o !== option);
        } else {
            selectedOptions = [...selectedOptions, option];
        }
    }

    $: placeholder = selectedOptions.length > 0 ?
        "Search for " + selectedOptions.join(", ") : "Select options";

    const onSubmit = () => {
        dispatch("search", {
            fields: selectedOptions,
            query,
        });
    }


</script>

<div class="flex flex-col bg-red w-2/3 gap-3">
    <div class="w-full">
        <form on:submit|preventDefault={onSubmit}>
            <label for="default-search"
                   class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                         stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input type="search" id="default-search"
                       class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg
                        bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="{placeholder}"
                       bind:value={query}
                >
                <button type="submit"
                        class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2
                        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Search
                </button>
            </div>
        </form>
    </div>


    <div class="flex px-1">
        {#each options as opt, id}
            <div class="flex items-center mr-4">
                <input id="inline-checkbox" type="checkbox" checked={isChecked(opt)} on:click={() => onCheck(opt)}
                       class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="inline-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {opt.toUpperCase()}
                </label>
            </div>
        {/each}
    </div>
</div>