import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import HttpClient from "@/commons/HttpClient"

Vue.use(Vuex)

const storeRefreshToken = "refreshToken_paymentservice";
const storeOperationToken = "operationToken_paymentservice";

export default new Vuex.Store({
  state: {
    operationToken: null,
    refreshToken: null,
    infoToken: null
  },
  getters: {},
  mutations: {
    setOperationToken(state, operationToken) {
      state.operationToken = operationToken;
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
    },
    setInfoToken(state, infoToken) {
      state.infoToken = infoToken;
    }
  },
  actions: {
    async saveTokens({
      commit
    }, {
      refreshToken,
      operationToken
    }) {
      commit("setRefreshToken", refreshToken);
      localStorage.setItem(storeRefreshToken, refreshToken);

      commit("setOperationToken", operationToken);
      commit("setInfoToken", decode(operationToken));
      localStorage.setItem(storeOperationToken, operationToken);
    },
    async autoLogin({
      commit
    }) {
      // NO METER AQUI NINGUN ROUTER.PUSH, SE CONTROLAN EN LOS GUARDIANES DEL ROUTER
      let refreshToken = localStorage.getItem(storeRefreshToken);
      let operationToken = localStorage.getItem(storeOperationToken);

      if (operationToken && refreshToken) {
        commit("setRefreshToken", refreshToken);
        commit("setOperationToken", operationToken);
        commit("setInfoToken", decode(operationToken));
      } else {
        commit("setRefreshToken", null);
        commit("setOperationToken", null);
        commit("setInfoToken", null);
      }
    },
    async logout({
      commit
    }) {
      await commit("setRefreshToken", null);
      await commit("setOperationToken", null);
      await commit("setInfoToken", null);
      localStorage.removeItem(storeRefreshToken);
      localStorage.removeItem(storeOperationToken);
      router.push({
        name: 'login'
      });
    },
    async refreshTokens({
      commit
    }) {
      let header = {
        Authorization: "Bearer " + localStorage.getItem(storeRefreshToken)
      };
      let configuration = {
        headers: header
      };
      let valido = false;

      await HttpClient
        .post("users/refrescartokens", null, configuration)
        .then(response => {
          commit("setRefreshToken", response.data.refreshToken);
          commit("setOperationToken", response.data.operationToken);
          commit("setInfoToken", decode(response.data.operationToken));

          localStorage.setItem(storeRefreshToken, response.data.refreshToken);
          localStorage.setItem(storeOperationToken, response.data.operationToken);
          valido = true;
        })
        .catch(error => {
          console.log(error)
          console.warn("Tokens Vencidos");
          commit("setRefreshToken", null);
          commit("setOperationToken", null);
          commit("setInfoToken", null);
          localStorage.removeItem(storeRefreshToken);
          localStorage.removeItem(storeOperationToken);
          valido = false;
        });

      return valido;
    }
  },
  modules: {},
  getters: {
    operationToken: state => {
      return state.operationToken
    }
  }
})