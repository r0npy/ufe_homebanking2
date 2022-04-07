<template>
  <div>
    <Unauthorized v-if="!authorized" />

    <div v-if="authorized">
      <div>
        Bienvenido, {{ name }} {{ surname }} su AccessToken es:
        {{ accessToken }}
      </div>

      <Services
        ref="childService"
        v-if="step === 1"
        @change-step="changeStep"
      />

      <StartPayment
        v-if="step === 2"
        @change-step="changeStep"
        :service="selectedService"
        @restart-step="restartStep"
      />

      <ConfirmPayment
        v-if="step === 3"
        @change-step="changeStep"
        :service="selectedService"
        :form="form"
        @restart-step="restartStep"
      />
    </div>
  </div>
</template>

<script>
import HttpClient from "@/commons/HttpClient";
import store from "@/store";
import Services from "@/components/Services.vue";
import StartPayment from "@/components/StartPayment.vue";
import ConfirmPayment from "@/components/ConfirmPayment.vue";
import Unauthorized from "@/components/ConfirmPayment.vue";

export default {
  name: "PaymentService",
  components: {
    //Services: () => import(/* webpackChunkName: "services-list" */"@/components/Services.vue"),
    Services,
    StartPayment,
    ConfirmPayment,
    Unauthorized,
  },
  props: {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    documento: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    loginAccessToken: {
      type: String,
    },
  },
  data() {
    return {
      step: 1,
      selectedService: null,
      form: [],
    };
  },
  methods: {
    changeStep(step, service, form) {
      console.log(`Changing to step ${step} with idService ${service.id}`);
      this.step = step;
      this.selectedService = service;
      this.form = form;
    },
    restartStep() {
      this.step = 1;
      this.selectedService = null;
    },
    async login() {
      try {
        if (this.authorized) {
          await HttpClient.post("users/loginfromhb", {
            accessToken: this.accessToken,
          }).then((response) => {
            console.log(response.data);

            store.dispatch("saveTokens", {
              refreshToken: response.data.refreshToken,
              operationToken: response.data.operationToken,
            });

            this.$refs.childService.getServices();
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    authorized() {
      return this.accessToken !== null && this.accessToken !== undefined;
    },
  },
  async created() {
    console.log(this.accessToken);
    console.log(this.authorized);
    await this.login();
  },
};
</script>

<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
@import url("./assets/css/itau.css");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.rwb_link {
  color: red !important;
}
</style>
