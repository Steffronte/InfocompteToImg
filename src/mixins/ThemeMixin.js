export default {
  methods: {
    updateReportBackgroundColor() {
      let report = document.getElementById("ReportDisplay");
      if(report != null) {
          report.style["background-color"] = this.$vuetify.theme.global.current.colors.background;
      }
    }
  }
}