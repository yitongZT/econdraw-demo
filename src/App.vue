<template>
  <div id="app">
    <YitongPreview msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import YitongPreview from './components/YitongPreview.vue'

export default {
  name: 'App',
  components: {
    YitongPreview
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
