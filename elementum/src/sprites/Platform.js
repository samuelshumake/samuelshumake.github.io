export default class Enemy extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, key) {
		super(scene, x, y, key);
		scene.sys.updateList.add(this);
		scene.sys.displayList.add(this);

		scene.physics.world.enableBody(this, 0);
		scene.physics.add.collider(this, scene.player);
		scene.physics.add.collider(this, scene.layer);
		this.body.immovable = true

		scene.anims.create({
			key: "platformR",
			frames: scene.anims.generateFrameNumbers("tempPlatform", {start:0, end:0}),
			frameRate: 15,
			repeat: 0
		});
		scene.anims.create({
			key: "platformL",
			frames: scene.anims.generateFrameNumbers("tempPlatform", {start:1, end:1}),
			frameRate: 15,
			repeat: 0
		});
		scene.anims.create({
			key: "platformU",
			frames: scene.anims.generateFrameNumbers("tempPlatform", {start:2, end:2}),
			frameRate: 15,
			repeat: 0
		});
		scene.anims.create({
			key: "platformD",
			frames: scene.anims.generateFrameNumbers("tempPlatform", {start:3, end:3}),
			frameRate: 15,
			repeat: 0
		});
	}

	move(scene, direction, distance) {
		switch (direction) {
			case 'up':
				this.body.setVelocityY(-100);
				setTimeout(() => {this.body.setVelocity(0)}, distance * 10.1);
				break;
			case 'right':
				this.body.setVelocityX(100);
				setTimeout(() => {this.body.setVelocity(0)}, distance * 10.1);
				break;
			case 'down':
				this.body.setVelocityY(100);
				setTimeout(() => {this.body.setVelocity(0)}, distance * 10.1);
				break;
			case 'left':
				this.body.setVelocityX(-100);
				setTimeout(() => {this.body.setVelocity(0)}, distance * 10.1);
				break;
		}
	}

}
