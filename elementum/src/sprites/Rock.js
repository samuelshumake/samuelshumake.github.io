export default class Rock extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, key) {
		super(scene, x, y, key);
	    scene.sys.updateList.add(this);
		scene.sys.displayList.add(this);

		scene.physics.world.enableBody(this, 0);
	    scene.physics.add.collider(this, scene.player);
		scene.physics.add.collider(this, scene.layer);
		scene.physics.add.collider(this, scene.enemyGroup);
		this.body.setGravity(0, 600);
		this.body.immovable = true;
		this.setScale(0.9, 1.2);

  }

}
