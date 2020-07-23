<template>
  <v-app dark>
    <v-content>
      <router-view :snack="showSnackMethod"></router-view>
    </v-content>
    <v-snackbar :color="snackColor" v-model="showSnack" multi-line top right>
      {{ snackText }}
      <v-btn color="white" icon @click="showSnack = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Login from "./components/Login";

export default {
  name: "App",
  components: {
    Login
  },
  data: () => ({
    showSnack: false,
    snackColor: "",
    snackText: true
  }),
  methods: {
    showSnackMethod(text, type) {
      switch (type) {
        case "success":
          this.snackColor = "green darken-2";
          break;
        case "error":
          this.snackColor = "red darken-2";
          break;
        default:
          this.snackColor = "";
      }
      console.log("snack----");
      this.snackText = text;
      this.showSnack = true;
    }
  }
};
</script>
