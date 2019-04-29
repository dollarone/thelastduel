import 'phaser'
import BootScene from './scenes/BootScene'
import GameScene from './scenes/GameScene'
import TitleScene from './scenes/TitleScene'
import LogoScene from './scenes/LogoScene'

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: false,
    parent: 'content',
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 800
            },
            debug: false
        }
    },
    scene: [
        BootScene,
        LogoScene,
        TitleScene,
        GameScene
    ]
}

const game = new Phaser.Game(config) // eslint-disable-line no-unused-vars
