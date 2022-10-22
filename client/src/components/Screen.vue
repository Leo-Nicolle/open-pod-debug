<template>
  <div>
    <h3>Screen</h3>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import axios from "axios";
import apiMixin from "../js/api";
import bands from '../js/bands'

export default {
  name: "ScreenDebug",
  data() {
    return {
      screenW: 128,
      screenH: 160,
      line: 0,
      scale: 1.5
    };
  },
  computed:{
    width(){
      return this.screenW * this.scale;
    },
    height(){
      return this.screenH * this.scale;
    } 
  },
  mixins: [apiMixin],
  methods: {
    fetch() {
      return axios
        .get(this.getUrl("angle"))
        .then(({ data }) => {
          // this.angle = data;
          // return this.angle;
        })
      // .then(() => axios.post(this.getUrl('angle'), {angle: this.angle + 1}))
    },
    draw() {
      const ctx = this.$refs.canvas.getContext("2d");
      ctx.save();
      ctx.scale(this.scale, this.scale)
      ctx.beginPath();
      ctx.arc(this.screenW / 2, this.screenH / 2, this.screenW / 2, 0, Math.PI * 2);
      ctx.fillStyle = "#9d9";
      ctx.fill();
      ctx.restore();
    },
    animate() {
      requestAnimationFrame(() =>
        this.fetch()
          .then(() => {
            this.draw();
          })
          .then(() => new Promise((resolve, reject) => setTimeout(resolve, 50)))
          .then(() => this.animate())
      );
    },
  },
  mounted() {
    this.$refs.canvas.width = this.width;
    this.$refs.canvas.height = this.height;
    this.animate();
  },
  beforeDestroy() {},
};
</script>

<style>

canvas{
  border: 1px dashed #ddd;
}
</style>
