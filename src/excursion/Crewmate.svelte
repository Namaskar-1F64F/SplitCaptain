<script>
    export let name;
    export let checked
    export let ref


</script>

<div class="inline-block">
    <label
        for="description"
        class="block text-sm font-medium text-gray-700">{name}</label>
    <div class="mt-1">
        <input  checked={checked} on:change={(value) => {
            if (value.target.checked) {
                ref.set({checked: true})
            }
            else {
                ref.set({checked: true})
            }
        }} type="checkbox" name="checkbox" id={`${name}`} />
       
    </div>
</div>
