export default class Enemy extends Phaser.GameObjects.Image {

    health = 5;

    constructor(scene, x, y, image){
        super(scene, x, y, image);
        scene.add.existing(this);
        scene.enemies.add(this);
    }

}