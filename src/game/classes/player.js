import { Fish } from '../classes/fish';
export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, trashSpawner, fishBar, fishBarInner) {
        super(scene, x, y, key)
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.trashSpawner = trashSpawner;
        this.flying = false;
        this.isFishing = false;
        this.lastTimeHitted = 0;
        this.hitCooldown = 2000;
        this.scene = scene;
        this.isActuallyFishing = false;
        this.actualTrash = null;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);


        //fishing hook and line
        this.fish = new Fish(this.scene, 960, 0, "hook", this);
        this.fish.setVisible(false);

        this.rope = this.scene.add.graphics();
        this.rope.setDepth(71)

        this.scene.physics.add.overlap(this.fish, this.trashSpawner.trashList, (fish, trash) => {
            fish.reelIn(trash);
        });

        //fishbar
        this.fishBar = fishBar;
        this.fishBarInner = fishBarInner;
    }

    update(dt) {
        this.drawFishRope();
        this.walking();
        this.jumping();
        this.fishing();
        this.fish.update()
        this.lastTimeHitted = this.lastTimeHitted + dt;
        if (this.lastTimeHitted > this.hitCooldown) {
            this.clearTint();
        }
        this.fishBarInner.update();
    }

    walking() {
        if (this.body.blocked.down) {
            this.flying = false;
        }
        if (this.flying) {
            return
        }
        const cursors = this.cursors;
        const speed = 200

        let vx = 0;

        if (cursors.left.isDown) {
            vx -= 1;
            this.setFrame("1");
        }
        if (cursors.right.isDown) {
            vx += 1;
            this.setFrame("0");
        }

        if (vx !== 0) {
            const len = Math.sqrt(vx * vx);
            vx = (vx / len) * speed;
        }

        if (this.isFishing) {
            this.fish.move(vx)
        }
        this.body.setVelocityX(vx);
    }
    jumping() {
        if ((this.cursors.up.isDown) && (this.body.blocked.down)) this.body.setVelocityY(-350);
        if ((this.cursors.down.isDown) && (!this.body.blocked.down)) this.body.setVelocityY(this.body.velocity.y += 10);

    }

    hit() {
        this.flying = true;
        if (this.body.x > 960) {
            this.body.setVelocityX(-500)
        } else {
            this.body.setVelocityX(500)
        }
        this.body.setVelocityY(-500)

        if (this.lastTimeHitted > this.hitCooldown) {
            this.lastTimeHitted = 0;
            this.setTint(0xF59527);
            if (this.scene.lives === 3) {
                this.scene.lives = this.scene.lives - 1;
                this.scene.corazon3.destroy();
            } else if (this.scene.lives === 2) {
                this.scene.lives = this.scene.lives - 1;
                this.scene.corazon2.destroy();
            } else if (this.scene.lives === 1) {
                this.scene.lives = this.scene.lives - 1;
                this.scene.corazon1.destroy();
                console.log("%cPerdiste", "color: red")
            }
        }
    }

    fishing() {
        if (this.cursors.space.isDown && !this.isFishing) {
            this.isFishing = true;
            console.log("ESPACIO")
            this.fish.activate(this.body.x, this.body.y);
        }
    }

    resetFishing() {
        this.isFishing = false;
    }

    fishStart() {
        this.fishBar.setVisible(true);
        this.fishBarInner.activate();
    }


    drawFishRope() {
        this.rope.clear();
        this.rope.lineStyle(2, 0xffffff, this.isFishing ? 1 : 0);
        this.rope.beginPath();
        this.rope.moveTo(this.x + 18, this.y + 20)
        this.rope.lineTo(this.fish.x, this.fish.y - 20)
        this.rope.strokePath()
    }
}