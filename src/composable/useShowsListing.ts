import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { showsApi } from '@/api/showsApi'
import { groupShowsByGenre, sortGroupedShows } from '@/utils/showsSorting'
import { showStore } from '@/stores/showStore'
import type { Show } from '@/types/models'

const SEARCH_DEBOUNCE_TIME_MS = 300

export function useShowsListing() {
  const store = showStore()

  const searchResults = ref<Show[]>([])
  const searchQuery = ref('')
  const isLoading = ref(false)
  const isSearching = ref(false)
  const errorMessage = ref('')
  const hasError = ref(false)

  const searchCache = new Map<string, Show[]>()
  let searchTimeout: ReturnType<typeof setTimeout> | null = null

  async function loadShows() {
    if (store.hasShowsLoaded) return
    isLoading.value = true
    try {
      const shows = await showsApi.getShows(0)
      // Store the fetched data in the store
      store.setShows(shows)
    } catch (error) {
      errorMessage.value = 'Failed to load TV shows. Please try again later.'
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  async function fetchShowDetails(id: number) {
    if (store.getShowById(id)) {
      return store.getShowById(id)!
    }
    try {
      return await showsApi.getShowById(id)
    } catch (error) {
      throw new Error('Failed to fetch show details.')
    }
  }

  async function performSearch(query: string) {
    const trimmedQuery = query.trim()
    if (!trimmedQuery) {
      searchResults.value = []
      hasError.value = false
      return
    }

    if (searchTimeout) clearTimeout(searchTimeout)
    isSearching.value = true
    hasError.value = false

    searchTimeout = setTimeout(async () => {
      if (searchCache.has(trimmedQuery)) {
        searchResults.value = searchCache.get(trimmedQuery) || []
        isSearching.value = false
        return
      }

      try {
        isLoading.value = true
        const results = await showsApi.searchShows(trimmedQuery)
        searchResults.value = results.map(result => result.show)
        searchCache.set(trimmedQuery, searchResults.value)
      } catch (error) {
        errorMessage.value = 'Failed to search TV shows. Please try again later.'
        hasError.value = true
        searchResults.value = []
      } finally {
        isLoading.value = false
        isSearching.value = false
      }
    }, SEARCH_DEBOUNCE_TIME_MS)
  }

  watch(searchQuery, performSearch)

  onMounted(loadShows)

  onUnmounted(() => {
    if (searchTimeout) clearTimeout(searchTimeout)
  })

  const displayedShows = computed(() =>
    searchQuery.value.trim() ? searchResults.value : store.allShows
  )

  const sortedGenres = computed(() => {
    const grouped = groupShowsByGenre(displayedShows.value)
    return Array.from(sortGroupedShows(grouped).entries()).sort(([a], [b]) => a.localeCompare(b))
  })

  return {
    sortedGenres,
    isLoading,
    isSearching,
    errorMessage,
    searchQuery,
    hasError,
    fetchShowDetails
  }
}
