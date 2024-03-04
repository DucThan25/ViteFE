<template>
  <div>
    <div class='d-flex w-100'>
      <router-view/>
    </div>
    <Loader />
  </div>
</template>
<script>
// import Loader from '../components/core/loader/Loader'
import '../assets/vendor/font-awesome/css/font-awesome.min.css'
import '../assets/vendor/ap8/css/style.css'
import '../assets/vendor/nucleo/outline/css/style.css'
import '../assets/vendor/bootstrap/css/bootstrap.min.css'
import '../assets/vendor/treegrid/css/jquery.treegrid.css'
import '../assets/vendor/select2/css/select2.min.css'
import '../assets/css/style.css'

import '../assets/js/custom.js'

import Loader from "@/components/Loader";
//import Loader from '@/layouts/Loader'
// import { core } from '../plugins/pluginInit'
export default {
  name: 'BlankLayout',
  components: {
    Loader
  },
  mounted () {
    // core.index()
  }
}
</script>
