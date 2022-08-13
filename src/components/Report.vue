<template>
  <v-row justify="center">
    <v-col xl="8" sm="10" xs="12">
      <v-textarea label="Copier coller ici votre rapport infocompte" no-resize rows="10" v-model="reportText" />
    </v-col>
  </v-row>
  <template v-if="reportData">
    <ReportDisplay :rp="reportData"/>
  </template>
  
</template>

<script>
import ReportDisplay from "./ReportDisplay.vue";

export default {
  name: 'Report',
  components: {
    ReportDisplay
  },
  data: () => ({
    reportText: ""
  }),
  computed: {
    reportData() {
      if(!this.reportText || this.reportText == "") {
        return null;
      }

      const lines = this.reportText.split("\n").filter(l => l != "").map(l => l.trim());
      const data = {
        title: lines[0],
        subtitle: lines[1],
        pointImg: lines[2],
        totalPoints: "",
        globalPoints: [],
        productionImg: "",
        productions: [],
        planetImg: [],
        planetTiles: [],
        buildingsImg: "",
        planetSubtitle: "",
        buildingsMinesSubtitle: "",
        mines: [],
        buildingsStorageSubtitle: "",
        planetStorages: [],
        buildingsEnergySubtitle: "",
        energy: [],
        buildingsBuildSubtitle: "",
        planetBuilds: [],
        buildingsMilitarySubtitles: "",
        planetMilitary: [],
        buildingsScienceSubtitle: "",
        scienceLab: [],
        moonSubtitle: "",
        moonStorages: [],
        moonBuilds: [],
        moonMilitary: [],
        labImg: "",
        technologies: [],
        fleetImg: "",
        ships: [],
        defenseImg: "",
        planetDefenses: [],
        moonDefenses: []
      }

      let i = 3;

      for(;lines[i].startsWith("-"); i++) {
        data.globalPoints.push(lines[i].replace("- ", ""));
      }

      data.totalPoints = lines[i];
      i++;
      data.productionImg = lines[i];
      i++;

      for(;!lines[i].startsWith("http"); i++) {
        data.productions.push(lines[i]);
      }

      data.planetImg = lines[i];
      i++;
      i += this.parsePlanetLines(lines, i, data.planetTiles);
      
      data.buildingsImg = lines[i];
      i++;
      data.planetSubtitle = lines[i];
      i++;
      data.buildingsMinesSubtitle = lines[i];
      i++;
      i += this.parsePlanetLines(lines, i, data.mines);

      data.buildingsStorageSubtitle = lines[i];
      i++;
      i += this.parsePlanetLines(lines, i, data.planetStorages);

      data.buildingsEnergySubtitle = lines[i];
      i++;
      i += this.parsePlanetLines(lines, i, data.energy);

      data.buildingsBuildSubtitle = lines[i];
      i++;
      i += this.parsePlanetLines(lines, i, data.planetBuilds);

      data.buildingsMilitarySubtitles = lines[i];
      i++;
      i += this.parsePlanetLines(lines, i, data.planetMilitary);

      data.buildingsScienceSubtitle = lines[i];
      i++;
      i += this.parsePlanetLines(lines, i, data.scienceLab);

      data.moonSubtitle = lines[i];
      i += 2;
      console.log(lines[i]);
      i += this.parsePlanetLines(lines, i, data.moonStorages);

      i++;
      i += this.parsePlanetLines(lines, i, data.moonBuilds);

      i++;
      i += this.parsePlanetLines(lines, i, data.moonMilitary);

      data.labImg = lines[i];
      i++;
      i += this.parseShipTech(lines, i, data.technologies);

      data.fleetImg = lines[i];
      i++;
      i += this.parseShipTech(lines, i, data.ships);

      data.defenseImg = lines[i];
      i += 2;
      i += this.parsePlanetLines(lines, i, data.planetDefenses);
      i++;
      i += this.parsePlanetLines(lines, i, data.moonDefenses);

      console.log(data);
      return data;
    },
  },
  methods: {
    parsePlanetLines(lines, i, array) {
      let j = 0;
      for(; i + j < lines.length && lines[i+j].startsWith("|"); j++) {
        array.push(this.parsePlanetLine(lines[i+j]));
      }
      return j;
    },
    parsePlanetLine(line) {
      const splitted = line.replaceAll("_","").split("|");
      const otherData = splitted[splitted.length - 1].replace(">", "").split("=").map(l => l.trim());

      return {
        title: otherData[0],
        total: this.formatNumber(otherData[2]),
        totalLabel: otherData[1],
        values: splitted.slice(1, splitted.length -2).map(n => this.formatNumber(n))
      }
    },
    parseShipTech(lines, i, array) {
      let j = 0;
      let currentCategoryTitle = "";
      let currentCategory = [];
      for(;!lines[i+j].startsWith("http"); j++) {
        if(lines[i+j].includes(":")) {
          let split = lines[i+j].split(":").map(e => e.trim());
          currentCategory.push({
            title: split[0],
            value: this.formatNumber(split[1])
          });
        }
        else {
          if(currentCategoryTitle != "") {
            array.push({title: currentCategoryTitle, values: currentCategory});
          }
          currentCategoryTitle = lines[i+j];
          currentCategory = [];
        }
      }
      array.push({title: currentCategoryTitle, values: currentCategory});
      return j;
    },
    formatNumber(num) {
      try {
        if(typeof num == "string") {
          num = parseInt(num.replaceAll(".", ""));
        }
        
        const lookup = [
          { value: 1, symbol: "" },
          { value: 1e3, symbol: "k" },
          { value: 1e6, symbol: "M" },
          { value: 1e9, symbol: "G" },
          { value: 1e12, symbol: "T" },
          { value: 1e15, symbol: "P" },
          { value: 1e18, symbol: "E" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function(item) {
          return num >= item.value;
        });
        return item ? (num / item.value).toPrecision(3).replace(rx, "$1") + item.symbol : "0";
      }
      catch {
        return num;
      }
    }
  },
}

</script>
