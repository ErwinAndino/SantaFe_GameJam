let trashCounter = 0;

export class Trash extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key)
        this.initialX = x;
        this._trashId = ++trashCounter;

        console.log(`%cse CREO trasg id: ${this._trashId}`, "color: aqua")
        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.body.setAllowGravity(false);
        this.setActive(false);
        this.setVisible(false);
        this.setScale(0.5);
    }

    activate(num, skin) {
        console.log(`%cACTIVANDO trash id ${this._trashId}`, "color: orange")
        this.setTexture(skin);
        this.body.setSize(this.width, this.height);
        this.body.setOffset(0, 0);
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;
        this.initialX = num;


    }

    place(randomVelocity) {
        this.setPosition(this.initialX, 500);
        this.body.setVelocityY(randomVelocity);
    }

    deactivate() {
        this.setActive(false);
        this.setVisible(false);
        this.body.enable = false;
        console.log(`%cSe desactivo trash id: ${this._trashId}`, "color: red")
    }

    update(num) {
        if (this.y > 1200) this.deactivate();

        this.body.setVelocityY(num === 0 ? 200 : 100)
    }



}