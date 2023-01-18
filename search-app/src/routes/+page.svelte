<script>
	import api from "../api"
	import {onMount} from "svelte";
	import SongCard from "$lib/SongCard.svelte";
	import Search from "$lib/Search.svelte";
	import {queryBuilder} from "../utils/elastic";
	import logoSvg from "../assets/song-1.svg"

	// results
	let songs = []
	let pages = 1
	let currentPage = 1

	// query
	let query = ""
	let fields = []

	const handleQuery = async (query) => {
		const res = await api.search(query)
		if (res.ok) {
			songs = res.data.hits
			pages = Math.ceil(res.data.count / 20)
			currentPage = 1
		}
	}

	onMount(() => {
		const q = queryBuilder({
			query,
			fields,
			page: currentPage,
		});
		handleQuery(q)
	})

	const handlePageChange = async (page) => {
		const q = queryBuilder({
			query,
			fields,
			page,
		});
		const res = await api.search(q)
		if (res.ok) {
			songs = res.data.hits
			currentPage = page
		}
	}

	const onSearch = ({detail}) => {
		const q = queryBuilder({
			query: detail.query,
			fields: detail.fields,
			page: 1
		});
		query = detail.query
		fields = detail.fields
		console.log("QUERY", detail, q)
		handleQuery(q)
	}
</script>

<svelte:head>
	<title>Sinhala Songs</title>
	<meta name="description" content="Search Sinhala Songs"/>
</svelte:head>

<div class="min-h-screen flex flex-col">
	<header class="bg-white h-fit">
		<!-- Header content -->
		<div class="container mx-auto flex items-center py-4">
			<div class="w-1/4">
				<a href="/">
					<div class="flex justify-start items-center">
						<img src={logoSvg} alt="song" class="w-[50px] h-[50px]"/>
					</div>
				</a>
			</div>
			<Search on:search={onSearch}/>
			<div class="w-1/4 flex justify-end">
				<a href="#" class="px-4">Settings</a>
			</div>
		</div>
	</header>

	<main class="flex-1 bg-white flex flex-row justify-center py-[50px]">
		<!-- Content -->
		<div class="grid grid-cols-4 gap-6 max-w-screen-lg">
			{#each songs as song, i}
				<SongCard song={song}/>
			{/each}
		</div>
	</main>

	<div class="flex flex-row justify-center m-[20px]">
		<nav class="max-w-fit">
			<ul class="inline-flex -space-x-px">
				<li>
					<button class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300
					 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700
					 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
							on:click={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
					>
						<svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
							<path
									d="M7.293 7.293a1 1 0 011.414 0L12 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd" fill-rule="evenodd"></path>
						</svg>
					</button>
				</li>
				{#each Array.from({length: pages}, (_, i) => i + 1) as p }
					<li>
						<button class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300
					hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
					dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
								on:click={() => handlePageChange(p)}
								disabled={currentPage === p}
						>
							{p}
						</button>
					</li>
				{/each}
				<li>
					<button class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300
					rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700
					dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
							on:click={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === pages}
					>
						<svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
							<path
									d="M12.707 12.707a1 1 0 01-1.414 0L8 9.414 4.707 12.707a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
									clip-rule="evenodd" fill-rule="evenodd"></path>
						</svg>
					</button>
				</li>
			</ul>
		</nav>

	</div>

	<footer class="h-fit p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
		<!-- Footer content -->
		<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
			© 2023 All Rights Reserved.
		</span>
		<ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
			<li>
				<a class="mr-4 hover:underline md:mr-6 ">About</a>
			</li>
			<li>
				<a class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
			</li>
			<li>
				<a class="mr-4 hover:underline md:mr-6">Licensing</a>
			</li>
			<li>
				<a class="hover:underline">Contact</a>
			</li>
		</ul>
	</footer>

</div>