import { Trash } from '../classes/trash';
export class TrashSpawner {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.timer = 5000;
        this.trashList = scene.physics.add.group({
            classType: Trash,
            runChildUpdate: true,
            maxSize: 30
        });
    }
    spawn() {
        const randomVelocity = Phaser.Math.Between(100, 300)
        const randomX = Phaser.Math.Between(300, 1600)
        const randomSkin = Phaser.Math.Between(1, 3);
        let skin = "beer"
        // if (randomSkin === 1) skin = "auto1"
        // if (randomSkin === 2) skin = "auto2"
        // if (randomSkin === 3) skin = "auto3"
        const trash = this.trashList.get(randomX, 360, skin);
        if (!trash) {
            console.log("trash no existe negro no se que hiciste mal")
        }
        if (trash) {
            console.log("intentando activar trash!");
            trash.activate(randomX, skin);
            trash.place(randomVelocity);
            // this.scene.physics.add.overlap(this.player, trash, () => { this.player.hit() });
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