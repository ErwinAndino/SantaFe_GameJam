export class Fish extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, player, trashSpawner) {
        super(scene, x, y, key)
        this.player = player;
        this.trashSpawner = trashSpawner
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
    }

    update() {
        this.outOfWorld();

    }

    activate(x, y) {
        this.setPosition(x, y)
        this.setVisible(true)
        this.setVelocityY(400)
    }

    outOfWorld() {
        if (this.y + this.height / 2 >= this.scene.physics.world.bounds.height) {
            this.setVisible(false)
            this.player.resetFishing();
        }
    }

    hit() {

    }

    reelIn(trash) {
        trash.deactivate();
        this.player.scorePoint();
    }

}
