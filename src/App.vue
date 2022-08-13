<template>
  <v-app>
    <v-main>
      <v-theme-provider>
        <Root/>
      </v-theme-provider>
    </v-main>
  </v-app>
</template>

<script>
import Root from './components/Root.vue'

export default {
  name: 'App',

  components: {
    Root,
  },

  data: () => ({
    //
  }),
}
</script>
