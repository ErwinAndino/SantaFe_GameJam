export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key)
        this.cursors = scene.input.keyboard.createCursorKeys();

        this.flying = false;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);

    }

    update(dt) {
        this.walking();
        this.jumping();
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

        if (cursors.left.isDown) vx -= 1;
        if (cursors.right.isDown) vx += 1;

        if (vx !== 0) {
            const len = Math.sqrt(vx * vx);
            vx = (vx / len) * speed;
        }

        this.body.setVelocityX(vx);
    }
    jumping() {
        if ((this.cursors.up.isDown) && (this.body.blocked.down)) this.body.setVelocityY(-350);
        if ((this.cursors.down.isDown) && (!this.body.blocked.down)) this.body.setVelocityY(this.body.velocity.y += 10);

    }

    hit() {
        this.flying = true;
        console.log("chocado")
        if (this.body.x > 960) {
            this.body.setVelocityX(-500)
        } else {
            this.body.setVelocityX(500)
        }
        this.body.setVelocityY(-500)
    }

}