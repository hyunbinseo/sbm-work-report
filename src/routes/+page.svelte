<script lang="ts">
	const { VITE_TITLE } = import.meta.env;

	import Agent from '$lib/components/Agent.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Organization from '$lib/components/Organization.svelte';
	import AgentData from '$lib/components/report/AgentData.svelte';
	import Approval from '$lib/components/report/Approval.svelte';
	import OrganizationData from '$lib/components/report/OrganizationData.svelte';
	import { generateCsv } from '$lib/data/csv';
	import { agentStore } from '$lib/stores/agent';
	import { organizationStore } from '$lib/stores/organization';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	const downloadCsv = async () => {
		if (window.confirm('제출용 엑셀 파일을 다운로드합니다.')) {
			const csv = await generateCsv();
			if (csv instanceof Error) return alert(csv.message);
			const anchor = document.createElement('a');
			anchor.href = `data:text/csv;charset=utf-8,%EF%BB%BF${csv}`;
			anchor.target = '_blank';
			anchor.download = `[${$organizationStore.month}] ${$organizationStore.district} ${$organizationStore.organization} - ${$organizationStore.type}.csv`;
			document.body.appendChild(anchor);
			anchor.click();
			document.body.removeChild(anchor);
		}
	};

	let isSafariOnMac = false;
	let hasPrintedOnSafari = false;

	onMount(() => {
		if (
			/(Macintosh).*?(Safari).*?/.test(window.navigator.userAgent) &&
			window.navigator.vendor === 'Apple Computer, Inc.'
		)
			isSafariOnMac = true;
	});
</script>

<svelte:window
	on:afterprint={downloadCsv}
	on:beforeunload|preventDefault={(e) => (e.returnValue = '')}
/>

<!-- @media print -->
<div class="space-y-6 screen:hidden">
	<Approval />
	<OrganizationData />
	<AgentData print={true} />
</div>

<!-- @media screen -->
<div class="bg-gray-50 print:hidden">
	<p
		class="flex h-10 items-center justify-center bg-gray-700 px-4 text-sm text-white sm:px-6 lg:px-8"
	>
		입력된 정보는 외부로 전송
		<span class="sm:hidden">되지 않습니다.</span>
		<span class="hidden sm:inline">되거나, 웹 브라우저에 저장되지 않습니다.</span>
	</p>
	<main class="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 sm:py-16 lg:px-12 xl:px-16">
		<div class="pb-10">
			<h1 class="pb-2 text-2xl font-bold leading-7 tracking-tight text-gray-900 sm:text-3xl">
				{VITE_TITLE}
			</h1>
			<p class="text-gray-500">결재 문서, 요원별 내역서, 엑셀 파일을 생성하세요.</p>
		</div>
		<div class="xl:grid xl:grid-cols-2 xl:gap-x-16">
			<!-- Column -->
			<div>
				<!-- Set Organization -->
				<div>
					<h2 class="text-xl tracking-tight text-gray-900">기관 정보</h2>
					<Organization />
				</div>
				<!-- Add Agent Data -->
				<div id="add" class="mt-10 border-t border-gray-200 pt-10">
					<h2 class="text-xl tracking-tight text-gray-900">복무 정보</h2>
					<a href="#data" class="text-sm xl:hidden">입력 정보 확인</a>
					<Agent />
				</div>
			</div>
			<!-- Column -->
			<div class="mt-10 lg:mt-0">
				<!-- Data -->
				<div
					id="data"
					class="mt-10 border-t border-gray-200 pt-10 sm:sticky sm:top-10 xl:mt-0 xl:border-none xl:pt-0"
				>
					<h2 class="text-xl tracking-tight text-gray-900">입력 정보</h2>
					<a href="#add" class="text-sm xl:hidden">복무 정보 추가</a>
					<div
						class="mt-4 space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white px-4 py-6 shadow-sm sm:px-6"
					>
						<OrganizationData />
						<AgentData />
						{#if $agentStore.length}
							<div transition:slide>
								<!-- In macOS Safari, transition is not played after print -->
								<button
									on:click={() => {
										if (isSafariOnMac) hasPrintedOnSafari = true;
										window.print();
									}}
									type="button"
									class:hidden={hasPrintedOnSafari}
									class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base text-white shadow-sm hover:bg-indigo-700 focus:bg-white focus:text-gray-700 focus:hover:bg-gray-50"
								>
									문서 인쇄 및 파일 다운로드
								</button>
								{#if isSafariOnMac}
									{#if !hasPrintedOnSafari}
										<!-- In macOS Safari, before unload is not called when an anchor tag is clicked -->
										<p class="pt-2 text-xs text-gray-500">
											macOS Safari에서는 위 버튼이 <a
												target="_blank"
												rel="noopener"
												href="https://github.com/crabbly/Print.js/issues/528">한 번만 작동</a
											>합니다.
										</p>
									{:else}
										<p class="pt-2 text-xs text-gray-500">
											<code>command + P</code> 단축키를 이용해 문서를 인쇄하고 파일을 다운로드합니다.
										</p>
									{/if}
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</main>
	<Footer />
</div>
