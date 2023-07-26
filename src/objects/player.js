import Gun from './weapons/Gun.js';
import Shootgun from './weapons/Shootgun.js';

export default class Player extends Phaser.Physics.Arcade.Image {
    health = 100;
    speed = 100;
    weapon;

    constructor(scene, x, y, image){
        super(scene, x, y, image);

        this.weapon = new Gun(scene,x,y);

        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        let w = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        w.on('down', ()=>{
            this.y = this.setVelocityY(-this.speed).y;
        });
        w.on('up', ()=>{
            this.setVelocityY(0);
        });

        let s = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        s.on('down', ()=>{
            this.setVelocityY(this.speed);
        });
        s.on('up', ()=>{
            this.setVelocityY(0);
        });

        let a = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        a.on('down', ()=>{
            this.setVelocityX(-this.speed);
        });
        a.on('up', ()=>{
            this.setVelocityX(0);
        });

        let d = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        d.on('down', ()=>{
            this.setVelocityX(this.speed);
        });
        d.on('up', ()=>{
            this.setVelocityX(0);
        });
        scene.input.on('pointermove',(pointer)=>{
            this.setRotation(Phaser.Math.Angle.Between(this.x,this.y,pointer.worldX,pointer.worldY));
        });
        scene.input.on('pointerdown', (pointer) => {
            this.weapon.shoot(pointer);
        });
    }

}