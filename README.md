## aframe-raytrace-component

[![Version](http://img.shields.io/npm/v/aframe-raytrace-component.svg?style=flat-square)](https://npmjs.org/package/aframe-raytrace-component)
[![License](http://img.shields.io/npm/l/aframe-raytrace-component.svg?style=flat-square)](https://npmjs.org/package/aframe-raytrace-component)

An [A-Frame](https://aframe.io) component for placing raytraced surfaces in a scene.

![blob](https://user-images.githubusercontent.com/8540042/30010500-267a6ea0-90fe-11e7-8a9c-8fb5295d1b9f.gif)

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| shader   | ID of a shader in a script tag. | (none) |
| transparent | Whether the result of the shader is alpha blended with what's behind it. | false |
| backside | Whether the shader is drawn on the frontfaces or the backfaces of the mesh. | false |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.6.0/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-raytrace-component/dist/aframe-raytrace-component.min.js"></script>
</head>

<body>
  
  <script id="foo-fs" type="x-shader/x-fragment">
    uniform float time;
    varying vec3 localCameraPos;
    varying vec3 localSurfacePos;
    
    void main(){
      vec3 localCameraDirection = normalize(localSurfacePos - localCameraPos);
      gl_FragColor = vec4(1.0,0.0,1.0,1.0);
    }
  </script>
  
  <a-scene>
    <a-box position="0 1.6 -2" raytrace="shader:#foo-fs"></a-box>
  </a-scene>
  
</body>
```

<!-- If component is accepted to the Registry, uncomment this. -->
<!--
Or with [angle](https://npmjs.com/package/angle/), you can install the proper
version of the component straight into your HTML file, respective to your
version of A-Frame:
-->
<!--
```sh
angle install aframe-raytrace-component
```
-->

#### npm

Install via npm:

```bash
npm install aframe-raytrace-component
```

Then require and use.

```js
require('aframe');
require('aframe-raytrace-component');
```
