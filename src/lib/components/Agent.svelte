<script lang="ts">
	import Input from '$lib/components/elements/Input.svelte';
</script>

<form
	on:submit|preventDefault={() => {}}
	class="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
>
	<div
		class="grid grid-cols-2 gap-y-6 gap-x-4 p-4 sm:grid-cols-3 sm:px-6 sm:pt-5 sm:pb-7 xl:grid-cols-4"
	>
		<Input label="이름" name="name" placeholder="홍길동" type="text" />
		<Input label="출장 횟수" name="business-trip" type="number" />
		<Input label="연가 일수" name="annual-leave" type="number" />
		<Input label="교육 일수" name="education" type="number" />
		<Input label="병가 일수" name="sick-leave" type="number" placeholder="30일 이하" />
		<Input
			label="병가 일수 (공제)"
			name="deduct-sick-leave"
			type="number"
			placeholder="30일 초과"
		/>
		<Input label="이탈 일수 (공제)" name="deduct-leave" type="number" value={0} />
		<Input label="결근 일수 (공제)" name="deduct-absence" type="number" value={0} />
	</div>
	<nav
		class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
		aria-label="보수 정보 조작"
	>
		<div class="hidden sm:block">
			<p class="text-gray-700">전부 필수 항목입니다.</p>
		</div>
		<div class="flex flex-1 justify-between sm:justify-end">
			<button
				type="reset"
				class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
			>
				초기화
			</button>
			<button
				class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
			>
				추가
			</button>
		</div>
	</nav>
</form>
