<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
  import router from "./router.js"

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
    }
  },
  methods: {
    routerBack () {
      this.$router.go(-1);
    }
  },
  created () {
    document.addEventListener("backbutton", this.routerBack, false);
  },
  beforeDestroy () {
    document.removeEventListener("backbutton", this.routerBack);
  }
}
</script>
