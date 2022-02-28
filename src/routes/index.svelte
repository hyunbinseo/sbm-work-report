<script lang="ts">
	const { VITE_TITLE } = import.meta.env;

	import { v4 as uuidv4 } from 'uuid';

	import AgentData from '$lib/components/report/AgentData.svelte';
	import Approval from '$lib/components/report/Approval.svelte';
	import OrganizationData from '$lib/components/report/OrganizationData.svelte';
	import Agent from '$lib/components/Agent.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Organization from '$lib/components/Organization.svelte';

	let documentId: string;

	const setDocumentId = () => (documentId = uuidv4());

	setDocumentId();
</script>

<svelte:window
	on:beforeprint={setDocumentId}
	on:beforeunload|preventDefault={(e) => (e.returnValue = '')}
/>

<!-- @media print -->
<div class="space-y-6 screen:hidden">
	<code class="text-xs">{documentId}</code>
	<Approval />
	<OrganizationData />
	<AgentData print={true} />
</div>

<!-- @media screen -->
<div class="bg-gray-50 print:hidden">
	<main class="mx-auto max-w-screen-2xl px-4 py-10 sm:py-16 sm:px-6 lg:px-12 xl:px-16">
		<h1 class="pb-10 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
			{VITE_TITLE}
		</h1>
		<div class="xl:grid xl:grid-cols-2 xl:gap-x-16">
			<!-- Column -->
			<div>
				<!-- Organization -->
				<div>
					<h2 class="text-lg font-medium text-gray-900">기관 정보</h2>
					<Organization />
				</div>
				<!-- Agent -->
				<div class="mt-10 border-t border-gray-200 pt-10">
					<h2 class="text-lg font-medium text-gray-900">보수 정보</h2>
					<Agent />
				</div>
			</div>
			<!-- Column -->
			<div class="mt-10 lg:mt-0">
				<!-- Data -->
				<div
					class="mt-10 border-t border-gray-200 pt-10 sm:sticky sm:top-10 xl:mt-0 xl:border-none xl:pt-0"
				>
					<h2 class="text-lg font-medium text-gray-900">입력 정보</h2>
					<div
						class="mt-4 space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white py-6 px-4 shadow-sm sm:px-6"
					>
						<OrganizationData />
						<AgentData />
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
