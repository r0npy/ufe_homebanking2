<template>
  <div>
    <div class="alert alert-secondary my-0 py-2" role="alert">
      <div v-for="(field, index) in form" :key="index" class="my-2">
        <div class="form-floating" v-if="field.type === 'select'">
          <select
            id="floatingInputGrid"
            :placeholder="field.label"
            class="form-select form-select mb-3"
          >
            <option
              v-for="(value, index) in field.values"
              :key="index"
              :value="value"
            >
              {{ value }}
            </option>
          </select>
          <label for="floatingSelectGrid">{{ field.label }}</label>
        </div>
        <input
          v-else
          :type="field.type"
          class="form-control"
          :placeholder="field.label"
          required
        />
      </div>
    </div>

    <div class="d-flex flex-row bd-highlight justify-content-end">
      <button
        type="button"
        class="btn btn-secondary btn-light m-2"
        @click.prevent="$emit('restart-step')"
      >
        Volver
      </button>

      <button
        type="button"
        class="btn btn-primary my-2"
        @click="previewPayment"
      >
        Continuar
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store";

export default {
  components: {
    store,
  },
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: [],
    };
  },
  async created() {
    try {
      let header = {
        Authorization: "Bearer " + store.state.operationToken,
      };
      let configuration = {
        headers: header,
      };

      console.log(configuration);

      await axios
        .get(
          `https://localhost:7258/api/services/getform/${this.service.id}`,
          configuration
        )
        .then((response) => {
          this.form = response.data;
        });

      console.log(this.form);
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    previewPayment() {
      console.log(this.form);

      this.$emit("change-step", 3, this.service);
    },
  },
};
</script>
