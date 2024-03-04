import Vue from 'vue'
import * as VueGoogleMaps from 'gmap-vue'

Vue.use(VueGoogleMaps, {
  load: {
    // key: 'AIzaSyANYVpeOpsNN4DqdKR4AKAyd03IQ3_9PvU' // OK
    key: 'AIzaSyBU7Jj9b4KUdoe8z4VyW7f3nzzqZdeIgaM', // OK
    libraries: ['places', 'geometry','visualization','drawing']
  },
  installComponents: true
})
