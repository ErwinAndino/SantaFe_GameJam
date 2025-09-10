// MainMenu.js
export class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
    }

    create() {
        // Fondo
        this.add.image(960, 540, 'background');
        // Titulo
        this.add.text(960, 500, 'SABALERO SIMULATOR', {
            fontSize: '120px',
            fontFamily: 'NeonCity',
            color: '#ffffff',
            stroke: "#F527EE", strokeThickness: 8,
            align: "center"
        }).setOrigin(0.5);

        this.add.text(960, 600, 'Hecho por Erwin Andino y Furlan Facundo', {
            fontSize: '50px',
            fontFamily: 'NeonCity',
            color: '#ffffff',
            stroke: "#ffa703ff", strokeThickness: 8,
            align: "center"
        }).setOrigin(0.5);

        this.add.text(960, 900, 'Presioná Espacio para Jugar', {
            fontSize: '50px',
            fontFamily: 'NeonCity',
            color: '#ffffff',
            stroke: "#e7431aff", strokeThickness: 8,
            align: "center"
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