<template>
  <router-link :to="linkTo" :class="isDetailed ? 'show-card__detailed' : 'show-card__compact'">
    <div v-if="!isDetailed" class="compact-container">
      <img
        :src="show.image?.medium || 'https://via.placeholder.com/210x295'"
        :alt="show.name || 'No Title'"
        class="show-image"
      />
      <div class="compact-info">
        <h2 class="compact-info__name">{{ show.name }}</h2>
        <p><strong>Rating:</strong> ⭐ {{ show.rating.average || 'Not available' }}</p>
      </div>
    </div>
    <div v-else class="flex-container">
      <img
        :src="show.image?.medium || 'https://via.placeholder.com/210x295'"
        :alt="show.name || 'No Title'"
        class="show-image"
      />
      <div class="basic-info">
        <h2>{{ show.name }}</h2>
        <p><strong>Rating:</strong> ⭐ {{ show.rating.average || 'Not available' }}</p>

        <template v-if="isDetailed">
          <p><strong>Genres:</strong> {{ show.genres.join(', ') }}</p>
          <p><strong>Status:</strong> {{ show.status }}</p>
          <p><strong>Duration:</strong> {{ show.runtime }} minutes</p>
          <p><strong>Premiered:</strong> {{ show.premiered }}</p>
          <p><strong>Ended:</strong> {{ show.ended }}</p>
          <p><strong>Language:</strong> {{ show.language }}</p>
        </template>
      </div>
    </div>
    <div v-if="isDetailed" class="summary" v-html="show.summary"></div>
  </router-link>
</template>

<script setup lang="ts">
import type { Show } from '@/types/models'

withDefaults(
  defineProps<{
    show: Show
    isDetailed?: boolean
    linkTo?: string
  }>(),
  {
    isDetailed: false,
    linkTo: ''
  }
)
</script>

<style scoped>
/* Detailed Layout */
.show-card__detailed {
  display: block;
  background-color: #ffffff;
  border-radius: var(--border-radius);
  padding: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: var(--box-shadow);
  text-decoration: none;
  color: inherit;
  pointer-events: none;
}

/* Compact Layout */
.show-card__compact {
  display: block;
  background-color: #ffffff;
  border-radius: var(--border-radius);
  text-decoration: none;
  color: inherit;
  width: 13.125rem;
  margin: auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.show-card__compact:hover {
  transform: translateY(-0.25rem);
  box-shadow: var(--hover-box-shadow);
}

.compact-container {
  text-align: center;
  height: 25rem;
}

.show-image {
  border-radius: var(--border-radius);
  width: 210px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.compact-info h2 {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: var(--font-color-primary);
}

.compact-info p {
  font-size: 0.9rem;
  color: var(--font-color-secondary);
}

.flex-container {
  display: flex;
  gap: var(--gap);
}

.basic-info {
  flex: 1;
  text-align: left;
}

.basic-info h2 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--font-color-primary);
}

.basic-info p {
  margin: 0.25rem 0;
}

.summary {
  margin-top: 1rem;
  text-align: left;
  font-size: 0.9rem;
  line-height: 1.5;
}

:deep(.summary p) {
  margin: 0;
}

.compact-info__name {
  overflow-wrap: break-word;
  white-space: normal;
}

@media (max-width: 768px) {
  .flex-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .show-image {
    width: 100%;
    max-width: 300px;
    height: auto;
  }

  .basic-info {
    text-align: center;
    margin-top: 1rem;
  }

  .basic-info h2 {
    font-size: 1.1rem;
  }

  .basic-info p {
    font-size: 0.9rem;
  }

  .summary {
    font-size: 0.9rem;
    line-height: 1.4;
    margin-top: 1rem;
  }

  .show-card__compact {
    margin: 0.5rem auto;
  }
}
</style>

