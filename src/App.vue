<template>
  <div>
    <div>Bienvenido, {{ name }} {{ surname }}</div>

    <Services v-if="step === 1" @change-step="changeStep" />

    <StartPayment
      v-if="step === 2"
      @change-step="changeStep"
      :service="selectedService"
    />

    <ConfirmPayment
      v-if="step === 3"
      @change-step="changeStep"
      :service="selectedService"
    />

    <button
      type="button"
      class="btn btn-secondary btn-light my-2"
      @click.prevent="restartStep"
    >
      Reiniciar
    </button>
  </div>
</template>

<script>
import Services from "./components/Services.vue";
import StartPayment from "./components/StartPayment.vue";
import ConfirmPayment from "./components/ConfirmPayment.vue";

export default {
  name: "App",
  components: {
    Services,
    StartPayment,
    ConfirmPayment,
  },
  props: {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
  },
  data() {
    return {
      step: 1,
      selectedService: null,
    };
  },
  methods: {
    changeStep(step, service) {
      console.log(`Changing to step ${step} with idService ${service.id}`);
      this.step = step;
      this.selectedService = service;
    },
    restartStep() {
      this.step = 1;
      this.selectedService = null;
    },
  },
};
</script>

<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
@import url('./assets/css/itau.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
