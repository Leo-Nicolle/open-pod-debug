<template>
  <div>
    <p>angle: {{angle}}</p>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import axios from "axios";
import apiMixin from "../js/api";

export default {
  name: "ClickDebug",
  data() {
    return {
      message: "",
      width: 512,
      height: 512,
      angle: 0,
    };
  },
  mixins: [apiMixin],
  computed: {},
  methods: {
    fetch() {
      return axios.get(this.getUrl("angle"))
      .then(({data}) => {
        this.angle = data
        return this.angle;
      })
    },
    draw() {
      const ctx = this.$refs.canvas.getContext("2d");
      ctx.beginPath();
      ctx.arc(this.width / 2, this.height / 2, this.width / 2, 0, Math.PI * 2);
      ctx.fillStyle = "#9d9";
      ctx.fill();

      const r = 5;
      const padding = 5;
      const angle = this.angle / 360 * Math.PI * 2;
      const x =
        this.width / 2 + Math.cos(angle) * (this.width / 2 - r - padding);
      const y =
        this.width / 2 + Math.sin(angle) * (this.width / 2 - r - padding);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = "#d99";
      ctx.fill();
    },
    animate(){
      requestAnimationFrame(() => 
        this.fetch()
          .then(() => {
            this.draw();
          })
          .then(() =>  new Promise((resolve, reject) => setTimeout(resolve, 50)))
          .then(() => this.animate()))
    }
  },
  mounted() {
    this.$refs.canvas.width = this.width;
    this.$refs.canvas.height = this.height;
    this.animate()
  },
  beforeDestroy(){
  }
};
</script>

<style>
</style>
