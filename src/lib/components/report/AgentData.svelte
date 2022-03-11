<script lang="ts">
	import { agentStore, agentStoreByName } from '$lib/stores/agent';
	import { organizationStore } from '$lib/stores/organization';

	export let print = false;
</script>

<div class="break-after-page overflow-x-auto">
	<table class="min-w-full whitespace-nowrap">
		<!-- Reference https://www.w3.org/WAI/tutorials/tables/irregular/ -->
		<col />
		<col />
		<col />
		<colgroup span={!print ? 2 : 8} />
		<colgroup span="3" />
		{#if !print}
			<col />
		{/if}
		<tr class="bg-gray-100">
			<th scope="col" rowspan="2">번호</th>
			<th scope="col" rowspan="2">요원</th>
			<th scope="col" rowspan="2">출장<br />횟수</th>
			<th scope="colgroup" colspan={!print ? 2 : 8}>보수 지급</th>
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
				<th scope="col">오전<br />반가</th>
				<th scope="col">오후<br />반가</th>
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
				<td colspan={!print ? 9 : 14} class="text-center">입력된 보수 정보가 없습니다.</td>
			</tr>
		{:else}
			{#each !print ? $agentStore : $agentStoreByName as agent, index (agent.id)}
				<tr class:bg-gray-50={index % 2 === 1}>
					<th scope="row">{index + 1}</th>
					<th scope="row">{agent.name}</th>
					<td>{agent.businessTrip}회</td>
					{#if !print}
						<td>{Object.values(agent.paid).reduce((a, b) => a + b)}일 </td>
					{:else}
						<td>{agent.paid.annualLeave}일</td>
						<td>{agent.paid.halfLeaveAm}회</td>
						<td>{agent.paid.halfLeavePm}회</td>
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

{#if print}
	{#each $agentStoreByName as agent (agent.id)}
		<div class="break-after-page space-y-6">
			<!-- Header -->
			<div class="space-y-2">
				<h1 class="text-3xl font-bold">{agent.name} 사회복무요원</h1>
				<h2>
					{$organizationStore.city}
					{$organizationStore.district}
					{$organizationStore.organization} ({$organizationStore.month})
				</h2>
			</div>
			<!-- Data -->
			<div class="space-y-2">
				<table class="whitespace-nowrap">
					<col />
					<colgroup span="8" />
					<colgroup span="3" />
					<tr class="bg-gray-100">
						<th scope="col" rowspan="2">출장<br />횟수</th>
						<th scope="colgroup" colspan="8">보수 지급</th>
						<th scope="colgroup" colspan="3">보수 미지급</th>
					</tr>
					<tr class="bg-gray-100">
						<th scope="col">연가</th>
						<th scope="col">오전<br />반가</th>
						<th scope="col">오후<br />반가</th>
						<th scope="col">병가</th>
						<th scope="col">공가</th>
						<th scope="col">청원<br />휴가</th>
						<th scope="col">특별<br />휴가</th>
						<th scope="col">교육</th>
						<th scope="col">결근</th>
						<th scope="col">병가</th>
						<th scope="col">이탈</th>
					</tr>
					<tr>
						<td>{agent.businessTrip}회</td>
						<td>{agent.paid.annualLeave}일</td>
						<td>{agent.paid.halfLeaveAm}회</td>
						<td>{agent.paid.halfLeavePm}회</td>
						<td>{agent.paid.sickLeave}일</td>
						<td>{agent.paid.officialLeave}일</td>
						<td>{agent.paid.emergencyLeave}일</td>
						<td>{agent.paid.specialLeave}일</td>
						<td>{agent.education}일</td>
						<td>{agent.unpaid.exceedLeave}일</td>
						<td>{agent.unpaid.sickLeave}일</td>
						<td>{agent.unpaid.absence}일</td>
					</tr>
				</table>
				<p class="text-sm"><sup>1</sup> 출장 횟수만큼 지급 기준에 따른 교통비가 지급됩니다.</p>
				<p class="text-sm"><sup>2</sup> 오후 반가 사용일과 교육일에만 중식비가 지급됩니다.</p>
				<p class="text-sm"><sup>3</sup> 교육일에 대한 중식비는 병무청에서 별도 지급됩니다.</p>
			</div>
			<hr />
			<!-- Standard -->
			<div class="space-y-3">
				<h2 class="text-2xl font-medium tracking-tight">지급 기준</h2>
				<p class="text-sm">
					병무청 / 정보공개 / 정보게시판 / 국·실별 주요정보 / 사회복무국 - 에서도 확인 가능합니다.
				</p>
				<table>
					<tr class="bg-gray-100">
						<th>비목</th>
						<th>산정 기준</th>
						<th>금액 ('22년)</th>
					</tr>
					<tr>
						<td>교통비</td>
						<td class="text-left">시내버스 현금 요금 × 2</td>
						<td class="text-left">2,600원 (서울시 기준)</td>
					</tr>
					<tr class="bg-gray-50">
						<td>중식비</td>
						<td class="text-left">국가공무원 매식비 단가</td>
						<td class="text-left">7,000원 이상</td>
					</tr>
					<tr>
						<td>봉급</td>
						<td class="text-left">공무원보수규정</td>
						<td class="text-left">하단 군인의 봉급표 참조</td>
					</tr>
				</table>
				<table>
					<tr class="bg-gray-100">
						<th>계급</th>
						<th>복무 기간</th>
						<th>봉급 ('22년)</th>
					</tr>
					<tr>
						<td>이등병</td>
						<td>소집월~2개월</td>
						<td>510,100원</td>
					</tr>
					<tr class="bg-gray-50">
						<td>일등병</td>
						<td>3개월~8개월</td>
						<td>552,100원</td>
					</tr>
					<tr>
						<td>상등병</td>
						<td>9개월~14개월</td>
						<td>610,200원</td>
					</tr>
					<tr class="bg-gray-50">
						<td>병장</td>
						<td>15개월이상</td>
						<td>676,100원</td>
					</tr>
				</table>
			</div>
		</div>
	{/each}
{/if}
