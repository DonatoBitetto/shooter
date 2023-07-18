import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene{
    player
    enemies
    bullets

    constructor(){
        super('game')
    }

    addEnemy(){
        let x = Phaser.Math.Between(this.player.x - 300, this.player.x + 300);
        let y = Phaser.Math.Between(this.player.y - 300, this.player.y + 300);
        if ((x > this.player.x + 100 || x < this.player.x - 100) || (y > this.player.y + 100 || y < this.player.y - 100)){
           let enemy = this.enemies.create(x,y, 'enemy');
           this.physics.accelerateToObject(enemy,this.player)
        }
    }


    preload(){
        this.load.image('player','assets/player.png');
        this.load.image('bullet','assets/player.png');
        this.load.image('enemy','assets/enemy.png');
    }

    create(){
        this.player = this.physics.add.image(300,300,'player');
        this.bullets = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.player.speed = 100;

        this.input.on('pointerdown', (pointer) => {
            let bullet = this.bullets.create(this.player.x,this.player.y, 'bullet');
            bullet.scale = 0.3;
            this.physics.moveTo(bullet, pointer.x,pointer.y, 200);
            setTimeout(() => bullet.destroy(), 2000);
        });

        this.time.addEvent({
            callback: this.addEnemy,
            callbackScope: this,
            delay: 1000, // 1000 = 1 second
            loop: true
        })


        let w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        w.on('down', ()=>{
            this.player.setVelocityY(-this.player.speed);
        });
        w.on('up', ()=>{
            this.player.setVelocityY(0);
        });

        let s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        s.on('down', ()=>{
            this.player.setVelocityY(this.player.speed);
        });
        s.on('up', ()=>{
            this.player.setVelocityY(0);
        });

        let a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        a.on('down', ()=>{
            this.player.setVelocityX(-this.player.speed);
        });
        a.on('up', ()=>{
            this.player.setVelocityX(0);
        });

        let d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        d.on('down', ()=>{
            this.player.setVelocityX(this.player.speed);
        });
        d.on('up', ()=>{
            this.player.setVelocityX(0);
        });
    }

    update(){
        this.physics.collide(this.bullets,this.enemies,(bullet,enemy)=>{
            bullet.destroy();
            enemy.destroy();
        });
        
        this.physics.collide(this.player,this.enemies, ()=>{
            this.scene.restart()
        });
    }
}