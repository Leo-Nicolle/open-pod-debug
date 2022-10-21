<template>
  <div id="app">
    <ClickWheel />
  </div>
</template>

<script>
import ClickWheel from './components/ClickWheel.vue';
import apiMixin from './js/api';

export default {
  name: 'App',
  mixins: [apiMixin],
  data() {
    return {};
  },
  components: {
    ClickWheel,
  },
  methods: {
  },

};
</script>

<style>

</style>
