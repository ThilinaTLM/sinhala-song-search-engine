<script lang="ts">
    export let label = '';
    export let placeholder = '';
    export let value = ''

    export let disabled = true;
</script>

<div class="form-control w-full max-w-xs">
    <label class="label pb-1">
        <span class="label-text"> {label} </span>
    </label>
    <input type="text" placeholder={placeholder} class="input input-sm input-bordered w-full max-w-xs"
           bind:value
        disabled={disabled? 'disabled': undefined}
    />
</div>
