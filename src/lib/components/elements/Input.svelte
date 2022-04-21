<script lang="ts">
	export let label: string;
	export let name: string;
	export let type: 'text' | 'number';
	export let required = true;
	export let placeholder = '';
	export let alignRight = true;
	export let unit = '';

	// Currently used to input number of days in a month only
	const attributes = type === 'number' ? { min: 0, max: 31 } : {};
</script>

<div>
	<label for="input-{name}" class="block text-gray-700">
		{label}
	</label>
	<!-- .flex-row-reverse to keep input focus outline from being covered -->
	<div class="mt-1 flex flex-row-reverse rounded-md shadow-sm">
		{#if unit}
			<span
				class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
			>
				{unit}
			</span>
		{/if}
		<input
			id="input-{name}"
			{name}
			{type}
			{required}
			{placeholder}
			{...attributes}
			class="block max-w-full flex-1 border-gray-300 tracking-tight placeholder:text-left"
			class:rounded-md={!unit}
			class:rounded-l-md={unit}
			class:text-right={alignRight}
		/>
	</div>
</div>
