/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
import Player from '../sprites/Player.js';
import Enemy from '../sprites/Enemy.js';
import Spell from '../sprites/Spell.js';
import Platform from '../sprites/Platform.js';
import Rock from '../sprites/Rock.js';
import Box from '../sprites/Box.js';
export default class SpellDisplay extends Phaser.Scene {

	constructor () {
		super('SpellDisplay');
	}

	init (data) {
		// Initialization code goes here
	}

	preload () {
		/* ---------- LOADS SPRITE SHEETS ---------- */
		this.load.spritesheet('player', './elementum/assets/spriteSheets/idleFinal.png', {
			frameHeight: 39,
			frameWidth: 32,
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
			frameWidth: 32
		});
		this.load.spritesheet('earth', './elementum/assets/spriteSheets/earth.png', {
			frameHeight: 96,
			frameWidth: 32
		});
		this.load.spritesheet('fire', './elementum/assets/spriteSheets/fire.png', {
			frameHeight: 32,
			frameWidth: 32
		});
		this.load.spritesheet('air', './elementum/assets/spriteSheets/air.png', {
			frameHeight: 32,
			frameWidth: 48
		});
		this.load.spritesheet('spellTiles', './elementum/assets/spriteSheets/spellTiles.png', {
			frameHeight: 160,
			frameWidth: 96
		});

		/* ---------- LOADS LEVEL TILEMAP ---------- */
		this.load.image('tiles', './elementum/assets/images/tilemapv2.png');
		this.load.tilemapTiledJSON('display', './elementum/assets/map/display.json');

		/* ---------- LOADS SPRITES FOR GAME OBJECTS ---------- */
		this.load.image('platform', './elementum/assets/sprites/platform.png');
		this.load.image('spike', './elementum/assets/sprites/spike.png');
		this.load.image('rock', './elementum/assets/sprites/rock.png');
		this.load.image('box', './elementum/assets/sprites/box.png');
		this.load.image('cameraFrame', './elementum/assets/sprites/cameraFrame.png');
	}	// ---------- END OF PRELOAD ---------- //

	create (data) {
		ChangeScene.addSceneEventListeners(this);

		// Spell tutorial background loading
		const map = this.make.tilemap({key: 'display'});
		const tileset = map.addTilesetImage('tilemapv2', 'tiles');
		this.layer = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
		this.layer.setCollisionByProperty({ collides: true });

		this.centerScreen = this.physics.add.sprite(496, 433);
		this.topLeft = this.physics.add.sprite(272, 144);
		this.topRight = this.physics.add.sprite(720, 144);
		this.bottomLeft = this.physics.add.sprite(272, 720);
		this.bottomRight = this.physics.add.sprite(720, 720);

		this.menuButton = this.physics.add.sprite(this.centerScreen.x - 220, this.centerScreen.y - 120, "cameraFrame").setScale(1.5, 0.5);
		this.add.text(this.centerScreen.x - 250, this.centerScreen.y - 133, 'BACK', {color: '#fff', fontSize: 24});
		this.menuButton.setInteractive().on("pointerdown", () => {
			this.scene.start("Boot");
		});

		this.player1 = new Player(this, 130, 205, 'player');
		this.player1.spellActive = false;
		this.player2 = new Player(this, 570, 205, 'player');
		this.player3 = new Player(this, 272, 780, 'player');
		this.player4 = new Player(this, 570, 780, 'player');
		this.player3.raisingEarth = false;

		this.enemy = new Enemy(this, 410, 205, 'slimeAni').setScale(2);
		this.enemy.flipX = true;

		this.box = new Box(this, 720, 205, 'box').setScale(1.5);
		this.rock = new Rock(this, 720, 750, 'rock');

		this.camera = this.cameras.main;
		this.camera.startFollow(this.centerScreen);
		this.camera.setZoom(2);

		this.fireTile = this.physics.add.sprite(this.centerScreen.x - 192, this.centerScreen.y, "spellTiles");
		this.airTile = this.physics.add.sprite(this.centerScreen.x - 64, this.centerScreen.y, "spellTiles", 1);
		this.earthTile = this.physics.add.sprite(this.centerScreen.x + 64, this.centerScreen.y, "spellTiles", 2);
		this.waterTile = this.physics.add.sprite(this.centerScreen.x + 192, this.centerScreen.y, "spellTiles", 3);

		this.fireTile.setInteractive().on('pointerdown', () => {
			this.camera.setZoom(2.7);
			this.camera.startFollow(this.topLeft);
			this.spellClicked = true;
		});
		this.airTile.setInteractive().on('pointerdown', () => {
			this.camera.setZoom(2.7);
			this.camera.startFollow(this.bottomRight);
			this.spellClicked = true;
		});
		this.earthTile.setInteractive().on('pointerdown', () => {
			this.camera.setZoom(2.7);
			this.camera.startFollow(this.bottomLeft);
			this.spellClicked = true;
		});
		this.waterTile.setInteractive().on('pointerdown', () => {
			this.camera.setZoom(2.7);
			this.camera.startFollow(this.topRight);
			this.spellClicked = true;
		});

		this.backButtonTL = this.physics.add.sprite(this.topLeft.x - 115, this.topLeft.y - 55, "cameraFrame").setScale(1.5, 0.5);
		this.add.text(this.topLeft.x - 144, this.topLeft.y - 68, 'BACK', {color: '#fff', fontSize: 24});
		this.backButtonTR = this.physics.add.sprite(this.topRight.x - 115, this.topRight.y - 55, "cameraFrame").setScale(1.5, 0.5);
		this.add.text(this.topRight.x - 144, this.topRight.y - 68, 'BACK', {color: '#fff', fontSize: 24});
		this.backButtonBL = this.physics.add.sprite(this.bottomLeft.x - 115, this.bottomLeft.y - 55, "cameraFrame").setScale(1.5, 0.5);
		this.add.text(this.bottomLeft.x - 144, this.bottomLeft.y - 68, 'BACK', {color: '#fff', fontSize: 24});
		this.backButtonBR = this.physics.add.sprite(this.bottomRight.x - 115, this.bottomRight.y - 55, "cameraFrame").setScale(1.5, 0.5);
		this.add.text(this.bottomRight.x - 144, this.bottomRight.y - 68, 'BACK', {color: '#fff', fontSize: 24});

		this.backButtonTL.setInteractive().on('pointerdown', () => {
			this.camera.setZoom(2);
			this.camera.startFollow(this.centerScreen);
			this.spellClicked = false;
		});
		this.backButtonTR.setInteractive().on('pointerdown', () => {
			this.camera.setZoom(2);
			this.camera.startFollow(this.centerScreen);
			this.spellClicked = false;
		});
		this.backButtonBL.setInteractive().on('pointerdown', () => {
			this.camera.setZoom(2);
			this.camera.startFollow(this.centerScreen);
			this.spellClicked = false;
		});
		this.backButtonBR.setInteractive().on('pointerdown', () => {
			this.camera.setZoom(2);
			this.camera.startFollow(this.centerScreen);
			this.spellClicked = false;
		});

		this.roundTimer = 0;
		this.spellClicked = false;
	}

	update (time, delta) {

		if (this.roundTimer == 100) {

			// ---------- FIRE SPELL ---------- //
			this.fire = this.physics.add.existing(new Spell(this, this.player1.x + 30, this.player1.y, 'fire'));
			this.fire.body.setSize(32, 10);
			this.fire.play('fireBegin', true);
			setTimeout(() => {
				if (this.fire.active) {
					this.fire.play('fireMiddle', true);
				}
			}, 450);
			this.fire.body.setVelocityX(300);

			// ---------- WATER SPELL ---------- //
			this.water = this.physics.add.existing(new Spell(this, this.player2.x + 30, this.player2.y, 'water'));
			this.water.play('waterAni', true);
			this.water.body.setVelocityX(300);

			// ---------- AIR SPELL ---------- //
			this.air = this.physics.add.existing(new Spell(this, this.player4.x + 30, this.player4.y, 'air'));
			this.air.play('airAni', true);
			this.air.body.setVelocityX(300);

			// ---------- EARTH SPELL ---------- //
			this.canRaise = false;
			this.earthBox = this.physics.add.existing(new Spell(this, this.player3.x, this.player3.body.bottom + 15));
			this.earthBox.animation = this.physics.add.existing(new Spell(this, this.player3.x, this.player3.body.bottom, 'earth'));
			this.earthBox.body.setSize(32, 1);
			this.earthBox.animation.setScale(1, 1.31);
			this.earthBox.animation.setOrigin(0.5, 1);
			this.earthBox.animation.play('earthAni', true);
			this.player3.raisingEarth = true;
			this.physics.add.collider(this.earthBox, this.player3);
		}
		// ---------- EARTH SPELL PHYSICS ---------- //
		if (this.player3.raisingEarth) {
			if (this.earthBox.body.height >= 113) {
				this.player3.raisingEarth = false;
			}
			this.earthBox.body.height += 2.1;
			this.player3.y -= 1;
			this.earthBox.body.offset.set(0, -this.earthBox.body.height);
		}
		// ---------- SPELL DEACTIVATION ---------- //
		if (this.fire) {
			// ------- FIRE ------- //
			this.physics.overlap(this.fire, this.enemy, () => {
				this.fire.destroy();
				this.enemy.visible = false;
			});
			// ------- WATER ------- //
			this.physics.overlap(this.water, this.box, () => {
				this.water.destroy();
				this.box.body.setGravity(0, 0);
				this.box.body.setVelocityX(0);
				this.box.body.setVelocityY(-200);
				setTimeout(() => this.box.body.setGravity(0, 600), 1000);

			});
			// ------- AIR ------- //
			this.physics.overlap(this.air, this.rock, () => {
				this.air.destroy();
				this.rock.body.setVelocityX(150);
				setTimeout(() => this.rock.body.setVelocityX(0), 1200);
			});
			// ------- EARTH ------- //
			if (!this.player3.raisingEarth) {
				if (this.roundTimer > 200) {
					this.earthBox.destroy();
					this.earthBox.animation.destroy();
					this.rock.x = 720;
					this.enemy.visible = true;
					this.roundTimer = 0;
				}
			}
		}

		this.roundTimer++;


	}

}
