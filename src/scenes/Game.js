import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene{
    player
    enemies

    constructor(){
        super('game')
    }

    preload(){
        this.load.image('player','assets/player.png');
    }

    create(){
        this. player = this.physics.add.image(300,300,'player');
        this.player.body.updateFromGameObject();
    }
}