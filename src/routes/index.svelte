<script lang="ts">
	import Approval from '$lib/components/report/Approval.svelte';
	import Data from '$lib/components/report/Data.svelte';
	import Agent from '$lib/components/Agent.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Organization from '$lib/components/Organization.svelte';
</script>

<!-- @media print -->
<div class="space-y-6 screen:hidden">
	<Approval />
	<Data print={true} />
</div>

<!-- @media screen -->
<div class="bg-gray-50 print:hidden">
	<main class="mx-auto max-w-screen-2xl px-4 py-10 sm:py-16 sm:px-6 lg:px-12 xl:px-16">
		<div class="xl:grid xl:grid-cols-2 xl:gap-x-16">
			<!-- Column -->
			<div>
				<!-- Organization -->
				<div>
					<h2 class="text-lg font-medium text-gray-900">기관 정보</h2>
					<Organization />
				</div>
				<!-- Agent -->
				<div class="mt-10 border-t border-gray-200 pt-10 sm:sticky sm:top-0">
					<h2 class="text-lg font-medium text-gray-900">보수 정보</h2>
					<Agent />
				</div>
			</div>
			<!-- Column -->
			<div class="mt-10 lg:mt-0">
				<!-- Data -->
				<div class="mt-10 border-t border-gray-200 pt-10 xl:mt-0 xl:border-none xl:pt-0">
					<h2 class="text-lg font-medium text-gray-900">입력 정보</h2>
					<div
						class="mt-4 space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white py-6 px-4 shadow-sm sm:px-6"
					>
						<Data />
						<button
							on:click={() => window.print()}
							type="button"
							class="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
						>
							인쇄하기
						</button>
					</div>
				</div>
			</div>
		</div>
	</main>
	<Footer />
</div>
