export default class Bullet extends Phaser.GameObjects.Image {

    constructor(scene, x, y, image){
        super(scene, x, y, image);
        scene.add.existing(this);
        this.scale = 0.3;
        scene.bullets.add(this);
    }
    
}