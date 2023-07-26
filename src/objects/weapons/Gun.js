import Weapon from "./Weapon.js";
import Bullet from "./Bullet.js";

export default class Gun extends Weapon{

    constructor(scene){
        super(scene);

        this.demage = 1;
        this.range = 2000;
    }

    shoot(pointer){
        let mainBullet = new Bullet(this.scene,this.scene.player.x,this.scene.player.y,'player');
        this.scene.physics.moveTo(mainBullet, pointer.worldX,pointer.worldY, 200);
        mainBullet.scale = 0.3;
        setTimeout(() => mainBullet.destroy(), this.range);
    }
}