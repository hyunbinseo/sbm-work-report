<script lang="ts">
	import Input from '$lib/components/elements/Input.svelte';
</script>

<div
	class="mt-6 grid grid-cols-2 gap-y-6 gap-x-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:grid-cols-3 sm:px-6 sm:pt-5 sm:pb-7"
>
	<Input label="이름" name="name" placeholder="홍길동" type="text" />
	<Input label="출장 횟수" name="business-trip" type="number" />
	<Input label="연가 일수" name="annual-leave" type="number" />
	<Input label="교육 일수" name="education" type="number" />
	<Input label="병가 일수" name="sick-leave" type="number" placeholder="30일 이하" />
	<Input label="병가 일수 (공제)" name="deduct-sick-leave" type="number" placeholder="30일 초과" />
	<Input label="이탈 일수 (공제)" name="deduct-leave" type="number" />
	<Input label="결근 일수 (공제)" name="deduct-absence" type="number" />
</div>
