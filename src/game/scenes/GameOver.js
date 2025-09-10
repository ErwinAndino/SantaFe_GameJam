import { Scene } from 'phaser';

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        const img = this.add.image(960, 540, 'background');

        const fx = img.preFX.addColorMatrix();
        fx.grayscale(1);

        this.add.text(960, 450, 'Te Chocaron', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#800000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(960, 550, `Lograste ${this.registry.get("score")} ${this.registry.get("score") === 1 ? "punto" : "puntos"}!`, {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(960, 900, `Presioná Espacio para Reintentar`, {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.cameras.main.fadeOut(1000, 0, 0, 0);

            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('MainMenu');
            });
        }
    }
}
