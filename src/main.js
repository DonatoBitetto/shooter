import Phaser from './lib/phaser.js';
import Game from './scenes/Game.js';

export default new Phaser.Game(
    {
        type: Phaser.AUTO,
        width: 600,
        height: 600,
        backgroundColor: '#4488aa',
        scene: Game,
        physics: {
            default : 'arcade',
            debug: true
        }
    }
)