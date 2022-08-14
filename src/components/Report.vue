<template>
  <v-row justify="center">
    <v-col>
      <v-textarea label="Coller ici un rapport infocompte sans BBcode / Paste here an infocompte full report without BBcode" no-resize rows="10" v-model="reportText" @change="updateReportBackgroundColor"/>
    </v-col>
  </v-row>
  <template v-if="reportData">
    <v-row justify="center">
      <v-col align="right" class="mb-0 mt-0 pb-0 pt-0">
        <v-icon size="x-large" id="imageMove" :class="imgMoveDisplay" @click="exportToImg">mdi-image-move</v-icon>
        <v-icon v-if="isLoading" size="x-large" class="spin">mdi-loading</v-icon>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-0 mt-0 pb-0 pt-0">
        <ReportDisplay :rp="reportData"/>
      </v-col>
    </v-row>
  </template>
  <v-snackbar v-model="isCopied" color="success" :height=alertHeight>
    <v-row justify="center" align="center" class="ma-7">
      <v-icon size="50">mdi-clipboard-check</v-icon>
      <span class="pl-2" style="font-size: 40px;">Rapport copié!</span> 
    </v-row>
  </v-snackbar>
  <v-snackbar v-model="isError" color="error" :height=alertHeight :timeout="-1" >
    <v-row justify="center" align="center" class="ma-7">
      <v-icon size="50" class="mb-2">mdi-alert-circle</v-icon>
      <p class="pl-2 mb-5" style="font-size: 20px;">
        Sorry, something went wrong! If you paste a full report without BBcode, please send it to the developper so he can reproduce and fix the bug.
        <br/><br/>
        Firefox users need to enable dom.events.asyncClipboard.clipboardItem in about:config
      </p>
      <v-btn color="indigo" text @click="isError = false">
          Close
      </v-btn>
    </v-row>
  </v-snackbar>
</template>

<script>
import ThemeMixin from "../mixins/ThemeMixin.js";
import ReportDisplay from "./ReportDisplay.vue";
import { toPng } from 'html-to-image';


export default {
  name: 'Report',
  mixins: [ThemeMixin],
  components: {
    ReportDisplay
  },
  data: () => ({
    reportText: "",
    isCopied: false,
    isLoading: false,
    isError: false,
    errorMessage: ""
  }),
  computed: {
    reportData() {
      if(!this.reportText || this.reportText == "") {
        return null;
      }
      
      try {
        const lines = this.reportText.split("\n").filter(l => l != "").map(l => l.trim());
        const data = this.parse(lines);
        this.resizeContainer(data);
        return data;
      }
      catch {
        this.isError = true;
        return null;
      }
    },
    alertHeight() {
      return window.innerHeight/2;
    },
    imgMoveDisplay() {
      return this.isLoading ? "hide" : "";
    }
  },
  methods: {
    parse(lines) {
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

      return data;
    },
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
        values: splitted.slice(1, splitted.length - 1).map(n => this.formatNumber(n))
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
    },
    async exportToImg() {
      this.isLoading = true;
      const node = document.getElementById('ReportDisplay');

      toPng(node)
      .then(fetch)
      .then((base64Response) => base64Response.blob())
      .then((blob) => navigator.clipboard.write([new ClipboardItem({[blob.type]: blob})]))
      .then(() => this.isCopied = true)
      .catch((err) => console.error(err))
      .finally(() => this.isLoading = false);
    },
    resizeContainer(data) {
      const container = document.getElementById('appContainer');
      const nbPlanet = Math.max(
        data.planetTiles[0].values.length, 
        data.planetBuilds[0].values.length, 
        data.mines[0].values.length, 
        data.ships[0].values.length);
      const maxWidth = document.getElementById("app").offsetWidth;
      container.style.width = Math.min(maxWidth, Math.max(800, 410 + nbPlanet * 50)) + "px";
    }
  }
}

</script>

<style>
.firstColumn {
  white-space: nowrap; 
  text-overflow: ellipsis; 
  overflow: hidden; 
  width: 220px;
  max-width: 220px;
}

#imageMove {
-webkit-animation: shake 2.8s both;
-webkit-animation-iteration-count: 3;
        animation: shake 2.8s both;
        animation-iteration-count: 3;
}

.hide {
  visibility: hidden;
}

.spin {
  animation: 2s infinite spin;
}

@keyframes spin {
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
}

@keyframes shake {
  0% {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transform-origin: 50%50%;
    transform-origin: 50%50%;
  }
  7.5% {
    -webkit-transform: translateX(-30px)rotate(-6deg);
    transform: translateX(-30px)rotate(-6deg);
  }
  15% {
    -webkit-transform: translateX(15px)rotate(6deg);
    transform: translateX(15px)rotate(6deg);
  }
  22.5% {
    -webkit-transform: translateX(-15px)rotate(-3.6deg);
    transform: translateX(-15px)rotate(-3.6deg);
  }
  30% {
    -webkit-transform: translateX(9px)rotate(2.4deg);
    transform: translateX(9px)rotate(2.4deg);
  }
  37.5% {
    -webkit-transform: translateX(-6px)rotate(-1.2deg);
    transform: translateX(-6px)rotate(-1.2deg);
  }
  100% {
    -webkit-transform: translateX(-6px)rotate(0deg);
    transform: translateX(-6px)rotate(0deg);
  }
}
</style>