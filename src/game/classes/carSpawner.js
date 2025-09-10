import { Car } from '../classes/car';
export class CarSpawner {
    constructor(scene, bridge, player) {
        this.bridge = bridge;
        this.scene = scene;
        this.player = player;
        this.timer = 5000;
        this.carList = scene.physics.add.group({
            classType: Car,
            runChildUpdate: true,
            maxSize: 30
        });

        this.horn1Sound = this.scene.sound.add("horn1", { volume: 0.5 });
        this.carAmbience = this.scene.sound.add("carAmbience", { volume: 0.2 }).play();
    }
    spawn() {
        const numero = Math.random() > .5 ? 1 : 0;
        const numero2 = Phaser.Math.Between(1, 3);
        let skin = ""
        if (numero2 === 1) skin = "auto1"
        if (numero2 === 2) skin = "auto2"
        if (numero2 === 3) skin = "auto3"
        const car = this.carList.get(numero === 0 ? -20 : 1980, 360, skin);
        if (!car) {
            console.log("car no existe negro no se que hiciste mal")
        }
        if (car) {
            this.horn1Sound.setRate(Phaser.Math.FloatBetween(.8, 1.2))
            this.horn1Sound.play()
            console.log("intentando activar!");
            car.activate(numero === 0 ? -20 : 1980, skin);
            car.place(numero);
            this.scene.physics.add.collider(this.bridge, car);
            this.scene.physics.add.overlap(this.player, car, () => { this.player.hit() });
            if (numero === 2) car.flipX = true
        }
    }

    update(dt) {
        this.timer += dt;
        this.scoreModifier = this.scene.registry.get("score");
        this.limit = Math.max(1000, 8000 - (this.scoreModifier * 500))
        if (this.timer >= this.limit) {
            this.timer = 0;
            this.spawn()
        }
    }
}