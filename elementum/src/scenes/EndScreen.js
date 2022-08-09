/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
export default class EndScreen extends Phaser.Scene {
	constructor () {
		super('EndScreen');
	}

	init (data) {}

	preload () {
		this.load.image('endscreen', './elementum/assets/images/endscreen.png');

		this.centerX = this.cameras.main.width / 2;
		this.centerY = this.cameras.main.height / 2;
	}

	create (data) {
		ChangeScene.addSceneEventListeners(this);
		this.add.image(this.centerX, this.centerY, 'endscreen').setScale(5);
	}

	update (time, delta) {}
}
