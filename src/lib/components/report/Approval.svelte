<table class="ml-auto">
	<tr class="bg-gray-100">
		<th scope="col" rowspan="2">결재</th>
		<th>담당</th>
		<th>팀장</th>
		<th>과장</th>
	</tr>
	<tr>
		{#each new Array(3) as _}
			<th class="p-0">
				<div class="h-[2cm] w-[2cm]" />
			</th>
		{/each}
	</tr>
</table>
