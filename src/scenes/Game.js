import Phaser from '../lib/phaser.js';

import Enemy from '../objects/Enemy.js';
import Player from '../objects/Player.js';

export default class Game extends Phaser.Scene{
    player;
    enemies;
    bullets;
    score;
    scoreText;
    healthText;

    constructor(){
        super('game')
    }

    init(){
        this.score = 0;
        this.bullets = this.physics.add.group();
        this.enemies = this.physics.add.group();
    }

    addEnemy(){
        let x = Phaser.Math.Between(this.player.x - 300, this.player.x + 300);
        let y = Phaser.Math.Between(this.player.y - 300, this.player.y + 300);
        if ((x > this.player.x + 100 || x < this.player.x - 100) || (y > this.player.y + 100 || y < this.player.y - 100)){
           let enemy = new Enemy(this, x, y, 'enemy');         
        }
    }


    preload(){
        this.load.image('player','assets/survivor1_gun.png');
        this.load.image('enemy','assets/zombie.png');
        this.load.image('bullet','assets/player.png');
        this.load.image('tiles','assets/tilesheet_complete.png');
        this.load.tilemapTiledJSON('tilemap','assets/map.json');
    }

    create(){
        this.map = this.make.tilemap({ key: 'tilemap'});
        this.map.addTilesetImage('tiles');
        this.map.createLayer('Background','tiles');

        
        this.player = new Player(this, 512, 384, 'player');
        this.player.setCollideWorldBounds(true)

        this.time.addEvent({
            callback: this.addEnemy,
            callbackScope: this,
            delay: 1000, // 1000 = 1 second
            loop: true
        });

        this.scoreText = this.add.text(10,10, `Score: ${this.score}`, {color: '#ffffff',fontSize: 24});
        this.healthText = this.add.text(0, 0, `Health: ${this.player.health}`, {color: '#ffffff',fontSize: 24});
        this.healthText.setOrigin(0.5,1);
        this.healthText.setPosition(this.game.config.width/2,this.game.config.height);
        
    }

    update(){
        this.physics.collide(this.bullets,this.enemies,(bullet,enemy)=>{
            this.scoreText.setText(`Score: ${this.score}`);

            bullet.destroy();
            enemy.health -= this.player.weapon.demage;

            if(enemy.health <= 0){
                this.score++;
                enemy.destroy();
            }
        });
        
        this.physics.collide(this.player,this.enemies, ()=>{
            this.healthText.setText(`Health: ${this.player.health}`);

            this.player.health--;

            if(this.player.health <= 0){
                this.scene.restart();
            }
        });
        
        this.enemies.children.iterate(enemy=>{
            let rotation = this.physics.accelerateToObject(enemy,this.player);
            enemy.setRotation(rotation)
        });

        
    }
}