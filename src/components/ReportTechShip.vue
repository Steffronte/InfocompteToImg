<template>
  <table>
    <template v-for="(line, index) in lines" :key="index">
      <tr>
        <th class="pa-1" colspan="2">{{line.title}}</th>
      </tr>
      <tr v-for="(subline, index2) in line.values" :key="index2">
        <td class="pa-1 firstColumn">{{subline.title}}</td>
        <td width="50" class="pa-1 text-center">{{subline.value}}</td>
      </tr>
    </template>
  </table>
</template>

<script>

export default {
  name: 'ReportTechShip',
  props: {
    lines: {
      required: true,
      type: Array
    }
  }
}

</script>
