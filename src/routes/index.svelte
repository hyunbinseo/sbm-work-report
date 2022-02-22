<script lang="ts">
	import Select from '$lib/components/elements/Select.svelte';

	import Agent from '$lib/components/Agent.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Report from '$lib/components/Report.svelte';

	import { gangnam } from '$lib/data/organizations';

	import type { Category } from '$lib/data/organizations';

	let category: Category;

	const getOrganizations = (): [text: string][] =>
		gangnam[category || 'department'].map((value) => [value]);

	$: organizations = getOrganizations();
</script>

<div class="bg-gray-50">
	<main class="mx-auto max-w-screen-2xl px-4 py-10 sm:py-16 sm:px-6 lg:px-12 xl:px-16">
		<form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
			<!-- Column -->
			<div>
				<!-- Organization -->
				<div>
					<h2 class="text-lg font-medium text-gray-900">기관 정보</h2>
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
					</div>
				</div>
				<!-- Agent -->
				<div class="mt-10 border-t border-gray-200 pt-10">
					<h2 class="text-lg font-medium text-gray-900">보수 정보</h2>
					<Agent />
					<Divider />
				</div>
			</div>
			<!-- Column -->
			<div class="mt-10 lg:mt-0">
				<h2 class="text-lg font-medium text-gray-900">보고서</h2>
				<div
					class="mt-4 space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white py-6 px-4 shadow-sm sm:sticky sm:top-6 sm:px-6 lg:top-8"
				>
					<Report />
					<div class="border-t border-gray-200">
						<button
							type="submit"
							class="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
						>
							저장
						</button>
					</div>
				</div>
			</div>
		</form>
	</main>
	<Footer />
</div>
