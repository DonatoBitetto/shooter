import Phaser from './lib/phaser.js';
import Game from './scenes/Game.js';

export default new Phaser.Game(
    {
        type: Phaser.AUTO,
        mode: Phaser.Scale.FIT,
        backgroundColor: '#4488aa',
        scene: Game,
        physics: {
            default : 'arcade',
            arcade: {
                debug: false
            }
        }
    }
)