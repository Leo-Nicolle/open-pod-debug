<template>
  <div id="app">
    <ClickWheel @touched="(t) => touched = t" @delta="(d) => onDelta(d)"/>
    <Screen ref="screen" :touched="touched" />
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
    return {
      scroll: 0,
      touched: -1
    };
  },
  
  components: {
    ClickWheel,
    Screen,
  },
  methods: {
    onDelta(d){
      this.scroll+=d;
      this.$refs.screen.scroll(d);
    }
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
