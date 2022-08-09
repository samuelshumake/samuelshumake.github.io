import Spell from './Spell.js';

export default class Player extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, key) {
		super(scene, x, y, key);
		scene.sys.updateList.add(this);
		scene.sys.displayList.add(this);

		/* ------CONSTANTS AND VARIBLES------- */
		scene.physics.world.enableBody(this, 0);
		this.body.setSize(19, 39)
		scene.physics.add.collider(this, scene.layer);
		scene.physics.add.collider(this.body, scene.spikes, scene.resetLevel, null, this);
		this.body.setGravity(0, 600);
		this.spellTimer = 100;
		this.jumpHeld = false;
		this.raisingEarth = false;

		// Checks which spells are active
		this.spellActive = {
			fire: false,
			earth: false,
			water: false,
			air: false
		}

		// Initializes player's current spell
		this.currentSpell = 'fire';

		/* ------ ANIMATIONS ------- */
		scene.anims.create({
			key: "flipRight",
			frames: scene.anims.generateFrameNumbers("lever", {start:0, end:3}),
			frameRate: 15,
			repeat: 0
		});
		scene.anims.create({
			key: "run",
			frames: scene.anims.generateFrameNumbers("run", {start:0, end:7}),
			frameRate: 15,
			repeat: 0
		});
		scene.anims.create({
			key: "idle",
			frames: scene.anims.generateFrameNumbers("player", {start:0, end:0}),
			frameRate: 15,
			repeat: 0
		});
		scene.anims.create({
			key: "jumpPlayer",
			frames: scene.anims.generateFrameNumbers("jumpPlayer", {start:0, end:10}),
			frameRate: 15,
			repeat: 0
		});
	}

	/* ---------- MOVEMENT FUNCTIONS ---------- */
	move(scene) {
		var cursors = this.scene.input.keyboard.createCursorKeys();

		if (this.jumpHeld) {
			this.jumpHeld = !cursors.up._justUp;
		}

		this.canJump = (!this.jumpHeld && (this.body.touching.down || this.body.blocked.down));

		// Give the player left and right movement
		if (cursors.left.isDown) {
			this.body.setVelocityX(-250);
			this.flipX = true;
			if (this.body.blocked.down || scene.physics.add.overlap(this.body, this.platform)) {
				this.play("run",true);
			}
		} else if (cursors.right.isDown) {
			this.body.setVelocityX(250);
			this.flipX = false
			if (this.body.blocked.down || scene.physics.add.overlap(this.body, this.platform)) {
				this.play("run",true);
			}
		} else {
			this.body.setVelocityX(0);
			if (this.body.blocked.down || scene.physics.add.overlap(this.body, this.platform)) {
				this.play("idle",true);
			}
		}

		// Give the player jumping movement
		if (cursors.up.isDown && this.canJump) {
			this.jumpTimer = 0;
			this.jumpHeld = true;
			this.body.setVelocityY(-600);
			this.body.setAccelerationY(1300);
		}

		this.spellTimer++;
	}

	/* ---------- SPELL-CASTING FUNCTIONS ---------- */
	cast(scene, spell, direction = false) {
		this.direction = direction;
		this.spellTimer = 0;
		switch (spell) {

			/* ----- FIRE ----- */
			case 'fire':
				if (this.spellActive['fire'] === true) {
					return;
				}
				this.fire = scene.physics.add.existing(new Spell(scene, this.x, this.y, 'fire'));
				this.fire.body.setSize(32, 10);
				this.spellActive['fire'] = true;
				this.fire.shoot(scene, direction);
				break;
			/* ----- EARTH ----- */
			case 'earth':
				if (this.body.blocked.down || this.body.touching.down) {
					if (this.spellActive['earth'] === true) {
						this.spellActive['earth'] = false;
						this.earthBox.destroy();
						this.earthBox.animation.destroy();
					} else {
						this.spellActive['earth'] = true;
						this.earthBox = scene.physics.add.existing(new Spell(scene, this.x, this.body.bottom + 60));
						this.earthBox.body.setSize(32, 119);
						this.earthBox.raise(scene, this);
					}
				}
				break;
			/* ----- WATER ----- */
			case 'water':
				if (this.spellActive['water'] === true) {
					return;
				}
				this.water = scene.physics.add.existing(new Spell(scene, this.x, this.y, 'water'));
				this.spellActive['water'] = true;
				this.water.shoot(scene, direction);
				break;
			/* ----- AIR ----- */
			case 'air':
				if (this.spellActive['air'] === true) {
					return;
				}
				this.air = scene.physics.add.existing(new Spell(scene, this.x, this.y, 'air'));
				this.spellActive['air'] = true;
				this.air.shoot(scene, direction);
				break;
		}

	}

}
