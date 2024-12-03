<template>
  <div>
    <form class="row" @submit.prevent="previewPayment">
      <div class="alert alert-secondary my-0 py-2" role="alert">
        <div v-for="(field, index) in form.data[0].campos" :key="index" class="my-2">
          <div class="form-floating" v-if="field.tipoCampo === 7">
            <select
              :id="field.nombre"
              :placeholder="field.descripcion"
              class="form-select form-select mb-3"
              :required="field.requerido"
              v-model="field.valor"
            >
              <option
                v-for="(value, index) in field.valor"
                :key="index"
                :value="value"
              >
                {{ value }}
              </option>
            </select>
          </div>
          <input
            v-else
            :id="field.nombre"
            :type="field.tipoDato === 0 ? 'text' : 'number'"
            class="form-control"
            :placeholder="field.descripcion"
            :required="field.requerido"
            v-model="field.valor"
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

        <button type="submit" class="btn btn-primary my-2">Continuar</button>
      </div>
    </form>
  </div>
</template>

<script>
import HttpClient from "@/commons/HttpClient";
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

      await HttpClient.get(
        `services/getform/${this.service.code}`,
        configuration
      ).then((response) => {
        this.form = response.data;
        console.log("form", this.form);
      });

      console.log(this.form);
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    previewPayment() {
      console.log(this.form);

      this.$emit("change-step", 3, this.service, this.form);
    },
  },
};
</script>
