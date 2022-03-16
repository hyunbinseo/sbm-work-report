<script lang="ts">
	const { VITE_TITLE } = import.meta.env;

	import { onMount } from 'svelte';

	import AgentData from '$lib/components/report/AgentData.svelte';
	import Approval from '$lib/components/report/Approval.svelte';
	import OrganizationData from '$lib/components/report/OrganizationData.svelte';
	import Agent from '$lib/components/Agent.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Organization from '$lib/components/Organization.svelte';
	import { generateCsv } from '$lib/data/csv';
	import { organizationStore } from '$lib/stores/organization';

	const downloadCsv = async () => {
		const csv = await generateCsv();
		if (csv instanceof Error) return alert(csv.message);
		const anchor = document.createElement('a');
		anchor.href = `data:text/csv;charset=utf-8,%EF%BB%BF${csv}`;
		anchor.target = '_blank';
		anchor.download = `[${$organizationStore.month}] ${$organizationStore.district} ${$organizationStore.organization} - ${$organizationStore.type}.csv`;
		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);
		alert('파일이 다운로드 되었습니다.');
	};

	let isSafariOnMac = false;

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
	<main class="mx-auto max-w-screen-2xl px-4 py-10 sm:py-16 sm:px-6 lg:px-12 xl:px-16">
		<div class="pb-10">
			<h1 class="pb-2 text-2xl font-bold leading-7 tracking-tight text-gray-900 sm:text-3xl">
				{VITE_TITLE} 작성
			</h1>
			<p class="text-gray-500">결재 문서, 요원별 내역서, 엑셀 파일을 생성합니다.</p>
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
						class="mt-4 space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white py-6 px-4 shadow-sm sm:px-6"
					>
						<OrganizationData />
						<AgentData />
						<button
							on:click={() => window.print()}
							type="button"
							class="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base text-white shadow-sm hover:bg-indigo-700 focus:bg-white focus:text-gray-700 focus:hover:bg-gray-50"
						>
							인쇄 및 파일 다운로드
						</button>
						{#if isSafariOnMac}
							<p class="text-xs text-gray-500">
								macOS Safari에서는 위 버튼이 <a
									href="https://github.com/crabbly/Print.js/issues/528">1회만 작동</a
								>합니다. 이후에는 메뉴 막대 > 파일 > 프린트 메뉴를 이용합니다.
							</p>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</main>
	<Footer />
</div>
