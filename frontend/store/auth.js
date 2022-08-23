export const state = () => ({
  loginRedirect: '/user/cabinet',
  user: null,
  accessToken: null,
  refreshToken: null
});

export const mutations = {
  setTokens(state, data) {
    console.log(data)
    state.accessToken = data;

    if (data.refreshToken) {
      state.refreshToken = data;
    }
  },
  setUser(state, user) {
    state.user = user;
  },
  logout(state) {
    state.accessToken = null;
    state.refreshToken = null;
    state.user = null;
  }
};

export const actions = {
  async login({commit, dispatch}, data) {
    const res = await this.$axios.$post('/auth/login', data);
    commit('setTokens', res);
    await dispatch('getUser');
  },
  async signup({commit, dispatch}, data) {
    const res = await this.$axios.$post('/auth/signup', data);
    console.log(res)
    commit('setTokens', res);
    await dispatch('getUser');
  },
  async getUser({commit}) {
    const res = await this.$axios.$post('/auth/user');
    commit('setUser', res);
  },
  async refresh({state, commit}) {
    const res = await this.$axios.$post('/auth/refresh', {
      refreshToken: state.refreshToken
    });
    commit('setTokens', res);
  }
};
