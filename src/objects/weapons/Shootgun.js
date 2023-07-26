import Weapon from "./Weapon.js";
import Bullet from './Bullet.js';
import Phaser from '../../lib/phaser.js';

export default class Shootgun extends Weapon{

    

    constructor(scene){
        super(scene);

        this.demage = 2;
        this.range = 500;
    }

    shoot(pointer){
        let degree = (Math.PI / 180) * 15;
        let circle = new Phaser.Geom.Circle(this.scene.player.x,this.scene.player.y,10);
        let mainBullet = new Bullet(this.scene,this.scene.player.x,this.scene.player.y,'player');
        let mainBulletAngle = this.scene.physics.moveTo(mainBullet, pointer.worldX,pointer.worldY, 200);
        mainBullet.scale = 0.3;
        setTimeout(() => mainBullet.destroy(), this.range);

        //genera proiettile destro
        for (let i = 1; i <= 2; i++) {
            let point = Phaser.Geom.Circle.CircumferencePoint(circle, mainBulletAngle + (degree * i));
            let bullet = new Bullet(this.scene,this.scene.player.x,this.scene.player.y,'player');
            bullet.scale = 0.3;
            this.scene.physics.moveTo(bullet, point.x,point.y, 200);
            setTimeout(() => bullet.destroy(), this.range);
        }   

        //genera proiettile sinistro
        for (let i = 1; i <= 2; i++) {
            let point = Phaser.Geom.Circle.CircumferencePoint(circle, mainBulletAngle + (degree * -i));
            let bullet = new Bullet(this.scene,this.scene.player.x,this.scene.player.y,'player');
            bullet.scale = 0.3;
            this.scene.physics.moveTo(bullet, point.x,point.y, 200);
            setTimeout(() => bullet.destroy(), this.range);
        }    
    }

}