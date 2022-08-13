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
import { useTheme } from 'vuetify';
import Report from "./Report.vue";

export default {
  name: 'Root',
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
      this.theme.global.name.value = this.theme.global.current.value.dark ? 'light' : 'dark';
      console.log(this.theme.global);
    }
  },
  setup () {
    const theme = useTheme();
    return { theme };
  }
}

</script>
