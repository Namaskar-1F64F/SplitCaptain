<script>
    export let name;
</script>

<div class="inline-block">
    <label
        for="description"
        class="block text-sm font-medium text-gray-700">{name}</label>
    <div class="mt-1">
        <input type="checkbox" name="checkbox" id={`${name}`} />
    </div>
</div>
