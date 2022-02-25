<script lang="ts">
	export let label: string;
	export let name: string;
	export let type: 'text' | 'number';

	export let required = true;
	export let placeholder: string = '';

	// Currently used to input number of days in a month only
	const attributes = type === 'number' ? { min: 0, max: 31 } : {};
</script>

<div>
	<label class="block font-medium text-gray-700">
		{label}
		<input
			{name}
			{type}
			{required}
			{placeholder}
			{...attributes}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
		/>
	</label>
</div>
