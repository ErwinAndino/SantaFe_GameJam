export class MusicManager extends Phaser.Scene {
    constructor() {
        super({ key: 'MusicManager' }); // activa automticamente
    }

    preload() {
        this.load.setPath('assets');
        this.load.audio("music", "music.ogg")
    }
    create() {
        // Msica de fondo
        this.musicaFondo = this.sound.add('music', {
            loop: true,
            volume: 0.3
        });

        this.musicaFondo.play();
    }
}