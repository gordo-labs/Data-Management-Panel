<template>
  <section>
    <modal></modal>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list>

      <!-- INSCRIPTIONS GROUP -->

        <v-list-group prepend-icon="list_alt" value="true">

          <v-list-tile slot="activator">
            <v-list-tile-title>Data</v-list-tile-title>
          </v-list-tile>

          <v-list-tile v-for="item in Inscriptions" v-on:click="routeTo(item.route)" :key="item.text" class="pl-3">
            <v-list-tile-action>
              <v-icon v-text="">{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="item.text"></v-list-tile-title>
          </v-list-tile>

        </v-list-group>

      </v-list>

    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left color="white">
      <v-toolbar-side-icon v-on:click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{'ETS' | capitalize }}</v-toolbar-title>
    </v-toolbar>

    <router-view></router-view>

    <v-footer app fixed>
      <span>Copyright 2018</span>
    </v-footer>
  </section>
</template>

<script>
export default {
  name: "base",
  data: () => ({
    drawer: true,
    InscriptionDrawer: true,
    Inscriptions: [
      {
        text: "List",
        disabled: false,
        icon: "list",
        route: "/list"
      },
    ]
  }),
  created() {
  },
  props: {
    source: String
  },
  methods: {
    routeTo(route) {
      console.log(route);
      this.$router.push(route);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/module.scss";
nav {
}

.toolbar {
  box-shadow: none !important;
  background-color: #f5f5f5 !important;
  .toolbar__content {
    height: 100px !important;
  }
}

.table {
  background-color: transparent !important;
}

.layout {
  flex: 0 1 auto;
}

</style>
