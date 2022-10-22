<template>
  <div id="app">
    <ClickWheel />
    <Screen />
  </div>
</template>

<script>
import ClickWheel from './components/ClickWheel.vue';
import Screen from './components/Screen.vue';

import apiMixin from './js/api';

export default {
  name: 'App',
  mixins: [apiMixin],
  data() {
    return {};
  },
  components: {
    ClickWheel,
    Screen,
  },
  methods: {
  },

};
</script>

<style>
#app{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  max-width: 100%;
  flex-wrap: wrap;
  color:#fff;
}
strong {
  color:#fff;
}
h2 { 
  font-size: 2em;
  margin-top: 1em;
}

h3 { 
  font-size: 1.2em;
  margin-top: 1em;
}
</style>
