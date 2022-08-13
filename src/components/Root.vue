<template>
  <v-container>
    <v-row class="text-center mb-4">
      <v-spacer></v-spacer>
      <v-col sm="10">
        <h1>InfocompteToImg</h1>
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
