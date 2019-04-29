class LogoScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'LogoScene'
        })
    }
    preload() {

    }
    create() {
        this.cameras.main.setBackgroundColor('#333333')
        this.scene.bringToTop()


        this.registry.set('restartScene', false)
        this.registry.set('attractMode', true)


        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)

        this.music = this.sound.add('dollarone')
        this.music.play({
            loop: false
        })


        let logo_top_x = this.sys.game.config.width/2 - 230
        let logo_top_y = this.sys.game.config.height/2 - 95
        let tile_space = 17

        this.platforms = this.add.group()

        this.createTile(logo_top_x+tile_space*4, logo_top_y+tile_space*0, 2)
        this.createTile(logo_top_x+tile_space*8, logo_top_y+tile_space*0, 2)
        this.createTile(logo_top_x+tile_space*10, logo_top_y+tile_space*0, 2)

        this.createTile(logo_top_x+tile_space*2, logo_top_y+tile_space*1, 0)
        this.createTile(logo_top_x+tile_space*3, logo_top_y+tile_space*1, 1)
        this.createTile(logo_top_x+tile_space*4, logo_top_y+tile_space*1, 2)
        this.createTile(logo_top_x+tile_space*5, logo_top_y+tile_space*1, 0)
        this.createTile(logo_top_x+tile_space*6, logo_top_y+tile_space*1, 1)
        this.createTile(logo_top_x+tile_space*7, logo_top_y+tile_space*1, 4)
        this.createTile(logo_top_x+tile_space*8, logo_top_y+tile_space*1, 2)
        this.createTile(logo_top_x+tile_space*10, logo_top_y+tile_space*1, 2)
        this.createTile(logo_top_x+tile_space*12, logo_top_y+tile_space*1, 0)
        this.createTile(logo_top_x+tile_space*13, logo_top_y+tile_space*1, 1)
        this.createTile(logo_top_x+tile_space*14, logo_top_y+tile_space*1, 2)
        this.createTile(logo_top_x+tile_space*15, logo_top_y+tile_space*1, 0)
        this.createTile(logo_top_x+tile_space*16, logo_top_y+tile_space*1, 2)
        this.createTile(logo_top_x+tile_space*17, logo_top_y+tile_space*1, 0)
        this.createTile(logo_top_x+tile_space*18, logo_top_y+tile_space*1, 1)
        this.createTile(logo_top_x+tile_space*19, logo_top_y+tile_space*1, 4)
        this.createTile(logo_top_x+tile_space*20, logo_top_y+tile_space*1, 1)
        this.createTile(logo_top_x+tile_space*21, logo_top_y+tile_space*1, 1)
        this.createTile(logo_top_x+tile_space*22, logo_top_y+tile_space*1, 4)
        this.createTile(logo_top_x+tile_space*23, logo_top_y+tile_space*1, 0)
        this.createTile(logo_top_x+tile_space*24, logo_top_y+tile_space*1, 1)
        this.createTile(logo_top_x+tile_space*25, logo_top_y+tile_space*1, 4)

        this.createTile(logo_top_x+tile_space*2, logo_top_y+tile_space*2, 2)
        this.createTile(logo_top_x+tile_space*4, logo_top_y+tile_space*2, 2)
        this.createTile(logo_top_x+tile_space*5, logo_top_y+tile_space*2, 2)
        this.createTile(logo_top_x+tile_space*7, logo_top_y+tile_space*2, 2)
        this.createTile(logo_top_x+tile_space*8, logo_top_y+tile_space*2, 2)
        this.createTile(logo_top_x+tile_space*10, logo_top_y+tile_space*2, 2)
        this.createTile(logo_top_x+tile_space*12, logo_top_y+tile_space*2, 2)
        this.createTile(logo_top_x+tile_space*14, logo_top_y+tile_space*2, 2)
        this.createTile(logo_top_x+tile_space*15, logo_top_y+tile_space*2, 2)
        this.createTile(logo_top_x+tile_space*17, logo_top_y+tile_space*2, 2)
        this.createTile(logo_top_x+tile_space*19, logo_top_y+tile_space*2, 2)
        this.createTile(logo_top_x+tile_space*20, logo_top_y+tile_space*2, 2)
        this.createTile(logo_top_x+tile_space*22, logo_top_y+tile_space*2, 2)
        this.createTile(logo_top_x+tile_space*23, logo_top_y+tile_space*2, 2)
        this.createTile(logo_top_x+tile_space*25, logo_top_y+tile_space*2, 5)

        this.createTile(logo_top_x+tile_space*2, logo_top_y+tile_space*3, 3)
        this.createTile(logo_top_x+tile_space*3, logo_top_y+tile_space*3, 1)
        this.createTile(logo_top_x+tile_space*4, logo_top_y+tile_space*3, 2)
        this.createTile(logo_top_x+tile_space*5, logo_top_y+tile_space*3, 3)
        this.createTile(logo_top_x+tile_space*6, logo_top_y+tile_space*3, 1)
        this.createTile(logo_top_x+tile_space*7, logo_top_y+tile_space*3, 5)
        this.createTile(logo_top_x+tile_space*8, logo_top_y+tile_space*3, 3)
        this.createTile(logo_top_x+tile_space*9, logo_top_y+tile_space*3, 2)
        this.createTile(logo_top_x+tile_space*10, logo_top_y+tile_space*3, 3)
        this.createTile(logo_top_x+tile_space*11, logo_top_y+tile_space*3, 2)
        this.createTile(logo_top_x+tile_space*12, logo_top_y+tile_space*3, 3)
        this.createTile(logo_top_x+tile_space*13, logo_top_y+tile_space*3, 1)
        this.createTile(logo_top_x+tile_space*14, logo_top_y+tile_space*3, 2)
        this.createTile(logo_top_x+tile_space*15, logo_top_y+tile_space*3, 2)
        this.createTile(logo_top_x+tile_space*17, logo_top_y+tile_space*3, 3)
        this.createTile(logo_top_x+tile_space*18, logo_top_y+tile_space*3, 1)
        this.createTile(logo_top_x+tile_space*19, logo_top_y+tile_space*3, 5)
        this.createTile(logo_top_x+tile_space*20, logo_top_y+tile_space*3, 2)
        this.createTile(logo_top_x+tile_space*22, logo_top_y+tile_space*3, 2)
        this.createTile(logo_top_x+tile_space*23, logo_top_y+tile_space*3, 3)
        this.createTile(logo_top_x+tile_space*24, logo_top_y+tile_space*3, 1)
        this.createTile(logo_top_x+tile_space*25, logo_top_y+tile_space*3, 2)


        // prod
        //this.createTile(logo_top_x+tile_space*19, logo_top_y+tile_space*4, 6)

        this.createTile(logo_top_x+tile_space*11, logo_top_y+tile_space*5, 2)
        this.createTile(logo_top_x+tile_space*17, logo_top_y+tile_space*5, 2)
        this.createTile(logo_top_x+tile_space*19, logo_top_y+tile_space*5, 6)

        this.createTile(logo_top_x+tile_space*1, logo_top_y+tile_space*6, 1)
        this.createTile(logo_top_x+tile_space*2, logo_top_y+tile_space*6, 1)
        this.createTile(logo_top_x+tile_space*3, logo_top_y+tile_space*6, 4)
        this.createTile(logo_top_x+tile_space*4, logo_top_y+tile_space*6, 0)
        this.createTile(logo_top_x+tile_space*5, logo_top_y+tile_space*6, 2)
        this.createTile(logo_top_x+tile_space*6, logo_top_y+tile_space*6, 0)
        this.createTile(logo_top_x+tile_space*7, logo_top_y+tile_space*6, 1)
        this.createTile(logo_top_x+tile_space*8, logo_top_y+tile_space*6, 4)
        this.createTile(logo_top_x+tile_space*9, logo_top_y+tile_space*6, 0)
        this.createTile(logo_top_x+tile_space*10, logo_top_y+tile_space*6, 1)
        this.createTile(logo_top_x+tile_space*11, logo_top_y+tile_space*6, 2)
        this.createTile(logo_top_x+tile_space*12, logo_top_y+tile_space*6, 2)
        this.createTile(logo_top_x+tile_space*14, logo_top_y+tile_space*6, 2)
        this.createTile(logo_top_x+tile_space*15, logo_top_y+tile_space*6, 0)
        this.createTile(logo_top_x+tile_space*16, logo_top_y+tile_space*6, 2)
        this.createTile(logo_top_x+tile_space*17, logo_top_y+tile_space*6, 1)
        this.createTile(logo_top_x+tile_space*18, logo_top_y+tile_space*6, 2)
        this.createTile(logo_top_x+tile_space*19, logo_top_y+tile_space*6, 2)
        this.createTile(logo_top_x+tile_space*20, logo_top_y+tile_space*6, 0)
        this.createTile(logo_top_x+tile_space*21, logo_top_y+tile_space*6, 1)
        this.createTile(logo_top_x+tile_space*22, logo_top_y+tile_space*6, 4)
        this.createTile(logo_top_x+tile_space*23, logo_top_y+tile_space*6, 1)
        this.createTile(logo_top_x+tile_space*24, logo_top_y+tile_space*6, 1)
        this.createTile(logo_top_x+tile_space*25, logo_top_y+tile_space*6, 4)
        this.createTile(logo_top_x+tile_space*26, logo_top_y+tile_space*6, 0)
        this.createTile(logo_top_x+tile_space*27, logo_top_y+tile_space*6, 2)

        this.createTile(logo_top_x+tile_space*1, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*3, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*4, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*6, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*8, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*9, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*11, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*12, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*14, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*15, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*17, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*19, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*20, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*22, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*23, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*25, logo_top_y+tile_space*7, 2)
        this.createTile(logo_top_x+tile_space*26, logo_top_y+tile_space*7, 3)
        this.createTile(logo_top_x+tile_space*27, logo_top_y+tile_space*7, 4)

        this.createTile(logo_top_x+tile_space*1, logo_top_y+tile_space*8, 1)
        this.createTile(logo_top_x+tile_space*2, logo_top_y+tile_space*8, 1)
        this.createTile(logo_top_x+tile_space*3, logo_top_y+tile_space*8, 5)
        this.createTile(logo_top_x+tile_space*4, logo_top_y+tile_space*8, 2)
        this.createTile(logo_top_x+tile_space*6, logo_top_y+tile_space*8, 3)
        this.createTile(logo_top_x+tile_space*7, logo_top_y+tile_space*8, 1)
        this.createTile(logo_top_x+tile_space*8, logo_top_y+tile_space*8, 5)
        this.createTile(logo_top_x+tile_space*9, logo_top_y+tile_space*8, 3)
        this.createTile(logo_top_x+tile_space*10, logo_top_y+tile_space*8, 1)
        this.createTile(logo_top_x+tile_space*11, logo_top_y+tile_space*8, 2)
        this.createTile(logo_top_x+tile_space*12, logo_top_y+tile_space*8, 3)
        this.createTile(logo_top_x+tile_space*13, logo_top_y+tile_space*8, 1)
        this.createTile(logo_top_x+tile_space*14, logo_top_y+tile_space*8, 5)
        this.createTile(logo_top_x+tile_space*15, logo_top_y+tile_space*8, 3)
        this.createTile(logo_top_x+tile_space*16, logo_top_y+tile_space*8, 2)
        this.createTile(logo_top_x+tile_space*17, logo_top_y+tile_space*8, 3)
        this.createTile(logo_top_x+tile_space*18, logo_top_y+tile_space*8, 2)
        this.createTile(logo_top_x+tile_space*19, logo_top_y+tile_space*8, 2)
        this.createTile(logo_top_x+tile_space*20, logo_top_y+tile_space*8, 3)
        this.createTile(logo_top_x+tile_space*21, logo_top_y+tile_space*8, 1)
        this.createTile(logo_top_x+tile_space*22, logo_top_y+tile_space*8, 5)
        this.createTile(logo_top_x+tile_space*23, logo_top_y+tile_space*8, 2)
        this.createTile(logo_top_x+tile_space*25, logo_top_y+tile_space*8, 2)
        this.createTile(logo_top_x+tile_space*26, logo_top_y+tile_space*8, 1)
        this.createTile(logo_top_x+tile_space*27, logo_top_y+tile_space*8, 5)

        this.createTile(logo_top_x+tile_space*1, logo_top_y+tile_space*9, 2)

        this.input.on('pointerdown', () => {
            this.nextScene()
        });
    }

    createTile(x, y, frame) {
        let ledge = this.add.sprite(x, y, 'logo-tiles')
        ledge.setFrame(frame)
        this.platforms.add(ledge, false)
    }


    update(time, delta) {
        if (this.registry.get('restartScene')) {
            this.restartScene()
        }
        if (this.startKey.isDown) {
            this.startGame()
        }
    }

    nextScene() {
        this.scene.start("TitleScene")
    }

    restartScene() {
        this.scene.stop('LogoScene')
        this.scene.launch('LogoScene')
        this.scene.bringToTop()

        this.registry.set('restartScene', false)
    }
}

export default LogoScene
