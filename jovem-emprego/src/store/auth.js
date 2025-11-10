import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    login(payload) {
      this.user = payload;
      this.token = "mvp-token";
    },

    logout() {
      this.user = null;
      this.token = null;
    },
  },
});
