import { Trash } from "./trash";

export class Fish extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, player) {
        super(scene, x, y, key)
        this.player = player;
        this.scene = scene;

        this.isActive = false;
        this.setScale(.05)
        this.setDepth(71)
        this.setPosition(this.player.body.x, this.player.body.y)
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(false);
        this.body.setAllowGravity(false);

        this.pointSound = this.scene.sound.add("point", { volume: 0.5 });
    }

    update() {
        this.outOfWorld();

    }

    move(vx) {
        if (this.isActive) {
            if (vx > 0) {
                if (this.player.body.center.x > this.body.x) {
                    this.setVelocityX(vx / 2)
                }
            } else if (vx < 0) {
                if (this.player.body.center.x < this.body.x) {
                    this.setVelocityX(vx / 2)
                }
            }
        } else {
            this.setVelocity(0)
        }
    }

    activate() {
        this.setPosition(this.player.body.x, this.player.body.y)

        this.setActive(true)

        this.isActive = true;

        this.setVisible(true)

        this.setVelocityY(400)
    }

    desactivate() {
        this.setActive(false)

        this.isActive = false;

        this.setVisible(true)

        this.setVelocityY(0)
    }

    outOfWorld() {
        if (this.body.y >= 1080) {
            this.setActive(false);
            this.setVisible(false)
            this.setVelocity(0)
            this.setPosition(this.player.body.x, 0)
            console.log("reseting hook")
            this.player.resetFishing();
        }
    }

    hit() {

    }

    reelIn(trash) {
        if (this.isActive) {
            this.trash = trash;
            this.trash.paused = true;
            if (this.trash.growTimer) {
                this.trash.growTimer.remove()
            }
            this.desactivate()
            this.player.actualTrash = new Trash(trash.scene, trash.x, trash.y, trash.key, true);
            this.player.isActuallyFishing = true;
            this.player.fishStart();
        }
    }

    reelOut() {
        this.pointSound.setRate(Phaser.Math.FloatBetween(.8, 1.2))
        this.pointSound.play()


        this.scene.tweens.add({
            targets: this.trash,
            y: this.trash.y - 30,
            duration: 200,
            ease: "Sine.out",
            yoyo: true,
            repeat: 1,
            onComplete: () => {

                this.scene.tweens.add({
                    targets: this.trash,
                    alpha: 0,
                    duration: 400,
                    ease: "Linear",
                    onComplete: () => {
                        this.trash.paused = false;
                        this.trash.deactivate()
                    }
                })
            }
        })
        this.player.actualTrash.destroy();
        this.player.actualTrash = null;
        this.player.isActuallyFishing = false;
        this.setActive(false);
        this.setVisible(false)
        this.setVelocity(0)
        this.setPosition(this.player.body.x, 0)
        console.log("reseting hook")
        this.player.resetFishing();
    }

}
