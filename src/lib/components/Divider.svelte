<script lang="ts">
	export let name: string;
</script>

<div class="relative mt-4">
	<div class="absolute inset-0 flex items-center" aria-hidden="true">
		<div class="w-full border-t border-gray-300" />
	</div>
	<div class="relative flex justify-center">
		<span class="text-md bg-white px-3 font-medium text-gray-900">{name}</span>
	</div>
</div>
