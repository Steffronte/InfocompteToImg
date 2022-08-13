<template>
  <v-row justify="center">
    <v-col xl="8" sm="10" xs="12">
      <h1 class="text-center">{{rp.title}}</h1>
      <h2 class="text-center mb-4">{{rp.subtitle}}</h2>
      <img :src="rp.pointImg" />
      <ul class="mb-1">
        <li v-for="(points, index) in rp.globalPoints" :key="index">{{points}}</li>
      </ul>
      <p><b>{{rp.totalPoints}}</b></p>
      <img class="mt-2" :src="rp.productionImg" />
      <ul class="mb-1">
        <li v-for="(prod, index) in rp.productions" :key="index">{{prod}}</li>
      </ul>
      <img class="mt-2" :src="rp.planetImg" />
      <ReportPlanetLines :planetLines="rp.planetTiles"/>
      <img class="mt-2" :src="rp.buildingsImg" />
      <h3>{{rp.planetSubtitle}}</h3>
      <ReportPlanetLines :planetLines="rp.mines" :title="rp.buildingsMinesSubtitle"/>
      <ReportPlanetLines :planetLines="rp.planetStorages" :title="rp.buildingsStorageSubtitle"/>
      <ReportPlanetLines :planetLines="rp.energy" :title="rp.buildingsEnergySubtitle"/>
      <ReportPlanetLines :planetLines="rp.planetBuilds" :title="rp.buildingsBuildSubtitle"/>
      <ReportPlanetLines :planetLines="rp.planetMilitary" :title="rp.buildingsMilitarySubtitles"/>
      <ReportPlanetLines :planetLines="rp.scienceLab" :title="rp.buildingsScienceSubtitle"/>
      <h3>{{rp.moonSubtitle}}</h3>
      <ReportPlanetLines :planetLines="rp.moonStorages" :title="rp.buildingsStorageSubtitle"/>
      <ReportPlanetLines :planetLines="rp.moonBuilds" :title="rp.buildingsBuildSubtitle"/>
      <ReportPlanetLines :planetLines="rp.moonMilitary" :title="rp.buildingsMilitarySubtitles"/>
      <img class="mt-2" :src="rp.labImg" />
      <ReportTechShip :lines="rp.technologies"/>
      <img class="mt-2" :src="rp.fleetImg" />
      <ReportTechShip :lines="rp.ships"/>
      <img class="mt-2" :src="rp.defenseImg" />
      <ReportPlanetLines :planetLines="rp.planetDefenses" :title="rp.planetSubtitle"/>
      <ReportPlanetLines :planetLines="rp.moonDefenses" :title="rp.moonSubtitle"/>
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
  }),
  computed: {
    
  },
  methods: {
    
  },
}

</script>
