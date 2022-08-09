export default class Spell extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, key) {
		super(scene, x, y, key);
		scene.sys.updateList.add(this);
		scene.sys.displayList.add(this);

		scene.physics.world.enableBody(this, 0);
		this.body.setImmovable(true);

		this.key = key;

		/* ---------- SPELL ANIMATIONS ---------- */
		scene.anims.create({
			key: "waterAni",
			frames: scene.anims.generateFrameNumbers("water", {start: 0, end: 21}),
			frameRate: 32,
			repeat: -1
		});
		scene.anims.create({
			key: "earthAni",
				frames: scene.anims.generateFrameNumbers("earth", {start: 0, end: 24}),
			frameRate: 28,
			repeat: 0
		});
		scene.anims.create({
			key: "fireBegin",
			frames: scene.anims.generateFrameNumbers("fire", {start: 0, end: 3}),
			frameRate: 10,
			repeat: 0
		});
		scene.anims.create({
			key: "fireMiddle",
			frames: scene.anims.generateFrameNumbers("fire", {start: 4, end: 5}),
			frameRate: 10,
			repeat: -1
		});
		scene.anims.create({
			key: "fireEnd",
			frames: scene.anims.generateFrameNumbers("fire", {start: 6, end: 8}),
			frameRate: 10,
			repeat: -1
		});
		scene.anims.create({
			key: "airAni",
			frames: scene.anims.generateFrameNumbers("air", {start: 0, end: 3}),
			frameRate: 10,
			repeat: -1
		});
	}

	deactivate(scene, enemyGroup) {
		if (this.body.x > scene.player.x + 400 || this.body.x < scene.player.x - 400) {
			scene.player.spellActive[`${this.key}`] = false;
			this.destroy();
		} else if (this.body.velocity.x === 0) {
			scene.player.spellActive[`${this.key}`] = false;
			this.destroy();
		}
	}

	shoot(scene, direction) {
		scene.physics.add.collider(this, scene.layer);
		if (this.key === 'water') {
			this.play('waterAni', true);
		} else if (this.key === 'fire') {
			this.play('fireBegin', true);
			setTimeout(() => {
				if (this.active) {
					this.play('fireMiddle', true);
				}
			}, 450);
		} else if (this.key === 'air') {
			this.play('airAni', true);
		}
		if (!direction) {
			this.body.setVelocityX(300);
		} else {
			this.body.setVelocityX(-300);
			this.flipX = true;
		}
	}

	raise(scene, player) {
		scene.physics.add.collider(player, this);
		if (scene.enemyGroup) {
			scene.physics.add.collider(scene.enemyGroup, this);
		}
		this.animation = scene.physics.add.existing(new Spell(scene, player.x, player.body.bottom, 'earth'));
		this.animation.setScale(1, 1.31);
		this.animation.setOrigin(0.5, 1);
		this.animation.play('earthAni', true);
		player.raisingEarth = true;
	}

	suspend(scene, enemy) {
		enemy.canMove = false;
		enemy.body.setGravity(0, 0);
		enemy.body.setVelocityX(0);
		enemy.body.setVelocityY(-200);
		setTimeout(() => {enemy.body.setGravity(0, 600); enemy.canMove = true}, 1000);
	}

	push(scene, enemy, direction) {
		enemy.canMove = false;
		if (direction) {
			enemy.body.setVelocityX(-150);
		} else {
			enemy.body.setVelocityX(150);
		}
		setTimeout(() => {enemy.body.setVelocityX(0); enemy.canMove = true}, 1200);
	}
}
