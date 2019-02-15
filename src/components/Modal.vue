<template>

 <v-layout row justify-center>
    <v-dialog
      v-model="data.show"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">{{data.title}}</v-card-title>

        <v-card-text>
          {{data.text}}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn v-if="data.cancelBool"
            flat="flat"
            @click.native="cancel()"
          >
            {{data.cancelText}}
          </v-btn>

          <v-btn v-if="data.acceptBool"
            flat="flat"
            @click.native="accept()"
          >
            {{data.acceptText}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

</template>

<script>
import uiService from "@/services/ui-service.js";

export default {
  data() {
    return {};
  },
  computed: {
    data() {
      return this.$store.getters.DIALOG;
    }
  },
  methods: {
    accept() {
      uiService.modalAccept();
      this.$store.state.dialog.show = false;
    },
    cancel() {
      this.$store.state.dialog.show = false;
    }
  },
  mounted() {}
};
</script>

