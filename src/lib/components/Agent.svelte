<script lang="ts">
	import Input from '$lib/components/elements/Input.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import { isFormElement } from '$lib/utilities/form';
	import { agentStore, createAgentData } from '$lib/stores/agent';
</script>

<form
	on:submit|preventDefault={({ target }) => {
		if (!isFormElement(target)) return;
		const formData = new FormData(target);
		agentStore.add(createAgentData(formData));
		target.reset();
		target.querySelector('input').focus();
	}}
	class="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
>
	<div class="grid gap-y-6 gap-x-4 p-4 sm:grid-cols-3 sm:p-6">
		<Input label="이름" name="name" placeholder="홍길동" type="text" />
		<Input label="출장 횟수" name="business-trip" type="number" placeholder="교통비 지급 대상" />
		<Input label="교육 일수" name="education" type="number" placeholder="복무기본교육 등" />
	</div>

	<Divider name="연가 및 반일 연가" />
	<div class="grid gap-y-6 gap-x-4 p-4 sm:grid-cols-3 sm:p-6">
		<Input label="연가 일수" name="annual-leave" type="number" />
		<Input
			label="오전 반일 연가 횟수"
			name="half-leave-am"
			type="number"
			placeholder="중식비 미지급"
		/>
		<Input
			label="오후 반일 연가 횟수"
			name="half-leave-pm"
			type="number"
			placeholder="중식비 지급"
		/>
	</div>

	<Divider name="연가를 제외한 휴가" />
	<div class="grid gap-y-6 gap-x-4 p-4 sm:grid-cols-4 sm:p-6">
		<Input label="병가 일수" name="sick-leave" type="number" />
		<Input label="공가 일수" name="official-leave" type="number" />
		<Input label="청원 휴가 일수" name="emergency-leave" type="number" />
		<Input label="특별 휴가 일수" name="special-leave" type="number" />
	</div>

	<Divider name="보수 미지급 대상" />
	<div class="grid gap-y-6 gap-x-4 p-4 pb-6 sm:grid-cols-3 sm:p-6 sm:pb-8">
		<Input
			label="초과 결근 일수"
			name="unpaid-exceed-leave"
			type="number"
			placeholder="연가 일수 기준"
		/>
		<Input
			label="초과 병가 일수"
			name="unpaid-sick-leave"
			type="number"
			placeholder="통산 30일 기준"
		/>
		<Input label="복무 이탈 일수" name="unpaid-absence" type="number" />
	</div>

	<nav
		class="flex items-center justify-between border-t border-gray-200 p-4 sm:px-6 sm:py-5"
		aria-label="보수 정보 조작"
	>
		<div class="hidden sm:block">
			<p class="text-gray-700">모든 항목을 입력해야 합니다.</p>
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
