<script lang="ts">
	import { onMount, tick } from 'svelte';

	import Input from '$lib/components/elements/Input.svelte';
	import Select from '$lib/components/elements/Select.svelte';
	import { gangnam } from '$lib/data/organizations';
	import { organizationStore, createOrganizationData } from '$lib/stores/organization';

	import type { Category } from '$lib/data/organizations';

	// Category

	let category: Category;

	// Inferred return type `string[][]` is not compatible with the `options` prop
	const getOrganizations = (category: Category): [text: string][] =>
		gangnam[category || 'department'].map((value) => [value]);

	$: organizations = getOrganizations(category);

	// Month

	let monthInput: HTMLInputElement;

	const setMonthInput = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = `${date.getMonth() + 1}`.padStart(2, '0');
		monthInput.value = `${year}-${month}`;
	};

	// Organization

	let organizationForm: HTMLFormElement;

	const setOrganizationStore = async () => {
		await tick();
		organizationForm.reportValidity();
		const formData = new FormData(organizationForm);
		organizationStore.set(createOrganizationData(formData));
	};

	onMount(async () => {
		setMonthInput();
		await setOrganizationStore();
	});
</script>

<form
	bind:this={organizationForm}
	on:submit|preventDefault
	on:change={setOrganizationStore}
	class="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
>
	<div class="grid grid-cols-1 gap-y-6 p-4 pb-6 sm:grid-cols-2 sm:gap-x-4 sm:p-6 sm:pb-8">
		<Select name="city" label="도시" options={[['서울특별시']]} />
		<Select name="district" label="구" options={[['강남구']]} />
		<Select
			bind:value={category}
			name="category"
			label="분류"
			options={[
				['구청/보건소', 'department'],
				['동주민센터', 'center'],
				['사회복지시설', 'facility']
			]}
		/>
		{#if category === 'facility'}
			<Input
				name="organization"
				label="소속"
				type="text"
				placeholder="기관명을 입력해주세요"
				alignRight={false}
			/>
		{:else}
			<Select name="organization" label="소속" options={organizations} />
		{/if}
		<Select
			name="type"
			label="구분"
			options={category === 'facility' ? [['사회복지시설']] : [['지방자치단체'], ['사회복지시설']]}
		/>
		<div>
			<label class="block text-gray-700">
				대상 연월
				<input
					bind:this={monthInput}
					name="month"
					type="month"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
				/>
			</label>
		</div>
	</div>
</form>
