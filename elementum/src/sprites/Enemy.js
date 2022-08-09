export default class Enemy extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, key) {
		super(scene, x, y, key);
		scene.sys.updateList.add(this);
		scene.sys.displayList.add(this);

		scene.physics.world.enableBody(this, 0);
		scene.physics.add.collider(this, scene.layer);
		this.body.setSize(10, 14);
		this.body.setGravity(0, 600);
		this.setScale(2);


		/* -------------ANIMATION CREATION---------- */
		scene.anims.create({
			key: "jump",
			frames: scene.anims.generateFrameNumbers("slimeAni", {start:0, end:10}),
			frameRate: 15,
			repeat: 0
		});
		scene.anims.create({
			key: "die",
			frames: scene.anims.generateFrameNumbers("slimeAni", {start:11, end:21}),
			frameRate: 32,
			repeat: 0
		});

		this.canMove = true;
		this.moveTimer = Math.floor(Math.random() * 100);

	}

	/* ---------- MOVEMENT FUNCTIONS ---------- */
	move(scene, player) {
		this.moveTimer++;


		var dx = Math.sqrt(Math.pow(player.x - this.body.x, 2));
		var dy = Math.sqrt(Math.pow(player.y - this.body.y, 2));

		if (this.canMove && dx <= 200 && dy < 50) {
			if (this.body.x < player.x) {
				this.body.setVelocityX(40)
			} else {
				this.body.setVelocityX(-40)
			}
		} else {
			if (this.canMove && this.moveTimer < 250) {
				this.body.setVelocityX(20);
				this.flipX = false;
			} else if (this.canMove && this.moveTimer < 500) {
				this.body.setVelocityX(-20);
				this.flipX = true;
			} else {
				this.moveTimer = 0;
			}
		}
		this.play("jump",true);
	}

	deactivate(scene, spell, x) {
		switch (spell.key) {
			case 'fire':
				this.play("die", true);
				setTimeout(() => this.destroy(), 400);
				scene.enemyGroup.splice(x, 1);
				break;
			case 'water':
				spell.suspend(scene, scene.enemyGroup[x])
				break;
			case 'air':
				spell.push(scene, scene.enemyGroup[x], scene.player.direction);
				break;
		}
		scene.player.spellActive[spell.key] = false;
		spell.destroy();

	}


}
