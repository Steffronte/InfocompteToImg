<template>
  <h4 v-if="title" class="mt-2">{{title}}</h4>
  <table>
    <tr v-for="(line, index) in planetLines" :key="index">
      <td class="text-left pa-1 firstColumn">{{line.title}}</td>
      <td class="pa-1 text-center" width="50" v-for="(value, index2) in line.values" :key="index2">{{value}}</td>
      <td class="pa-1" width="150">{{line.totalLabel}} : {{line.total}}</td>
    </tr>
  </table>
</template>

<script>

export default {
  name: 'ReportPlanetLines',
  props: {
    planetLines: {
      required: true,
      type: Object
    },
    title: {
      required: false,
      type: String
    }
  }
}

</script>
