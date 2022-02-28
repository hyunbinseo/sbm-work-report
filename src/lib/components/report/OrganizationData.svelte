<script lang="ts">
	import { slide } from 'svelte/transition';

	import { organizationStore } from '$lib/stores/organization';
</script>

{#if $organizationStore}
	<div transition:slide={{ delay: 100 }} class="overflow-x-auto">
		<table class="min-w-full whitespace-nowrap">
			<tr class="bg-gray-100">
				<th>도시</th>
				<th>구</th>
				<th>소속</th>
				<th>구분</th>
				<th>대상 연월</th>
			</tr>
			<tr>
				<td class="text-center">{$organizationStore.city}</td>
				<td class="text-center">{$organizationStore.district}</td>
				<td class="text-center">{$organizationStore.organization}</td>
				<td class="text-center">{$organizationStore.type}</td>
				<td class="text-center">{$organizationStore.month}</td>
			</tr>
		</table>
	</div>
{/if}
