<template>
  <!-- Loading state -->
  <LoadingIndicator v-if="isLoading && !show" />

  <!-- Show details -->
  <div v-if="show && !hasError">
    <div class="show-details__header">
      <router-link to="/" class="show-details__return-button"> Return to shows </router-link>
    </div>
    <div class="show-details__card-container">
      <ShowCard :show="show" isDetailed />
    </div>
  </div>

  <!-- Show not found state -->
  <EmptyState v-if="!isLoading && !show" titleText="Show is not found">
    <template #description>
      <p>The show isn't available right now. Please try again later.</p>
    </template>
    <template #actions>
      <router-link to="/">Return to Shows</router-link>
    </template>
  </EmptyState>
</template>

<script setup lang="ts">
import LoadingIndicator from '@/components/common/LoadingIndicator.vue'
import ShowCard from '@/components/shows/ShowCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShowsListing } from '@/composable/useShowsListing'
import type { Show } from '@/types/models'

const route = useRoute()
const showId = Number(route.params.id)
const { fetchShowDetails } = useShowsListing()

const show = ref<Show | null>(null)
const isLoading = ref(true)
const hasError = ref(false)

onMounted(async () => {
  if (!showId) {
    isLoading.value = false
    return
  }

  try {
    show.value = await fetchShowDetails(showId)
  } catch (error) {
    hasError.value = true
    show.value = null
  } finally {
    isLoading.value = false
  }
})
</script>


<style scoped>
.show-details__header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.show-details__return-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: #28afa6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
}

.show-details__return-button:hover {
  background-color: #197e7d;
}

.show-details__card-container {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  justify-content: center;
  max-width: 1000px;
  align-items: center;
  margin: 1rem auto;
}

@media (max-width: 768px) {
  .show-details__card-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .show-details__return-button {
    font-size: 0.9rem;
  }

  .show-details__card-container {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
