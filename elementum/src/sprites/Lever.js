export default class Lever extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, key) {
		super(scene, x, y, key);
		scene.sys.updateList.add(this);
		scene.sys.displayList.add(this);

		/* ------ PROPERTIES ------- */
		scene.physics.world.enableBody(this, 0);
		this.body.immovable = true;
		this.setScale(3);
		this.flipX = true;
		this.flipped = false;

		/* ------ CREATES ANIMATION ------- */
		scene.anims.create({
			key: "flipRight",
			frames: scene.anims.generateFrameNumbers("lever", {start:0, end:3}),
			frameRate: 15,
			repeat: 0
		});
	}

	flip(scene, object) {
		if (scene.physics.overlap(this, scene.player) && !this.flipped) {
			this.flipped = true;
			let screenX = scene.cameras.main.width;
			let screenY = scene.cameras.main.height;
			this.play("flipRight",true);
			object.forEach(i => {
				i.move(scene, i.options[0], i.options[1]);
				if (object[0].options[2]) {
					let newCamera = scene.cameras.add(screenX - 275, screenY - 575, 250, 150).startFollow(object[0].options[2]).setZoom(object[0].options[3]).fadeIn(700);
					setTimeout(() => {scene.cameras.remove(newCamera)}, object[0].options[4]);
				}
			});
		}
	}
}
