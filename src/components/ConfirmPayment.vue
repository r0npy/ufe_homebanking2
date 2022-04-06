<template>
  <div>
    <form class="row" @submit.prevent="finishPayment">
      <div class="alert alert-secondary" role="alert">
        <div class="form-floating mb-3">
          <input
            class="form-control"
            id="floatingInput"
            placeholder="PIN Transacción"
            type="password"
            readonly
            v-model="pin"
            maxlength="6"
            required
          />
          <label for="floatingInput">PIN Transacción</label>
        </div>
      </div>
      <div class="alert alert-secondary" role="alert">
        <div>
          <button
            type="button"
            class="btn btn-dark m-2"
            @click.prevent="addNumber(1)"
          >
            1
          </button>
          <button
            type="button"
            class="btn btn-dark m-2"
            @click.prevent="addNumber(6)"
          >
            6
          </button>
          <button
            type="button"
            class="btn btn-dark m-2"
            @click.prevent="addNumber(3)"
          >
            3
          </button>
          <button
            type="button"
            class="btn btn-dark m-2"
            @click.prevent="addNumber(9)"
          >
            9
          </button>
          <button
            type="button"
            class="btn btn-dark m-2"
            @click.prevent="addNumber(5)"
          >
            5
          </button>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-dark m-2"
            @click.prevent="addNumber(7)"
          >
            7
          </button>
          <button
            type="button"
            class="btn btn-dark m-2"
            @click.prevent="addNumber(0)"
          >
            0
          </button>
          <button
            type="button"
            class="btn btn-dark m-2"
            @click.prevent="addNumber(2)"
          >
            2
          </button>
          <button
            type="button"
            class="btn btn-dark m-2"
            @click.prevent="addNumber(8)"
          >
            8
          </button>
          <button
            type="button"
            class="btn btn-dark m-2"
            @click.prevent="addNumber(4)"
          >
            4
          </button>
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

        <button type="submit" class="btn btn-primary my-2">Finalizar</button>
      </div>
    </form>
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
      pin: "",
    };
  },
  methods: {
    addNumber(number) {
      if (this.pin.length < 6) {
        this.pin = this.pin + number;
      }
    },
    finishPayment() {
      if (this.pin === "") return;
      console.log("Invocar el endpoint de finalizacion de pago");
    },
  },
};
</script>