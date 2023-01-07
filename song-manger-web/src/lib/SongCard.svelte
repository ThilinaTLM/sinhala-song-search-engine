<script lang="ts">
    import {goto} from '$app/navigation';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let id = '';
    export let title = "Untitled";
    export let singer = "Unknown";
    export let trashed = false;

    const onOpen = () => {
        goto(`/song?id=${id}`);
    };

    const onTrashToggle = async () => {
        dispatch('trash', {id});
    };

</script>

<div
        class="card text-primary-content"
        class:bg-secondary="{trashed === false}"
        class:bg-gray-300="{trashed === true}"
>
    <div class="p-3">
        <h2 class="text-sm font-bold"> {title} </h2>
        <p class="text-xs"> {singer} </p>
        <div class="flex gap-2 justify-end">
            <button class="btn btn-xs btn-error" on:click={onTrashToggle}>
                {#if trashed}
                    Restore
                {:else}
                    Trash
                {/if}
            </button>
            <button class="btn btn-xs" on:click={onOpen}> Open</button>
        </div>
    </div>
</div>