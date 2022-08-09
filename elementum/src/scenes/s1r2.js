/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
import Player from '../sprites/Player.js';
import Enemy from '../sprites/Enemy.js';
import Spell from '../sprites/Spell.js';
import Platform from '../sprites/Platform.js';
import Lever from '../sprites/Lever.js';
import PressurePlate from '../sprites/PressurePlate.js';
import Rock from '../sprites/Rock.js';
import Box from '../sprites/Box.js';
export default class s1r2 extends Phaser.Scene {

	constructor () {
		super('s1r2');
	}

	init (data) {
		// Initialization code goes here
	}

	preload () {
		/* ---------- LOADS SPRITE SHEETS ---------- */
		this.load.spritesheet('player', './elementum/assets/spriteSheets/idleFinal.png', {
			frameHeight: 39,
			frameWidth: 34,
		});
		this.load.spritesheet('lever', './elementum/assets/spriteSheets/lever.png',{
			frameHeight: 6,
			frameWidth: 9
		});
		this.load.spritesheet('run', './elementum/assets/spriteSheets/runPlayer.png',{
			frameHeight: 39,
			frameWidth: 34
		});
		this.load.spritesheet('slimeAni', './elementum/assets/spriteSheets/slimesprite-sheet.png',{
			frameHeight: 14,
			frameWidth:	 21
		});
		this.load.spritesheet('water', './elementum/assets/spriteSheets/water.png', {
			frameHeight: 32,
			frameWidth: 32,
		});
		this.load.spritesheet('earth', './elementum/assets/spriteSheets/earth.png', {
			frameHeight: 96,
			frameWidth: 32,
		});
		this.load.spritesheet('fire', './elementum/assets/spriteSheets/fire.png', {
			frameHeight: 32,
			frameWidth: 48,
		});
		this.load.spritesheet('air', './elementum/assets/spriteSheets/air.png', {
			frameHeight: 32,
			frameWidth: 48,
		});
		this.load.spritesheet('pressurePlate', './elementum/assets/spriteSheets/pressureplate.png', {
			frameHeight: 6,
			frameWidth: 32
		});
		this.load.spritesheet('guiMana', './elementum/assets/spriteSheets/guiMana.png', {
			frameHeight: 32,
			frameWidth: 32
		});
		this.load.spritesheet('guiSpell', './elementum/assets/spriteSheets/guiSpell.png', {
			frameHeight: 10,
			frameWidth: 40
		});

		/* ---------- LOADS LEVEL TILEMAP ---------- */
		this.load.image('tiles', './elementum/assets/images/tilemapv2.png');
		this.load.tilemapTiledJSON('s1r2', './elementum/assets/map/s1r2.json')

		/* ---------- LOADS SPRITES FOR GAME OBJECTS ---------- */
		this.load.image('platform', './elementum/assets/sprites/platform.png');
		this.load.image('spike', './elementum/assets/sprites/spike.png');
		this.load.image('rock', './elementum/assets/sprites/rock.png');
		this.load.image('box', './elementum/assets/sprites/box.png');
	}	// ---------- END OF PRELOAD ---------- //

	create (data) {
		ChangeScene.addSceneEventListeners(this);

		/* ---------- GLOBAL VARIABLES --------- */
		this.resetLevel = false;
		this.gameWidth = this.cameras.main.width;
		this.gameHeight = this.cameras.main.height;

		/* ---------- CREATES MAP ---------- */
		const map = this.make.tilemap({key: "s1r2"});
		const tileset = map.addTilesetImage("tilemapv2", "tiles");
		this.layer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);
		this.layer.setCollisionByProperty({ collides: true });
		this.layer2 = map.createStaticLayer("Foreground", tileset, 0,0);

		/* ---------- CREATES PLAYER ---------- */
		this.player = new Player(this, 300, 530, 'player');

		/* ---------- ADJUSTS CAMERA ---------- */
		let camera = this.cameras.main;
		camera.setZoom(2);
		camera.startFollow(this.player, true, 0.1);
		camera.setFollowOffset(0, 50);
		camera.setBounds(0, 0, 800, 640);

		/* ---------- CREATES GUI ---------- */
		this.guiMana = this.physics.add.sprite(this.cameras.main.width / 3.75, this.cameras.main.height / 3.5, 'guiMana').setFrame(22).setScrollFactor(0, 0);
		this.guiSpell = this.physics.add.sprite(this.cameras.main.width / 3.75 + 33, this.cameras.main.height / 3.5, 'guiSpell').setScrollFactor(0, 0);
		this.anims.create({
			key: 'manaRegen',
			frames: this.anims.generateFrameNumbers('guiMana', {start: 0, end: 21}),
			frameRate: 20,
			repeat: 0
		});
		this.guiMana.depth = 2;
		this.guiSpell.depth = 2;

		this.spikeGroup = [];
		for (let i = 0; i <= 5; i++) {
			var spike = this.physics.add.sprite(16*i + 585, 635, 'spike').setScale(0.3);
			spike.body.immovable = true;
			this.spikeGroup.push(spike);
		}

		/* ---------- CREATES DOOR ---------- */
		this.door = this.physics.add.sprite(754, 352);

		/* ---------- CREATES BOX ---------- */
		this.box = new Box(this, 80, 515, 'box');
		this.physics.add.collider(this.box, this.spikeGroup);
		this.boxGroup = [this.box];

		// /* ---------- CREATES ENEMIES ---------- */
		this.enemy1 = new Enemy(this, 500, 400, 'slimeAni');
		this.enemy2 = new Enemy(this, 200, 400, 'slimeAni');
		this.enemyGroup = [this.enemy1, this.enemy2];

		/* ---------- CREATES PLATFORMS ---------- */
		this.platform1 = new Platform(this, 80, 560, 'platform').setScale(1, 0.3);
		this.platform1.options = ['up', 383, this.box, 1, 4500];
		this.physics.add.collider(this.platform1, this.box);
		this.platform2 = new Platform(this, 15, 112, 'platform').setScale(0.35, 0.96);
		this.platform2.options = ['right', 540, this.box, 1, 5700];
		this.physics.add.collider(this.platform2, this.box);
		this.platform3 = new Platform(this, 400, 497, 'platform').setScale(0.3, 1);
		this.platform3.options = ['down', 95, this.box, 1, 0];

		this.lever1 = new Lever(this, 350, 535, 'lever');
		this.lever2 = new Lever(this, 353, 279, 'lever');

		/* ---------- KEYS FOR INTERACTING ---------- */
		this.switchFire = this.input.keyboard.addKey('one');
		this.switchAir = this.input.keyboard.addKey('two');
		this.switchEarth = this.input.keyboard.addKey('three');
		this.switchWater = this.input.keyboard.addKey('four');
		this.interact = this.input.keyboard.addKey('e');
		this.reset = this.input.keyboard.addKey('r');
		this.castSpell = this.input.keyboard.addKey('space');

	}	// ---------- END OF CREATE ---------- //

	update (time, delta) {

		if (this.box.y > 630) {
			this.box.body.setVelocity(0);
			this.box.body.setGravity(0);
		}

		/* ---------- RESETS LEVEL ---------- */
		if (this.resetLevel) {
			this.scene.start('s1r2')
		}

		/* ---------- STARTS NEXT LEVEL ---------- */
		if (this.nextLevel) {
			this.scene.start('s1r3')
		}

		/* ---------- MOVES PLAYER ---------- */
		this.player.move(this);

		/*----------- ENEMY MOVEMENT -------------- */
		for(var x in this.enemyGroup){
			this.enemyGroup[x].move(this, this.player);
		}

		/* ----------- PLAYER KILLERS ----------- */
		this.physics.overlap(this.player, Object.values(this.enemyGroup), () => this.resetLevel = true);
		this.physics.overlap(this.player, Object.values(this.spikeGroup), () => this.resetLevel = true);
		this.physics.overlap(this.player, this.door, () => this.nextLevel = true);
		if (this.box && this.box.body.touching.down && this.player.body.touching.up) {
			this.resetLevel = true;
		}

		/* ---------- CHECKS TO DEACTIVATE SPELLS ---------- */
		if (this.player.spellActive['fire']) {
			this.player.fire.deactivate(this, this.enemyGroup);
			for (let x in this.enemyGroup) {
				this.physics.overlap(this.player.fire, this.enemyGroup[x], () => this.enemyGroup[x].deactivate(this, this.player.fire, x));
			}
		}
		if (this.player.spellActive['water']) {
			this.player.water.deactivate(this, this.enemyGroup);
			for (let x in this.enemyGroup) {
				this.physics.overlap(this.player.water, this.enemyGroup[x], () => this.enemyGroup[x].deactivate(this, this.player.water, x));
			}
			if (this.boxGroup) {
				for (let x in this.boxGroup) {
					this.physics.add.overlap(this.boxGroup[x], this.player.water, () => {
						this.player.water.suspend(this, this.boxGroup[x]);
					});
				}
			}
		}
		if (this.player.spellActive['air']) {
			this.player.air.deactivate(this, this.enemyGroup);
			for (let x in this.enemyGroup) {
				this.physics.overlap(this.player.air, this.enemyGroup[x], () => this.enemyGroup[x].deactivate(this, this.player.air, x));
			}
			if (this.rockGroup) {
				for (let x in this.rockGroup) {
					this.physics.add.overlap(this.rockGroup[x], this.player.air, () => {
						this.player.air.push(this, this.rockGroup[x], this.player.direction);
					});
				}
			}
			if (this.boxGroup) {
				for (let x in this.boxGroup) {
					this.physics.add.overlap(this.boxGroup[x], this.player.air, () => {
						this.player.air.push(this, this.boxGroup[x], this.player.direction);
					});
				}
			}
		}

		/* ---------- CASTING SPELLS ---------- */
		if (this.switchFire.isDown) {
			this.player.currentSpell = 'fire';
			this.guiSpell.setFrame(0);
		} else if (this.switchAir.isDown) {
			this.player.currentSpell = 'air';
			this.guiSpell.setFrame(1);
		} else if (this.switchEarth.isDown) {
			this.player.currentSpell = 'earth';
			this.guiSpell.setFrame(2);
		} else if (this.switchWater.isDown) {
			this.player.currentSpell = 'water';
			this.guiSpell.setFrame(3);
		}

		if (this.reset.isDown) {
			this.resetLevel = true;
		}

		// Casts spell if cooldown timer has been met
		if (this.castSpell.isDown && this.player.spellTimer > 70 ) {
			this.player.cast(this, this.player.currentSpell, this.player.flipX);
			this.guiMana.play('manaRegen', true);
		}

		if (this.player.raisingEarth) {
			this.player.earthBox.body.setVelocityY(-135);
			if (!this.player.earthBox.animation.anims.isPlaying) {
				this.player.raisingEarth = false;
				this.player.earthBox.body.setVelocityY(0);
			}
		}

		if (this.interact.isDown) {
			this.lever1.flip(this, [this.platform1]);
			this.lever2.flip(this, [this.platform2, this.platform3]);
		}
	}	// ----- END OF UPDATE ----- //

}	// ----- END OF PHASER SCENE ----- //
