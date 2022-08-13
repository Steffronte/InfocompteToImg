<template>
  <h4 v-if="title">{{title}}</h4>
  <table>
    <tr v-for="(line, index) in planetLines" :key="index">
      <th class="text-left pa-1">{{line.title}}</th>
      <td class="pa-1 text-center" v-for="(value, index2) in line.values" :key="index2">{{value}}</td>
      <td class="pa-1">{{line.totalLabel}} : {{line.total}}</td>
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
