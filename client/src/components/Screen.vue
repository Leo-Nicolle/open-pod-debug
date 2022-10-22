<template>
  <div>
    <h3>Screen</h3>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import apiMixin from '../js/api';
import bands from '../js/bands';

export default {
  name: 'ScreenDebug',
  data() {
    return {
      screenW: 128,
      screenH: 160,
      line: 0,
      maxLines: 15,
      scale: 1.5,
    };
  },
  computed: {
    width() {
      return this.screenW * this.scale;
    },
    height() {
      return this.screenH * this.scale;
    },
  },
  mixins: [apiMixin],
  methods: {
    fetch() {
      return Promise.resolve();
      // return axios
      //   .get(this.getUrl('angle'))
      //   .then(({ data }) => {
      //     // this.angle = data;
      //     // return this.angle;
      //   });
      // .then(() => axios.post(this.getUrl('angle'), {angle: this.angle + 1}))
    },
    draw() {
      const ctx = this.$refs.canvas.getContext('2d');
      const w = this.screenW;
      const h = this.screenH;
      ctx.save();
      ctx.scale(this.scale, this.scale);
      ctx.beginPath();
      const fontSize = 9;
      const margin = 2;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, w, h);
      ctx.textBaseline = 'top';
      // ctx.font = `bold ${fontSize} Roboto`;
      ctx.font = `${fontSize}px "LogisosoMedium"`;
      ctx.font = `${fontSize}px "FreeUniversalRegular"`;
      ctx.font = `${fontSize}px "profont"`;

      ctx.fillStyle = '#000';
      bands.slice(this.line, this.line + this.maxLines)
        .forEach((text, i) => {
          ctx.strokeText(text, 0, i * (fontSize + margin));
          ctx.fillText(text, 0, i * (fontSize + margin));
        });
      ctx.restore();
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

canvas{
  border: 1px dashed #ddd;
}
</style>
