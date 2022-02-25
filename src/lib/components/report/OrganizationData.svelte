<script lang="ts">
	import { slide } from 'svelte/transition';

	import { organizationStore } from '$lib/store';
</script>

{#if $organizationStore}
	<div transition:slide class="overflow-x-auto">
		<table class="min-w-full whitespace-nowrap">
			<tr class="bg-gray-100">
				<th>도시</th>
				<th>구</th>
				<th>소속</th>
				<th>구분</th>
			</tr>
			<tr>
				<td class="text-center">{$organizationStore.city}</td>
				<td class="text-center">{$organizationStore.district}</td>
				<td class="text-center">{$organizationStore.organization}</td>
				<td class="text-center">{$organizationStore.type}</td>
			</tr>
		</table>
	</div>
{/if}
