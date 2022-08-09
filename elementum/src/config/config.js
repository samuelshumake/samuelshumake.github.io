/*global Phaser*/

export default {
	type: Phaser.AUTO,
	parent: 'elementum-container',
	scale: {
		mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	width: 1200,
	height: 640,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			gravity: { y: 0 }
		}
	},
pixelArt: true
};
