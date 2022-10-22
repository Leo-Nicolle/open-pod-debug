<template>
  <div>
    <h3>Screen</h3>
    <div class="container">
      <canvas ref="canvas"></canvas>
      <div class="info">
        <p>
          line: <strong>{{ line }}</strong>
        </p>
        <p>
          currSub: <strong>{{ currSub }}</strong>
        </p>

      </div>
    </div>
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
      subdivision: 5,
      currSub: 0,
      maxLines: 15,
      scale: 1.5,
    };
  },
  watch: {
    // scroll(n, o) {
    //   if (n < 0) {
    //     this.currSub = (-Math.abs(n) % this.subdivision) + this.subdivision;
    //   } else {
    //     this.currSub = n % this.subdivision;
    //   }
    //   if (this.currSub === 0) {
    //     this.line += Math.sign(o - n);
    //   }
    // },
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
    scroll(d) {
      this.currSub += d;
      if (this.currSub < 0) {
        this.line++;
        this.currSub = this.subdivision - 1;
      } else if (this.currSub > this.subdivision) {
        this.currSub = 0;
        this.line--;
      }
    },
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
      const fontSize = 12;
      const margin = 2;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, w, h);
      ctx.textBaseline = 'top';
      // ctx.font = `bold ${fontSize} Roboto`;
      ctx.font = `${fontSize}px "LogisosoMedium"`;
      ctx.font = `${fontSize}px "FreeUniversalRegular"`;
      ctx.font = `${fontSize}px "profont"`;
      ctx.save();
      ctx.fillStyle = '#bFb';
      ctx.fillRect(0, (h - fontSize) / 2, w, fontSize);
      ctx.restore();

      ctx.fillStyle = '#000';
      for (let i = 0; i < this.maxLines; i++) {
        const text = bands[(i + this.line) % bands.length];
        const offsetY = Math.floor(fontSize / this.subdivision * this.currSub);
        const y = i * (fontSize + margin) + offsetY;
        ctx.strokeText(text, 0, y);
        ctx.fillText(text, 0, y);
      }
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
canvas {
  border: 1px dashed #ddd;
}
</style>
