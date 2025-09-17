export class FishBarInner extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key)

        this.speed = 6
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.scene = scene;

        console.log(`%c Limites barra chica: ${this.getBounds().right} , ${this.getBounds().left}`, "color: aqua")

        this.fishMiniGame = false;
    }
    update(dt) {

    }

    activate() {
        this.setVisible(true);
        this.fishMiniGame = true;
    }

    deactive() {
        this.setVisible(false);
        this.fishMiniGame = false;
    }

}