<script lang="ts">

    // data
    let text = '';
    let title = '';
    let metaphor = '';

    // state
    let isOpen = false;
    let resolver;

    export const open = ({title, metaphor}) => {
        text = '';
        title = title;
        metaphor = metaphor;
        isOpen = true;
        return new Promise((resolve) => {
            resolver = resolve;
        });
    }

    function onSave() {
        resolver && resolver(text);
        resolver = null;
        isOpen = false;
    }

    function onCancel() {
        resolver && resolver(null);
        resolver = null;
        isOpen = false;
    }

</script>

<input type="checkbox" id="my-modal" class="modal-toggle" bind:checked={isOpen} />
<div class="modal">
    <div class="modal-box">
         <div class="form-control min-h-[100px]">
            <label class="label">
                <span class="label-text">{title}</span>
            </label>

             <p class="text-xs text-gray-300">{metaphor}</p>

            <textarea class="textarea textarea-bordered h-24" bind:value={text}></textarea>
        </div>

        <div class="flex justify-end mt-4">
            <button class="btn btn-sm btn-primary w-[70px] ml-3" on:click={onSave}>Save</button>
            <button class="btn btn-sm btn-ghost w-[70px] ml-3" on:click={onCancel}>Cancel</button>
        </div>
    </div>
</div>