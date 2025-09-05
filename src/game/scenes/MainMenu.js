import { Scene } from 'phaser';
import { Player } from '../classes/player';
import { Bridge } from '../classes/bridge';
import { CarSpawner } from '../classes/carSpawner';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        this.add.image(960, 540, 'background');
        this.add.image(960, 540, 'puenteAtras');
        this.add.image(800, 400, "beer")
        let g = this.add.graphics();
        g.fillStyle(0xffffff, 1);
        g.fillRect(0, 0, 36, 36);
        g.generateTexture("blanco", 36, 36);
        g.destroy(); // opcional, liberar memoria
        g = this.add.graphics();
        g.fillStyle(0x000000, 1);
        g.fillRect(0, 0, 36, 36);
        g.generateTexture("negro", 36, 36);
        g.destroy(); // opcional, liberar memoria

        this.bridge = new Bridge(this, 960, 480, "logo")
        this.player = new Player(this, 960, 340, "blanco");
        this.carSpawner = new CarSpawner(this, this.bridge, this.player);


        this.add.text(512, 460, 'Santa Fe', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
        this.add.image(960, 540, 'puenteAdelante').setDepth(50);

        this.bridge.setScale(4, 1);
        this.physics.add.collider(this.bridge, this.player);
    }

    update(t, dt) {
        this.player.update(dt);
        this.carSpawner.update(dt)

    }
}
