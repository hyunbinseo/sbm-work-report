<script lang="ts">
	import { agentStore } from '$lib/stores/agent';

	export let print = false;
</script>

<div class="overflow-x-auto">
	<table class="min-w-full whitespace-nowrap">
		<!-- Reference https://www.w3.org/WAI/tutorials/tables/irregular/ -->
		<col />
		<col />
		<col />
		<colgroup span="2" />
		<colgroup span="3" />
		{#if !print}
			<col />
		{/if}
		<tr class="bg-gray-100">
			<th scope="col" rowspan="2">번호</th>
			<th scope="col" rowspan="2">요원</th>
			<th scope="col" rowspan="2">출장<br />횟수</th>
			<th scope="colgroup" colspan={!print ? 2 : 6}>보수 지급</th>
			<th scope="colgroup" colspan="3">보수 미지급</th>
			{#if !print}
				<th scope="col" rowspan="2">비고</th>
			{/if}
		</tr>
		<tr class="bg-gray-100">
			{#if !print}
				<th scope="col">휴가</th>
			{:else}
				<th scope="col">연가</th>
				<th scope="col">병가</th>
				<th scope="col">공가</th>
				<th scope="col">청원<br />휴가</th>
				<th scope="col">특별<br />휴가</th>
			{/if}
			<th scope="col">교육</th>
			<th scope="col">결근</th>
			<th scope="col">병가</th>
			<th scope="col">이탈</th>
		</tr>
		{#if !$agentStore.length}
			<tr>
				<td colspan={!print ? 9 : 12} class="text-center">입력된 보수 정보가 없습니다.</td>
			</tr>
		{:else}
			{#each $agentStore as agent, index (agent.id)}
				<tr class:bg-gray-50={index % 2 === 1}>
					<th scope="row">{index + 1}</th>
					<th scope="row">{agent.name}</th>
					<td>{agent.businessTrip}회</td>
					{#if !print}
						<td>{Object.values(agent.paid).reduce((a, b) => a + b)}일 </td>
					{:else}
						<td>{agent.paid.annualLeave}일</td>
						<td>{agent.paid.sickLeave}일</td>
						<td>{agent.paid.officialLeave}일</td>
						<td>{agent.paid.emergencyLeave}일</td>
						<td>{agent.paid.specialLeave}일</td>
					{/if}
					<td>{agent.education}일</td>
					<td>{agent.unpaid.exceedLeave}일</td>
					<td>{agent.unpaid.sickLeave}일</td>
					<td>{agent.unpaid.absence}일</td>
					{#if !print}
						<td class="text-center">
							<button
								on:click={() => {
									agentStore.remove(agent.id);
								}}
								type="button"
								class="text-red-500">삭제</button
							>
						</td>
					{/if}
				</tr>
			{/each}
		{/if}
	</table>
</div>
