<template>
  <div class="empty-state">
    <slot name="image" />

    <p class="empty-state__title" data-test="empty-state-title">
      {{ titleText }}
    </p>

    <div class="empty-state__description" data-test="empty-state-description">
      <slot name="description" />
    </div>

    <div v-if="$slots.actions" class="empty-state__actions" data-test="empty-state-actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, useSlots } from 'vue'

defineProps<{
  titleText: string
}>()

const slots = useSlots()

onBeforeMount(() => {
  if (!slots.description) {
    throw new Error('You must provide the description slot for the empty state component.')
  }
})
</script>

<style lang="scss" scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  margin: 2rem auto;
  width: 100%;
  max-width: 800px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: #f9fafb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.empty-state__title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.empty-state__description {
  font-size: 1rem;
  color: #6b7280;
  max-width: 480px;
  margin-bottom: 1rem;
}

.empty-state__actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  > * {
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

    &:hover {
      background-color: #197e7d;
    }
  }
}
</style>
