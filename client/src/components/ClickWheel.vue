<template>
  <div class="clickwheel">
    <h3>ClickWheel</h3>
    <div class="container">
      <canvas ref="canvas"></canvas>
      <div class ="info">
      <p>touched: <strong>{{ touched }}</strong></p>
      <p>angle: <strong>{{ angle }}</strong></p>
      <p>lines: <strong>{{ lines }}</strong></p>
      <p>resolution: <strong>{{ lines * 2 }}</strong></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import apiMixin from '../js/api';

export default {
  name: 'ClickDebug',
  data() {
    return {
      message: '',
      width: 128,
      height: 128,
      lines: 16,
      angle: 0,
      touched: -1,
    };
  },
  mixins: [apiMixin],
  computed: {},
  methods: {
    fetch() {
      return axios
        .get(this.getUrl('angle'))
        .then(({ data }) => {
          this.angle = data;
          return this.angle;
        })
        .then(() => axios.get(this.getUrl('touched')))
        .then(({ data }) => {
          this.touched = data;
          return this.touched;
        });

      // .then(() => axios.post(this.getUrl('angle'), {angle: this.angle + 1}))
    },
    draw() {
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(this.width / 2, this.height / 2, this.width / 2, 0, Math.PI * 2);
      ctx.fillStyle = '#9d9';
      ctx.fill();

      const r = 5;
      const padding = 5;
      const angle = (this.angle / 360) * Math.PI * 2;
      const x = this.width / 2 + Math.cos(angle) * (this.width / 2 - r - padding);
      const y = this.width / 2 + Math.sin(angle) * (this.width / 2 - r - padding);
      if (this.touched !== -1) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#d99';
        ctx.fill();
      }
      ctx.beginPath();
      ctx.strokeStyle = '#5a2';

      new Array(this.lines).fill(0).forEach((_, i) => {
        const angle = (i / this.lines) * Math.PI;
        const start = {
          x: this.width / 2 + (Math.cos(angle + Math.PI) * this.width) / 2,
          y: this.width / 2 + (Math.sin(angle + Math.PI) * this.width) / 2,
        };
        const end = {
          x: this.width / 2 + (Math.cos(angle) * this.width) / 2,
          y: this.width / 2 + (Math.sin(angle) * this.width) / 2,
        };
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
      });
      ctx.stroke();
    },
    animate() {
      requestAnimationFrame(() => this.fetch()
        .then(() => {
          this.draw();
        })
        .then(() => new Promise((resolve, reject) => setTimeout(resolve, 50)))
        .then(() => this.animate()));
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
.container{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.info{
  margin-left: 6px;
}
</style>
