<script lang="ts">
	export let label: string;
	export let name: string;
	export let value = undefined;
	export let options: [text: string, value?: string | number | null][];

	let select: HTMLSelectElement;

	// Reset selected index when `options` prop changes
	$: if (options && select) select.selectedIndex = 0;
</script>

<div>
	<label class="block font-medium text-gray-700">
		{label}
		<select
			{name}
			bind:value
			bind:this={select}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
		>
			{#each options as [text, value]}
				<option value={value || text}>{text}</option>
			{/each}
		</select>
	</label>
</div>
