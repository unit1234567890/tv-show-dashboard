<template>
  <SearchBar class="search-bar" @search="handleSearch" />

  <!-- Display error message, if any -->
  <div v-if="errorMessage" class="error-message" data-test="error-message">{{ errorMessage }}</div>

  <!-- Empty state: if no shows to display and nothing is loading -->
  <EmptyState
    v-if="!sortedGenres.length && !isLoading && !isSearching && !hasError"
    title-text="Looks like we couldn't find anything."
  >
    <template #description>
      <p>Why not try a different search?</p>
    </template>
    <template #actions>
      <button @click="resetSearch">Return to Shows</button>
    </template>
  </EmptyState>

  <!-- shows grouped by genre in horizontal scroll sections -->
  <div
    v-for="[genre, genreShows] in sortedGenres"
    :key="genre"
    class="genre-section"
    data-test="genre-section"
  >
    <div class="genre-section__header">
      <h2 class="genre-header__title">{{ genre }}</h2>
    </div>
    <div class="scroll-container__wrapper">
      <div class="scroll-content">
        <ShowCard
          v-for="show in genreShows"
          :key="show.id"
          :show="show"
          :link-to="`/show/${show.id}`"
        />
      </div>
    </div>
  </div>

  <!-- Loading indicator -->
  <LoadingIndicator v-if="isLoading" />
</template>

<script setup lang="ts">
import ShowCard from '@/components/shows/ShowCard.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import LoadingIndicator from '@/components/common/LoadingIndicator.vue'
import { useShowsListing } from '@/composable/useShowsListing'

const { sortedGenres, isLoading, isSearching, errorMessage, searchQuery, hasError } =
  useShowsListing()

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const resetSearch = () => {
  searchQuery.value = ''
}
</script>

<style scoped>
.search-bar {
  margin: 1rem auto 2rem;
  max-width: 600px;
}

.error-message {
  color: #f44336;
  text-align: center;
  font-weight: bold;
  margin: 1rem 0;
}

.genre-section {
  margin-bottom: 3rem;
}

.genre-section__header {
  background-color: #66c2b9;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 8px 8px 0 0;
  text-align: center;
  margin-bottom: 1rem;
}

.genre-header__title {
  font-size: 1rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
}

.scroll-container__wrapper {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}
.scroll-content > * {
  scroll-snap-align: start;
}

.scroll-content {
  display: flex;
  gap: 1.5rem;
}

.scroll-container__wrapper::-webkit-scrollbar {
  height: 8px;
}

.scroll-container__wrapper::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.scroll-container__wrapper::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.scroll-container__wrapper::-webkit-scrollbar-track {
  background: #f3f4f6;
}
</style>
