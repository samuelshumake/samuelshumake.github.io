export default class PressurePlate extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, key) {
		super(scene, x, y, key);
		scene.sys.updateList.add(this);
		scene.sys.displayList.add(this);


		/* ------ PROPERTIES ------- */
		scene.physics.world.enableBody(this, 0);
		this.body.immovable = true;
		this.tripped = false;
		this.setScale(1.5)

		/* ------ CREATES ANIMATION ------- */
		scene.anims.create({
			key: "plateDown",
			frames: scene.anims.generateFrameNumbers("pressurePlate", {start:0, end:3}),
			frameRate: 15,
			repeat: 0
		});
		scene.anims.create({
			key: "plateUp",
			frames: scene.anims.generateFrameNumbers("pressurePlate", {start:3, end:0}),
			frameRate: 15,
			repeat: 0
		});

	}

	trip(scene, object) {
		if (!this.tripped) {
			this.play("plateDown", true);
			this.tripped = true;
			let screenX = scene.cameras.main.width;
			let screenY = scene.cameras.main.height;
			let direction;
			object.forEach(i => {
				i.move(scene, i.options[0], i.options[1]);
				if (object[0].options[2]) {
					let newCamera = scene.cameras.add(screenX - 275, screenY - 575, 250, 150).startFollow(object[0].options[2]).setZoom(object[0].options[3]).fadeIn(700);
					setTimeout(() => {scene.cameras.remove(newCamera)}, object[0].options[4]);
				}
			});
		}
	}

	untrip(scene, object) {
		if (this.tripped) {
			this.play("plateUp", true);
			this.tripped = false;
			let screenX = scene.cameras.main.width;
			let screenY = scene.cameras.main.height;
			let direction;
			object.forEach(i => {
				direction = this.reverse(i);
				i.move(scene, direction, i.options[1]);
				if (object[0].options[2]) {
					let newCamera = scene.cameras.add(screenX - 275, screenY - 575, 250, 150).startFollow(object[0].options[2]).setZoom(object[0].options[3]).fadeIn(700);
					setTimeout(() => {scene.cameras.remove(newCamera)}, object[0].options[4]);
				}
			});
		}
	}

	reverse(object) {
		let reverseMovement;
		switch(object.options[0]) {
			case 'left':
				reverseMovement = 'right';
				break;
			case 'up':
				reverseMovement = 'down';
				break;
			case 'right':
				reverseMovement = 'left';
				break;
			case 'down':
				reverseMovement = 'up';
				break;
		}
		return reverseMovement;
	}

}
