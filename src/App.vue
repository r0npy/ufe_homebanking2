<template>
  <div class="container-fluid py-3">
    <Services />
  </div>
</template>

<script>
import Services from "./components/Services.vue";

export default {
  name: "App",
  components: {
    Services,
  }
};
</script>

<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
