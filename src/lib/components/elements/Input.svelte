<script lang="ts">
	import { keepInputValue } from '$lib/utilities/form';

	export let label: string;
	export let name: string;
	export let type: 'text' | 'number';

	export let required = true;
	export let placeholder: string = '';
	export let value: string | number = null;

	// Currently used to input number of days only
	const attributes = type === 'number' ? { min: 0 } : {};
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
			use:keepInputValue={value === null ? null : value.toString()}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
		/>
	</label>
</div>
