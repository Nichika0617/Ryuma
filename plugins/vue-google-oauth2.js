import GAuth from "vue-google-oauth2";
import Vue from "vue";

Vue.use(GAuth, {
  clientId: '775526750238-m4c7153fd80v94q19ub67ej7sljuea12.apps.googleusercontent.com',
  //'568211042958-b3gnqhq3ictvr9aqq4k1pcvsqa7gngin.apps.googleusercontent.com'
  prompt: 'consent',
  scope: 'openid profile email',
  fetch_basic_profile: false
})