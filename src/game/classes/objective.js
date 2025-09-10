export class Objective extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key)

        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
    }

    move(minX, maxX) {
        this.minX = minX + 60;
        this.maxX = maxX - 60;

        this._moveTween();
    }

    _moveTween() {
        const target = Phaser.Math.Between(this.minX, this.maxX);

        const duration = Phaser.Math.Between(2000, 3000);

        const easings = [
            'Linear', 'Sine.easeIn', 'Sine.easeOut', 'Sine.easeInOut',
            'Quad.easeIn', 'Quad.easeOut', 'Quad.easeInOut',
            'Cubic.easeIn', 'Cubic.easeOut', 'Cubic.easeInOut'
        ];
        const ease = Phaser.Utils.Array.GetRandom(easings);

        this.scene.tweens.add({
            targets: this,
            x: target,
            duration: duration,
            ease: ease,
            onComplete: () => {
                // al terminar, llamar de nuevo para moverse a otro X
                this._moveTween();
            },
        });
    }
}
