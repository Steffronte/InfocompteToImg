import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const theme = {
  defaultTheme: "dark",
  themes: {
    light: {
      dark: false,
      name: "light",
      colors: {
        primary: "#ad1c3d",
        "page-header-background": "#d7d7ce",
        "page-background": "#cdcdc1",
        "table-header": "#cdcdc1",
        background: "#c0c0b5",
        "header-background": "#b5b5a6",
        "info-text": "#666660",
      },
    },
    dark: {
      name: "dark",
      dark: true,
      colors: {
        primary: "#52E3C2",
        "page-header-background": "#282831",
        "page-background": "#32323E",
        "table-header": "#2e2e2e",
        background: "#3F3F4A",
        "header-background": "#4a4a59",
        "info-text": "#99999F",
      },
    },
  },
};

const vuetify = createVuetify({
  components,
  directives,
  theme
});

export default vuetify;