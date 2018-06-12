var regl = require('regl')()

var drawTriangle = regl({
  vert: `
    precision mediump float;
    uniform vec2 translate;
    uniform vec2 scale;
    attribute vec2 position;
    attribute vec3 color;
    varying vec3 fcolor;
    void main () {
      fcolor = color;
      gl_Position = vec4(scale * position + translate, 0, 1);
    }
  `,

  frag: `
    precision mediump float;
    varying vec3 fcolor;
    void main () {
      gl_FragColor = vec4(sqrt(fcolor), 1);
    }
  `,

  attributes: {
    position: function (context) {
      return [
        [Math.cos(context.tick / 100), 1],
        [1, 0],
        [-1, 0]
      ]
    },

    color: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]
  },

  uniforms: {
    translate: function (context, props) {
      return [
        0.25 * Math.cos(0.02 * context.tick),
        0.25 * Math.sin(0.015 * context.tick)
      ]
    },

    scale: function (context, props) {
      return [
        0.03 * Math.cos(0.08 * context.tick) + props.scale,
        props.scale
      ]
    }
  },

  count: 3
})

regl.frame(function () {
  regl.clear({
    color: [0, 0, 0, 1]
  })

  drawTriangle({
    scale: 0.25
  })
})
