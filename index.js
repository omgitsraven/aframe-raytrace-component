if (typeof AFRAME === 'undefined') {
	throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('raytrace', {
	
	schema: {
		shader:{type:'selector'},
		transparent:{type:'boolean',default:false},
		backside:{type:'boolean',default:false}
	},
	
	init: function () {
		
		this.myMesh = this.el.getOrCreateObject3D('mesh');
		this.myShaderMaterial = new THREE.ShaderMaterial({
			
			vertexShader:
				"precision mediump float;\n"+
				"varying vec3 localSurfacePos;\n"+
				"void main() {\n"+
					"gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n"+
					"localSurfacePos = position;\n"+
				"}",
				
			uniforms:{
				time:{value:0},
				localCameraPos:{value:new THREE.Vector3(0,0,0)}
			},
			
		});
		this.myMesh.material = this.myShaderMaterial;
		
		var self = this;
		this.myMesh.onBeforeRender = function(renderer,scene,camera,geometry,material,group){
			
			self.myShaderMaterial.uniforms.time.value = performance.now();
			
			camera.getWorldPosition(self.myShaderMaterial.uniforms.localCameraPos.value);
			self.myMesh.worldToLocal(self.myShaderMaterial.uniforms.localCameraPos.value);
			
		};
		
	},
	remove:function(){
		this.myMesh.onBeforeRender = null;
	},
	update: function (oldData) {
		this.myShaderMaterial.fragmentShader = this.data.shader.textContent;
		this.myShaderMaterial.side = this.data.backside?THREE.BackSide:THREE.FrontSide;
		this.myShaderMaterial.transparent = this.data.transparent;
	}
});
