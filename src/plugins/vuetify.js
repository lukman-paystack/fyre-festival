import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  
  },
  theme: {
    themes: {
      light: {
        primary: '#FF5252',
        secondary: '#b0bec5',
        accent: '#ac9eff',
        error: '#b71c1c',
      },
    },
  },
});
