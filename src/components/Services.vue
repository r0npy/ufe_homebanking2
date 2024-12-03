<template>
  <div>
    <div class="alert alert-secondary" role="alert">
      <div class="form-floating">
        <input
          class="form-control"
          id="floatingInput"
          placeholder="Buscar Servicios"
          @keyup="filterServices"
        />
        <label for="floatingInput">Buscar Servicios</label>
      </div>
    </div>

    <div
      class="
        card-service
        row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4
        g-4
      "
    >
      <div
        class="col"
        @click="selectService(service)"
        v-for="service in filteredServices"
        :key="service.id"
      >
        <div class="card" :title="service.description">
          <div class="d-flex align-items-start justify-content-center pt-2">
            <img
              :src="service.urlImage"
              class="mg-fluid mw-100 d-inline-block"
              :alt="service.description"
              height="70px"
            />
          </div>
          <div class="card-body">
            <p class="card-text text-center text-truncate">
              {{ service.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import HttpClient from "@/commons/HttpClient";

export default {
  components: {
    store,
  },
  data() {
    return {
      services: [],
      filteredServices: [],
    };
  },
  async created() {
    await this.getServices();
  },
  methods: {
    filterServices(e) {
      this.filteredServices = this.services.filter(
        (item) =>
          item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 ||
          item.description.toLowerCase().indexOf(e.target.value.toLowerCase()) >
            -1
      );
    },
    selectService(service) {
      console.log(`Selected service: ${service.name}`);

      this.$emit("change-step", 2, service);
    },
    async getServices() {
      if (store.state.operationToken === null) return;

      try {
        let header = {
          Authorization: "Bearer " + store.state.operationToken,
        };
        let configuration = {
          headers: header,
        };

        console.log(configuration);

        await HttpClient.get("services/getall", configuration).then(
          (response) => {
            this.services = response.data;
            this.filteredServices = this.services;
          }
        );

        console.log("Lista de Servicios: ", this.services);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>