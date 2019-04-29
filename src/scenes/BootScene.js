class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        })
    }
    preload() {
        const progress = this.add.graphics()

        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            progress.clear()
            progress.fillStyle(0xffffff, 1)
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60)
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            progress.destroy()
            this.scene.start('LogoScene')
        })

        this.load.image('title', 'assets/images/title.png')
        this.load.image('back', 'assets/images/back.png')
        this.load.image('ships', 'assets/images/ships2.png')
        this.load.image('shield1', 'assets/images/shield1.png')

        this.load.image('cardback', 'assets/images/cards/cardback.png')
        this.load.image('emp', 'assets/images/cards/emp.png')
        this.load.image('bomb', 'assets/images/cards/bomb.png')
        this.load.image('fusion', 'assets/images/cards/fusion.png')
        this.load.image('laser', 'assets/images/cards/laser.png')
        this.load.image('rocket', 'assets/images/cards/rocket.png')
        this.load.image('flares', 'assets/images/cards/flares.png')
        this.load.image('shield', 'assets/images/cards/shield.png')
        this.load.image('shieldcharger', 'assets/images/cards/shieldcharger.png')

        this.load.spritesheet('skip', 'assets/images/button2.png', {
            frameWidth: 128,
            frameHeight: 64
        })

        this.load.spritesheet('logo-tiles', 'assets/images/logo-tiles.png', {
            frameWidth: 17,
            frameHeight: 16
        })

        this.load.audio('dollarone', [
            'assets/audio/dollarone.mp3'
        ])
        this.load.audio('theme', [
            'assets/music/speis.ogg'
        ])

    }
}

export default BootScene