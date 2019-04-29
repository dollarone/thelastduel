class TitleScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'TitleScene'
        })
    }
    preload() {
        
    }
    create() {
        this.music = this.sound.add('theme')
        this.music.play({
            loop: true
        })
        this.scene.bringToTop()
        let back = this.add.image(0, 0, 'back')
        back.setOrigin(0)
        let title = this.add.image(0, 0, 'title')
        title.setOrigin(0)
        this.registry.set('restartScene', false)

        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)

        this.input.on('pointerdown', () => {
            this.startGame()
        })
        let titleText = this.add.text(330, 540, "Click to start game", { fontSize: '32px', fill: '#fff' });
    }

    update(time, delta) {
        if (this.registry.get('restartScene')) {
            this.restartScene()
        }
        if (this.startKey.isDown) {
            this.startGame()
        }
    }

    startGame() {
        this.scene.stop('GameScene')
        this.scene.start('GameScene')
    }

    restartScene() {
        this.scene.stop('GameScene')
        this.scene.launch('GameScene')
        this.scene.bringToTop()

        this.registry.set('restartScene', false)
    }
}

export default TitleScene
