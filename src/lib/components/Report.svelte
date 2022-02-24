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
			<th scope="colgroup" colspan="2">보수 미공제</th>
			<th scope="colgroup" colspan="3">보수 공제</th>
			<th scope="col" rowspan="2">비고</th>
		</tr>
		<tr class="bg-gray-100">
			<th scope="col">휴가</th>
			<th scope="col">교육</th>
			<th scope="col">이탈</th>
			<th scope="col">결근</th>
			<th scope="col">병가</th>
		</tr>
		{#each new Array(30) as _, index}
			<tr class:bg-gray-50={index % 2 === 1}>
				<th scope="row">{index + 1}번</th>
				<th scope="row">홍길동</th>
				<td>1회</td>
				<td>2일</td>
				<td class="text-center">-</td>
				<td class="text-center">-</td>
				<td class="text-center">-</td>
				<td class="text-center">-</td>
				<td class="text-center">
					<button type="button" class="text-red-500">삭제</button>
				</td>
			</tr>
		{/each}
	</table>
</div>
