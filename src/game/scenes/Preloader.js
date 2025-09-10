import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(960, 540, 'background');
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.spritesheet("character", "character.png", {
            frameWidth: 14,
            frameHeight: 20,
        });
        this.load.image('beer', 'beer.png');
        this.load.image('beer_', 'beer_.png');
        this.load.image('trash', 'trash.png');
        this.load.image('trash_', 'trash_.png');
        this.load.image('can', 'can.png');
        this.load.image('can_', 'can_.png');
        this.load.image('puenteAtras', 'puente_atras.png');
        this.load.image('puenteAdelante', 'puente_adelante.png');
        this.load.image('auto1', 'auto_1.png');
        this.load.image('auto2', 'auto_2.png');
        this.load.image('auto3', 'auto_3.png');
        this.load.image('corazon', 'Heart.png');
        this.load.image('fishingBar', 'fishingBar.png');
        this.load.image('fishingBarInner', 'fishingBarInner.png');
        this.load.image('fishingProgressBar', 'fishingProgressBar.png');
        this.load.image('hook', 'hook.png');
        this.load.image('flyBug', 'flyBug.png');
        this.load.image('sol', 'sol2.png');
        this.load.image('cartel', 'cartel.png');
        this.load.audio("horn1", "horn_01.mp3")
        this.load.audio("carAmbience", "car_ambience.mp3")
        this.load.audio("hit", "hit.mp3")
        this.load.audio("point", "point_01.mp3")
        this.load.audio("death", "gameOver.mp3")
        this.load.audio("fish", "fish.mp3")

    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.launch("MusicManager")
        this.scene.start('Menu');
    }
}
