let carCounter = 0;

export class Car extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key)
        this.initialX = x;
        this.initialY = y;
        this._carId = ++carCounter
        this.direction = 1;

        console.log(`%cse CREO car id: ${this._carId}`, "color: aqua")
        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.body.setAllowGravity(false);
        this.setActive(false);
        this.setVisible(false);
        this.setScale(0.5);
    }

    activate(num, skin) {
        console.log(`%cACTIVANDO id ${this._carId}`, "color: orange")
        this.setTexture(skin);
        this.body.setSize(this.width * 0.8, this.height * 0.8);
        this.body.setOffset(this.width * 0.1, this.height * 0.2);
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;
        this.initialX = num;


    }

    place(num) {
        this.direction = num;
        this.setPosition(this.initialX, this.initialY)
        this.body.setAllowGravity(true)
        this.body.setVelocityX(num === 0 ? 200 : -200)
        if (num === 0) this.flipX = false;
        if (num === 1) this.flipX = true;
    }

    deactivate() {
        this.setActive(false);
        this.setVisible(false);
        this.body.enable = false;
        console.log(`%cSe desactivo car id: ${this._carId}`, "color: red")
    }

    update() {
        if (this.x < -120 || this.x > 2050) this.deactivate();

        this.body.setVelocityX(this.direction === 0 ? 200 : -200)
    }



}