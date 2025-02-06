<template>
  <div class="search-bar">
    <input
      v-model="searchQuery"
      type="text"
      class="search-bar__input"
      placeholder="Search TV shows..."
      @input="emitSearch"
    />
    <button v-if="searchQuery" class="search-bar__clear" type="button" @click="clearSearch">
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const emit = defineEmits(['search'])

const emitSearch = () => {
  emit('search', searchQuery.value.trim())
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('search', '')
}
</script>

<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.search-bar__input {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    box-shadow: 0 2px 5px rgba(0, 135, 121);
  }
}

.search-bar__clear {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.3s ease;

  &:hover {
    color: #000;
  }
}
</style>
