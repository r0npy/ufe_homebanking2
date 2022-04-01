<template>
  <div>
    <div class="alert alert-secondary" role="alert">
      <div v-for="(field, index) in form" :key="index">
        <input
          :type="field.type"
          class="form-control"
          id="floatingInput"
          :placeholder="field.label"
          required
        />
      </div>
    </div>
    <button type="button" class="btn btn-primary my-2" @click="previewPayment">Continuar</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
      await axios
        .get(`https://localhost:7258/api/services/getform/${this.service.id}`)
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
