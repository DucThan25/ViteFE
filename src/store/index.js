import { createApp } from 'vue'
import Vuex from 'vuex'

// plugin local storage
import VuexPersistence from 'vuex-persist'
import logger from '@/plugins/logger'

import { user } from './user'


createApp().use(Vuex)

const vuexPersist = new VuexPersistence({
  key: 'my-app',
  //storage: window.localStorage

  // add config to which modules need to keep state
  modules: ['user']
})

const debug = import.meta.env.MODE !== 'production'

export const store = new Vuex.Store({
  modules: {
    user,
  },
  strict: debug,
  plugins: debug ? [logger(), vuexPersist.plugin] : [vuexPersist.plugin],
  state: {
    header: {
      title: '',
      list: []
    }
  },
  mutations: {
    setHeader (state, header) {
      state.header = header
    }
  },
  actions: {
    setHeader (context, header) {
      context.commit('setHeader', header)
    }
  }
})
