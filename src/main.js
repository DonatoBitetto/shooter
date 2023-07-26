import Phaser from './lib/phaser.js';
import Game from './scenes/Game.js';

export default new Phaser.Game(
    {
        type: Phaser.AUTO,
        parent: 'game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        backgroundColor: '#4488aa',
        scene: Game,
        physics: {
            default : 'arcade',
            arcade: {
                debug: true
            }
        }
    }
)