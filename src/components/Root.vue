<template>
  <v-container id="appContainer">
    <v-row class="text-center mb-4">
      <v-spacer></v-spacer>
      <v-col sm="10">
        <h1>Infocompte to Img</h1>
      </v-col>
      <v-col cols="12" sm="1">
        <v-row>
            <v-switch v-model="isLightTheme" @change=onThemeChange inset :prepend-icon="themeIcon" ></v-switch>
        </v-row>
      </v-col>
    </v-row>

    <Report/>

  </v-container>
</template>

<script>
import Report from "./Report.vue";
import ThemeMixin from "../mixins/ThemeMixin.js";

export default {
  name: 'Root',
  mixins: [ThemeMixin],
  components: {
    Report
  },
  data: () => ({
    isLightTheme: true
  }),
  computed: {
    themeIcon() {
      return (this.isLightTheme ? "mdi-weather-night" : "mdi-white-balance-sunny");
    }
  },
  methods: {
    onThemeChange() {
      this.$vuetify.theme.global.name = this.$vuetify.theme.global.current.dark ? 'light' : 'dark';
      this.updateReportBackgroundColor();
    }
  }
}

</script>

<style scoped>
#appContainer {
  max-width: 1280px;
}

@media (min-width: 1280px) {
  #appContainer {
      width: 1280px;
  }
}

@media (max-width: 1279px) {
  #appContainer {
      width: 100%;
  }
}
</style>