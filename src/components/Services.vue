<template>
  <div>
    <div class="alert alert-secondary" role="alert">
      <div class="form-floating mb-3">
        <input
          class="form-control"
          id="floatingInput"
          placeholder="Buscar Servicios"
          @keyup="filterServices"
        />
        <label for="floatingInput">Buscar Servicios</label>
      </div>
    </div>

    <div class="card-group" v-for="item in filteredServices">
      <div class="card">
        <img
          :src="item.urlLogo"
          class="mg-fluid"
          :alt="item.description"
          width="90"
          height="70"
        />

        <div class="card-body">
          <h5 class="card-title">{{ item.name }}</h5>
          <p class="card-text">
            {{ item.description }}
          </p>
          <p class="card-text">
            <small class="text-muted">{{ item.description }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      services: [],
      filteredServices: [],
    };
  },
  async created() {
    try {
      await axios.get("https://localhost:7258/api/Services/GetAll").then((response) => {
        this.services = response.data;
        this.filteredServices = this.services;
      });

      console.log(this.services);
    } catch (error) {
      console.error(error);
    }
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
  },
};
</script>