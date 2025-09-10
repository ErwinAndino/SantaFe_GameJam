import { Objective } from "./objective";

export class FishBar extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key)

        this.scene = scene;
        this.hasAnItem = false;
        this.actualTrash = false;
        this.actualTrashTexture = null;

        scene.add.existing(this);
    }

    addTrash(trash) {
        this.hasAnItem = true;
        this.actualTrashTexture = `${trash.texture.key}_`;

        this.actualTrash = new Objective(this.scene, Phaser.Math.Between(this.getBounds().left + 60, this.getBounds().right - 60), this.y - 15, this.actualTrashTexture).setDepth(120).setScale(.3)
        this.actualTrash.setVisible(true)

        return this.actualTrash;
    }
}