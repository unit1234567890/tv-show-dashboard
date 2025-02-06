<template>
  <div id="app">
    <header>
      <h1>TV Show Dashboard</h1>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <p>© 2025 TV Show Dashboard</p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #00a296;
  color: #fff;
  padding: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 0.5rem;

   h1 {
     font-size: 1.5rem;
    }
  }
}

main {
  flex: 1;
  padding: 1rem;
}

footer {
  background-color: #00a296;
  color: #fff;
  text-align: center;
  padding: 0.5rem;
}
</style>
