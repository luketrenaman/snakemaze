precision mediump float;
varying vec2 vTextureCoord;//The coordinates of the current pixel
uniform sampler2D uSampler;//The image data
void main(void) {
	gl_FragColor = texture2D(uSampler, vTextureCoord);
	gl_FragColor.r *= 1.5;
	gl_FragColor.g *= 50.0;
	gl_FragColor.b *= 1.6;

}
