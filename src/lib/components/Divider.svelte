<script lang="ts">
	export let name: string;
</script>

<div class="relative mb-1 mt-5">
	<div class="absolute inset-0 flex items-center" aria-hidden="true">
		<div class="w-full border-t border-gray-300" />
	</div>
	<div class="relative flex justify-center sm:justify-start sm:pl-3">
		<span class="text-md bg-white px-3 text-gray-900 sm:text-lg">{name}</span>
	</div>
</div>
