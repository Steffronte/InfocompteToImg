<template>
  <v-row>
    <v-col class="mt-0 pl-5 pr-5 pb-2 pt-2" id="ReportDisplay">
      <h1 class="text-center">{{rp.title}}</h1>
      <h2 class="text-center mb-4">{{rp.subtitle}}</h2>
      <img src="../assets/points.png"/> <!-- :src="rp.pointImg"-->
      <ul class="mb-1">
        <li v-for="(points, index) in rp.globalPoints" :key="index">{{points}}</li>
      </ul>
      <p><b>{{rp.totalPoints}}</b></p>
      <img class="mt-2"  src="../assets/production.png"/> <!-- :src="rp.productionImg" -->
      <ul class="mb-1">
        <li v-for="(prod, index) in rp.productions" :key="index">{{prod}}</li>
      </ul>
      <img class="mt-2" src="../assets/planet.png" /> <!-- :src="rp.planetImg" -->
      <ReportPlanetLines :planetLines="rp.planetTiles"/>
      <img class="mt-2" src="../assets/batiment.png"/> <!-- :src="rp.buildingsImg" -->
      <h3 class="mt-2 text-center">{{rp.planetSubtitle}}</h3>
      <ReportPlanetLines :planetLines="rp.mines" :title="rp.buildingsMinesSubtitle"/>
      <ReportPlanetLines :planetLines="rp.planetStorages" :title="rp.buildingsStorageSubtitle"/>
      <ReportPlanetLines :planetLines="rp.energy" :title="rp.buildingsEnergySubtitle"/>
      <ReportPlanetLines :planetLines="rp.planetBuilds" :title="rp.buildingsBuildSubtitle"/>
      <ReportPlanetLines :planetLines="rp.planetMilitary" :title="rp.buildingsMilitarySubtitles"/>
      <ReportPlanetLines :planetLines="rp.scienceLab" :title="rp.buildingsScienceSubtitle"/>
      <h3 class="mt-3 text-center">{{rp.moonSubtitle}}</h3>
      <ReportPlanetLines :planetLines="rp.moonStorages" :title="rp.buildingsStorageSubtitle"/>
      <ReportPlanetLines :planetLines="rp.moonBuilds" :title="rp.buildingsBuildSubtitle"/>
      <ReportPlanetLines :planetLines="rp.moonMilitary" :title="rp.buildingsMilitarySubtitles"/>
      <img class="mt-2" src="../assets/labo.png"/> <!-- :src="rp.labImg" -->
      <ReportTechShip :lines="rp.technologies"/>
      <img class="mt-2" src="../assets/flotte.png"/> <!-- :src="rp.fleetImg" -->
      <ReportTechShip :lines="rp.ships"/>
      <img class="mt-2" src="../assets/defense.png" /> <!-- :src="rp.defenseImg" -->
      <h3 class="mt-2 text-center">{{rp.planetSubtitle}}</h3>
      <ReportPlanetLines :planetLines="rp.planetDefenses"/>
      <h3 class="mt-3 text-center">{{rp.moonSubtitle}}</h3>
      <ReportPlanetLines :planetLines="rp.moonDefenses"/>
    </v-col>
  </v-row>
</template>

<script>
import ReportPlanetLines from "./ReportPlanetsLines.vue";
import ReportTechShip from "./ReportTechShip.vue";

export default {
  name: 'Report',
  components: {
    ReportPlanetLines,
    ReportTechShip
  },
  props: {
    rp: {
      required: true,
      type: Object
    }
  },
  data: () => ({
    reportImg: ""
  })
}

</script>
