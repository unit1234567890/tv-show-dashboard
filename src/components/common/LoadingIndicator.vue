<template>
  <div class="loading-indicator" role="status" aria-live="polite" aria-label="Loading">
    <div class="loading-indicator__spinner"></div>
  </div>
</template>

<style scoped>
.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.loading-indicator__spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #008779;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
