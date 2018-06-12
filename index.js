var regl = require('regl')()

var drawTriangle = regl({
  vert: `
    precision mediump float;
    attribute vec2 position;
    void main () {
      gl_Position = vec4(position, 0, 1);
    }
  `,

  frag: `
    precision mediump float;
    uniform vec4 color;
    void main () {
      gl_FragColor = color;
    }
  `,

  attributes: {
    position: function (context) {
      return [
        [Math.cos(context.tick / 100), 1],
        [Math.sin(context.tick / 100), 0],
        [-1 * Math.sin(context.tick / 100), 0]
      ]
    }
  },

  uniforms: {
    color: function (context, props) {
      return props.color
    }
  },

  count: 3
})

regl.frame(function () {
  drawTriangle({
    color: [0, 1, 1, 1]
  })
})
