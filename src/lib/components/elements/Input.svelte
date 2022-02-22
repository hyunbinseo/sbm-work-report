<script lang="ts">
	export let label: string;
	export let name: string;
	export let placeholder: string = '';
	export let type: 'text' | 'number';
</script>

<div>
	<label for="cvc" class="block font-medium text-gray-700">
		{label}
		<input
			{type}
			{name}
			{placeholder}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
		/>
	</label>
</div>
