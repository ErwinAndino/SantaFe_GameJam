import { Scene } from 'phaser';
import { Player } from '../classes/player';
import { Bridge } from '../classes/bridge';
import { CarSpawner } from '../classes/carSpawner';
import { TrashSpawner } from '../classes/trashSpawner.js';
import { FishBar } from '../classes/fishBar';
import { FishBarInner } from '../classes/fishBarInner';
import { Objective } from '../classes/objective';


export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.add.image(960, 540, 'background');
        this.add.image(960, 540, 'puenteAtras').setAlpha(0.8);
        this.add.image(1500, 250, "beer").setDepth(0.3).setAlpha(0.5);
        // this.add.image(1200, 231, "sol").setScale(0.3).setAlpha(0.5);

        this.corazon1 = this.add.image(50, 40, "corazon").setScale(2).setDepth(100)
        this.corazon2 = this.add.image(110, 40, "corazon").setScale(2).setDepth(100)
        this.corazon3 = this.add.image(170, 40, "corazon").setScale(2).setDepth(100)
        this.corazon4 = this.add.image(230, 40, "corazon").setScale(2).setDepth(100)
        this.corazon5 = this.add.image(290, 40, "corazon").setScale(2).setDepth(100)
        this.lives = 5;

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
        this.trashSpawner = new TrashSpawner(this);

        //BARRA DE PESCA

        this.fishBar = new FishBar(this, 960, 70, "fishingBar");
        this.fishBarInner = new FishBarInner(this, 960, 70, "fishingBarInner", this);
        this.fishingBarProgress = this.add.image(624, 94, "fishingProgressBar").setScale(.2, 8).setDepth(120).setOrigin(0, 0).setVisible(false);


        this.player = new Player(this, 960, 340, "character", this.trashSpawner, this.fishBar, this.fishBarInner);
        this.carSpawner = new CarSpawner(this, this.bridge, this.player);

        this.add.image(365, 700, 'cartel').setOrigin(0.5).setDepth(69).setScale(0.75);
        this.add.text(365, 700, 'Santa Fe', {
            fontFamily: 'NeonCity', fontSize: 70, color: '#ffffff',
            stroke: '#F527EE', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(70);

        this.score = 0;
        this.registry.set("score", this.score);

        this.scoreText = this.add.text(1800, 50, `Puntos: ${this.score}`, {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(1, 0).setDepth(70);


        this.add.image(960, 540, 'puenteAdelante').setDepth(50);

        this.player.setScale(3)
        this.bridge.setScale(8, 1);
        this.physics.add.collider(this.bridge, this.player);
        this.fishBar.setScale(14, 8);
        this.fishBar.setDepth(80);
        this.fishBarInner.setScale(12, 8);
        this.fishBarInner.setDepth(81);
        this.fishBar.setVisible(false);
        this.fishBarInner.setVisible(false);
        // this.objective.setScale(0.4);
        // this.objective.setDepth(82);
        // this.objective.setVisible(false);

        this.actualTrash = null;
        this.overlappingBar = false
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(t, dt) {
        this.player.update(dt);
        this.carSpawner.update(dt);
        this.trashSpawner.update(dt);

        if (this.player.isActuallyFishing) {
            if (!this.fishBar.hasAnItem) {
                this.actualTrash = this.fishBar.addTrash(this.player.actualTrash)
                if (this.actualTrash) {
                    this.actualTrash.move(this.fishBar.getBounds().left, this.fishBar.getBounds().right)
                    this.fishingBarProgress.scaleX = .2;
                }
            }
        }


        if (this.actualTrash && Phaser.Geom.Intersects.RectangleToRectangle(this.actualTrash.getBounds(), this.fishBarInner.getBounds())) {
            this.overlappingBar = true;
        } else {
            this.overlappingBar = false;
        }

        if (this.overlappingBar) {
            if (this.fishingBarProgress.getBounds().right < 1300) {
                this.fishingBarProgress.setVisible(true);
                this.fishingBarProgress.scaleX += 0.02;
            } else if (this.fishingBarProgress.getBounds().right >= 1300) {
                //LOGICA DE CONSEGUIR PUNTOS
                this.player.fish.reelOut(this.player.actualTrash);
                this.tweens.killTweensOf(this.actualTrash)
                this.actualTrash.destroy();
                this.actualTrash = null;
                this.fishBar.setVisible(false);
                this.fishBarInner.deactive();
                this.fishingBarProgress.setVisible(false)
                this.fishBar.hasAnItem = false;
                this.fishBar.actualTrash = false;
                this.fishBar.actualTrashTexture = null;

                this.score += 1;
                this.registry.set("score", this.score);
                this.scoreText.setText(`Puntos: ${this.score}`);
            }
        } else {
            if (this.fishingBarProgress.scaleX < .2) {
                this.fishingBarProgress.setVisible(false);
            } else {
                this.fishingBarProgress.scaleX -= 0.02;
            }
        }




        this.moveInnerBar();
    }

    moveInnerBar() {
        if (this.fishBarInner.fishMiniGame) {


            this.dir = 0;
            this.cursors.space.isDown ? this.dir = 1 : this.dir = -1;

            if (this.fishBarInner.getBounds().right > this.fishBar.getBounds().right - 30) {
                if (this.fishBarInner.body.velocity.x < 50) {
                    this.fishBarInner.setVelocityX(0)
                } else {
                    this.fishBarInner.setVelocityX((this.fishBarInner.body.velocity.x / 4) * (-1))
                }
                this.fishBarInner.setPosition(this.fishBar.getBounds().right - 30 - (this.fishBarInner.getBounds().width / 2), this.fishBarInner.y)
            }

            if (this.fishBarInner.getBounds().left < this.fishBar.getBounds().left + 30) {
                if (this.fishBarInner.body.velocity.x > -50) {
                    this.fishBarInner.setVelocityX(0)
                } else {
                    this.fishBarInner.setVelocityX((this.fishBarInner.body.velocity.x / 4) * (-1))
                }
                this.fishBarInner.setPosition(this.fishBar.getBounds().left + 30 + (this.fishBarInner.getBounds().width / 2), this.fishBarInner.y)
            }

            this.fishBarInner.setVelocityX(this.fishBarInner.body.velocity.x + (this.fishBarInner.speed * this.dir))
        }
    }
}
