import { Trash } from '../classes/trash';
export class TrashSpawner {
    constructor(scene) {
        this.scene = scene;
        this.timer = 5000;
        this.trashList = scene.physics.add.group({
            classType: Trash,
            runChildUpdate: true,
            maxSize: 30
        });
    }
    spawn() {
        const randomVelocity = Phaser.Math.Between(100, 300)
        const randomX = Phaser.Math.Between(500, 1700)
        const randomSkin = Phaser.Math.Between(1, 3);
        let skin = ""
        if (randomSkin === 1) skin = "beer"
        if (randomSkin === 2) skin = "trash"
        if (randomSkin === 3) skin = "can"
        const trash = this.trashList.get(randomX, 360, skin);
        if (!trash) {
            console.log("trash no existe  no se que hiciste mal")
        }
        if (trash) {
            console.log("intentando activar trash!");
            trash.activate(randomX, skin);
            trash.place(randomVelocity);
        }
    }

    update(dt) {
        this.timer += dt;
        if (this.timer >= 5000) {
            this.timer = 0;
            this.spawn()
        }
    }
}