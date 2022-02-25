<script lang="ts">
	import { agentStore } from '$lib/store';
</script>

<div class="overflow-x-auto">
	<table class="min-w-full whitespace-nowrap">
		<!-- Reference https://www.w3.org/WAI/tutorials/tables/irregular/ -->
		<col />
		<col />
		<col />
		<colgroup span="2" />
		<colgroup span="3" />
		<col />
		<tr class="bg-gray-100">
			<th scope="col" rowspan="2">번호</th>
			<th scope="col" rowspan="2">요원</th>
			<th scope="col" rowspan="2">출장<br />횟수</th>
			<th scope="colgroup" colspan="2">보수 지급</th>
			<th scope="colgroup" colspan="3">보수 미지급</th>
			<th scope="col" rowspan="2">비고</th>
		</tr>
		<tr class="bg-gray-100">
			<th scope="col">휴가</th>
			<th scope="col">교육</th>
			<th scope="col">결근</th>
			<th scope="col">병가</th>
			<th scope="col">이탈</th>
		</tr>
		{#each $agentStore as agent, index (agent.id)}
			<tr class:bg-gray-50={index % 2 === 1}>
				<th scope="row">{index + 1}</th>
				<th scope="row">{agent.name}</th>
				<td>{agent.businessTrip}회</td>
				<td>{Object.values(agent.paid).reduce((a, b) => a + b)}일 </td>
				<td>{agent.education}일</td>
				<td>{agent.unpaid.exceedLeave}일</td>
				<td>{agent.unpaid.sickLeave}일</td>
				<td>{agent.unpaid.absence}일</td>
				<td class="text-center">
					<button
						on:click={() => {
							agentStore.remove(agent.id);
						}}
						type="button"
						class="text-red-500">삭제</button
					>
				</td>
			</tr>
		{/each}
	</table>
</div>
