import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Show } from '@/types/models'

export const showStore = defineStore('shows', () => {
  const showsMap = ref(new Map<number, Show>())

  // Getters
  const hasShowsLoaded = computed(() => showsMap.value.size > 0)
  const getShowById = (id: number) => showsMap.value.get(id)
  const allShows = computed(() => Array.from(showsMap.value.values()))

  // Actions
  function setShows(shows: Show[]) {
    shows.forEach((show) => {
      showsMap.value.set(show.id, show)
    })
  }

  return {
    allShows,
    hasShowsLoaded,
    getShowById,
    setShows,
  }
})