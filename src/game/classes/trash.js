let trashCounter = 0;

export class Trash extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, adic = false) {
        super(scene, x, y, key)
        this.x = x;
        this.y = y;
        this.key = key;
        this.initialX = x;
        this._trashId = ++trashCounter;

        if (adic) {
            console.log(`%cADICIONAL!!!!!!!!!!`, "color: yellow")
        }

        console.log(`%cse CREO trasg id: ${this._trashId}`, "color: aqua")
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.scene = scene;
        this.body.setAllowGravity(false);
        this.setActive(false);
        this.setVisible(false);
        this.setScale(0.5);
        this.paused = false;
    }

    activate(num, skin) {
        console.log(`%cACTIVANDO trash id ${this._trashId}`, "color: orange")
        this.setTexture(skin);
        this.key = skin;
        this.body.setSize(this.width, this.height);
        this.body.setOffset(0, 0);
        this.setScale(.5)
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;
        this.initialX = num;

        if (this.growTimer) {
            this.growTimer.remove();
        }
        this.growTimer = this.scene.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {
                this.setScale(this.scale + 0.005);
            }
        });


    }

    place(randomVelocity) {
        this.setPosition(this.initialX, 500);
        this.body.setVelocityY(randomVelocity);
    }

    deactivate() {
        this.setActive(false);
        this.setVisible(false);
        this.body.enable = false;
        if (this.growTimer) {
            this.growTimer.remove()
        }
        this.setScale(.5)
        console.log(`%cSe desactivo trash id: ${this._trashId}`, "color: red")
    }

    update(num) {
        if (this.y > 1200) this.deactivate();

        if (this.paused) {
            this.setVelocityY(0);
            this.body.velocity.x = 0;
            this.body.acceleration.y = 0;
            this.body.acceleration.x = 0;
            this.body.angularVelocity = 0;
            this.body.moves = false;
        } else {
            this.body.moves = true;
            this.body.setVelocityY(num === 0 ? 200 : 100)
        }
    }



}