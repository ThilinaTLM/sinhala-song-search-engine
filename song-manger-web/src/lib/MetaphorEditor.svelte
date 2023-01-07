<script lang="ts">
    import Quill from "quill";
    import {onMount} from "svelte";
    import {Metaphor} from "../schema/song";
    import TextModal from "$lib/TextModal.svelte";

    // data
    export let lyrics;
    export let metaphors: Metaphor[];

    // state
    let editor;
    let quill;
    let textModal;

    const onAddMetaphor = async () => {
        const range = quill.getSelection();
        if (range.length === 0) {
            alert('Please select some text');
            return;
        }
        const text = quill.getText(range.index, range.length);

        let comment = await textModal.open({title: 'Explanation', metaphor: text});
        if (comment == null) {
            return;
        }


        metaphors = [...metaphors, Metaphor.fromObject({
            metaphor: text,
            explanation: comment,
            start: range.index,
            end: range.index + range.length
        })];

        quill.formatText(range.index, range.length, {
            background: "#fff72b"
        });
    }

    const onMetaphorDelete = (metaphor: Metaphor) => {
        metaphors = metaphors.filter(m => m !== metaphor);
    }

    // events
    onMount(async () => {
        quill = new Quill(editor, {
            modules: {
                toolbar: false
            },
            placeholder: "Lyrics...",
            theme: "snow"
        });


        quill.on('text-change', () => {
            lyrics = quill.getText();
        });
    })

    let firstTime = true;
    $: {
        if (quill && firstTime) {
            if (lyrics.length > 0) {
                firstTime = false;
                quill.setText(lyrics);
            }
        }
    }

</script>

<svelte:head>
    <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
</svelte:head>

<div class="my-3">
    <div class="editor-container">
        <div>
            <div class="flex justify-between items-center mb-2">
                <span class="label-text"> Lyrics </span>
                <button class="btn btn-xs btn-warning" on:click={onAddMetaphor}>Add Metaphor</button>
            </div>
            <div class="editor bg-white" bind:this={editor}></div>
        </div>
        <div>
            <div class="flex justify-between items-center mb-2">
                <span class="label-text"> Metaphors </span>
                <button class="btn btn-xs btn-warning">Clear</button>
            </div>
            <div class="metaphors min-h-max">
                {#each metaphors as metaphor}
                    <div class="bg-white w-full p-2 rounded border-accent mb-3">
                        <p class="text-xs">{metaphor.metaphor.slice(0, 100)}</p>
                        <p class="text-xs text-gray-500">{metaphor.explanation.slice(0, 100)}</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-xs btn-error" on:click={() => onMetaphorDelete(metaphor)}>Delete
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>

</div>

<TextModal bind:this={textModal}/>

<style>
    .editor {
        height: 300px;
    }

    .editor-container {
        display: grid;
        grid-template-columns: 6fr 4fr;
        gap: 10px;
    }
</style>

