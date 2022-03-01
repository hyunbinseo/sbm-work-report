<script lang="ts">
	import { onMount, tick } from 'svelte';

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
		const formData = new FormData(organizationForm);
		organizationStore.set(createOrganizationData(formData));
	};

	onMount(async () => {
		setMonthInput();
		await setOrganizationStore();
	});
</script>

<form bind:this={organizationForm} on:change={setOrganizationStore}>
	<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
		<Select name="city" label="도시" options={[['서울특별시']]} />
		<Select name="district" label="구" options={[['강남구']]} />
		<Select
			bind:value={category}
			name="category"
			label="분류"
			options={[
				['구청/보건소', 'department'],
				['동주민센터', 'center']
			]}
		/>
		<Select name="organization" label="소속" options={organizations} />
		<Select name="type" label="구분" options={[['지방자치단체'], ['사회복지시설']]} />
		<div>
			<label class="block font-medium text-gray-700">
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