import Card from '../objects/Card';

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        })
    }

    preload() {
        //this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles')
    }

    create() {
        this.tutorial=true
        this.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        let back = this.add.image(0, 0, 'back')
        back.setOrigin(0)

        let ships = this.add.image(0, 0, 'ships')
        ships.setOrigin(0)

        this.player1Shield = this.add.image(160,580, 'shield1')
        this.player1Shield.setAlpha(0.1)
        this.player2Shield = this.add.image(850,115, 'shield1')
        this.player2Shield.setAlpha(0.1)
        this.state=1
        this.id=0
        this.scene.bringToTop()

        this.player1 = {}
        this.player1.fusion=20
        this.player1.maxshield=4
        this.player1.shield=4
        this.player1.shieldcharge=1
        this.player1.lasers=1
        this.player1.rockets=0
        this.player1.flares=0
        this.player1.emp=false
        this.player1.bomb=false

        this.player2 = {}
        this.player2.fusion=20
        this.player2.maxshield=4
        this.player2.shield=4
        this.player2.shieldcharge=1
        this.player2.lasers=1
        this.player2.rockets=0
        this.player2.flares=0
        this.player2.emp=false
        this.player2.bomb=false

        this.currentPlayer = Phaser.Math.Between(1, 2)
        this.player1UpdateText = this.add.text(40, 580, "", { fontSize: '24px', fill: '#005' })
        this.player2UpdateText = this.add.text(780, 80, "", { fontSize: '24px', fill: '#001' })
        this.player1StatusText = this.add.text(500, 540, "", { fontSize: '24px', fill: '#76428a' })
        this.player2StatusText = this.add.text(160, 13, "", { fontSize: '24px', fill: '#3f3f74' })
        this.updateStatus()
        this.stateText = this.add.text(150, 340, "Randomly choosing a starting player...", { fontSize: '32px', fill: '#fff' })

        this.skipButton = this.add.sprite(770, 400, 'skip')
        this.skipButton.setInteractive()
        this.skipButton.on("pointerup", function() {
            if(this.state==6) {
                this.state=6
                this.timeout=this.ticks+10
                this.skipButton.setFrame(1)
            }
        }, this)
        this.skipButton.setVisible(false)

        this.ticks=0
        this.timeout = this.ticks+120
        this.input.on('pointerdown', () => {
            if(this.timeout>0) {
                this.timeout=this.ticks
            }
        })
        let card_keys = ["shield", "shieldcharger", "laser", "rocket", "emp", "bomb", "flares", "fusion", "fusion"]

        this.drawpile = Array() 
        for(let i=0; i<card_keys.length; i++) {                
            let card=new Card({
                scene: this, 
                x: 80+(((i*card_keys.length))*130), 
                y: 200, 
                key: card_keys[i],
                cost: 1
            })
            this.drawpile.push(card)
        }
        this.drawpile=this.shuffle(this.drawpile)

        for(let i=0; i<this.drawpile.length; i++) {
            this.drawpile[i].x=950-i
            this.drawpile[i].y=485-i*2
            this.drawpile[i].depth=i
        }
        this.winText = this.add.text(540, 350, "", { fontSize: '128px', fill: '#11a' })
        this.winText.depth=1000
        this.winText.setOrigin(0.5)
        this.gameover=false


    }

    updateStatus() {
        this.player1StatusText.setText("FUSION CORES: " + this.player1.fusion + "\n" +
                                                         "MAX SHIELD: " + this.player1.maxshield + "\n" +
                                                         "CURRENT SHIELD: " + this.player1.shield + "\n" +
                                                         "SHIELD CHARGE PER TURN: " + this.player1.shieldcharge + "\n\n" +
                                                         "LASERS: " + this.player1.lasers + "\n" +
                                                         "ROCKET LAUNCHERS: " + this.player1.rockets + "\n" +
                                                         "FLARE LAUNCHERS: " + this.player1.flares + "\n")

        this.player2StatusText.setText("FUSION CORES: " + this.player2.fusion + "\n" +
                                                         "MAX SHIELD: " + this.player2.maxshield + "\n" +
                                                         "CURRENT SHIELD: " + this.player2.shield + "\n" +
                                                         "SHIELD CHARGE PER TURN: " + this.player2.shieldcharge + "\n\n" +
                                                         "LASERS: " + this.player2.lasers + "\n" +
                                                         "ROCKET LAUNCHERS: " + this.player2.rockets + "\n" +
                                                         "FLARE LAUNCHERS: " + this.player2.flares + "\n")
        if(this.player1.shield==0) {
            this.player1Shield.alpha=0
        }
        else {
            this.player1Shield.alpha=0.1
        }
        if(this.player2.shield==0) {
            this.player2Shield.alpha=0
        }
        else {
            this.player2Shield.alpha=0.1
        }

        if(this.player1.fusion<1) {
            this.winText.setText("The AI wins!")
            this.gameover=true
        }
        if(this.player2.fusion<1) {
            this.winText.setText("You win!")
            this.gameover=true
        }
    }
    addStartingCards() {

        this.storedCard = this.drawpile.pop().putInHand(true, true)
        this.enemyStoredCard = this.drawpile.pop().putInHand(false, true)

       // this.setTopCardDrawable()
    }

    startTurn() {
        this.player1.emp=false
        this.player1.bomb=false
        this.player2.emp=false
        this.player2.bomb=false

        if(this.currentPlayer==1) {
            this.card1 = this.drawpile.pop().putInHand(true,false)
            this.card1.x=370

            this.card2 = this.drawpile.pop().putInHand(true,false)
            this.card2.x=500

            this.card3 = this.storedCard
            this.card3.x=630
            this.card3.y=485

            this.storedCard=null
        }
        else {
            this.card1 = this.drawpile.pop().putInHand(false,false)
            this.card1.setTexture("cardback")
            this.card1.x=370

            this.card2 = this.drawpile.pop().putInHand(false,false)
            this.card2.setTexture("cardback")
            this.card2.x=500

            this.card3 = this.enemyStoredCard
            this.card3.setTexture("cardback")
            this.card3.x=630
            this.card3.y=485

            this.enemyStoredCard=null

        }
    }

    setTopCardDrawable() {
        if(this.drawpile.length>0) {
            this.drawpile[this.drawpile.length-1].setState(1)
        }
    }

    restartScene() {
        this.scene.restart()
        this.scene.bringToTop()
    }
    update(time, delta) {
        if (this.restartKey.isDown) {
            this.restartScene()
        }
        this.ticks++
        if(this.gameover) {
            return
        }
        if(this.timeout>0 && this.timeout<this.ticks) {
            this.state++
            this.timeout=0
            if(this.state==2) {
                if(this.currentPlayer==1) {
                    this.stateText.setText(" You start!")
                }
                else {
                    this.stateText.setText("The AI starts!")
                    this.state=32
                }
                this.stateText.x=390
                this.timeout=this.ticks+120
            }
            else if(this.state==3) {
                this.stateText.x=250
                this.stateText.y=600
                this.stateText.setText("Here's a starting card.\nYou always hold a single card.")
                this.addStartingCards()
                this.timeout=this.ticks+360
            }
            else if(this.state==4) {
                this.startTurn()
                this.stateText.x=250
                this.stateText.y=500
                if(this.tutorial) {
                    this.stateText.setText("Each round you draw\ntwo cards. You may play one,\nand you must hold on to one.\nCards aren't free so sometimes\nyou may choose to play none.")
                    this.timeout=this.ticks+360
                }
                else {
                    this.stateText.setText("")
                    this.timeout=this.ticks+10
                }
                this.skipButton.setVisible(true)
            }
            else if(this.state==5) {
                this.stateText.setText("")
                this.timeout=this.ticks+1  

            }
            else if(this.state==6) {
                this.stateText.x=300
                this.stateText.setText("Choose a card to play")
                
                this.timeout=0
            }
            else if(this.state==7) {
                this.stateText.setText("Choose a card to hold on to.")
                this.skipButton.setVisible(false)
                this.timeout=0
                this.player1UpdateText.setText("")
            }
            else if(this.state==8) {
                this.stateText.setText("")
            }
            else if(this.state==9) {
                if(this.card1!=null) {
                    this.card1.x=-100
                    this.drawpile.unshift(this.card1)
                    this.card1=null
                }
                if(this.card2!=null) {
                    this.card2.x=-100
                    this.drawpile.unshift(this.card2)
                    this.card2=null
                }
                if(this.card3!=null) {
                    this.card3.x=-100
                    this.drawpile.unshift(this.card3)
                    this.card3=null
                }
                this.timeout=this.ticks+10                
            }
            else if(this.state==10) {
                this.stateText.x=450
                this.stateText.setText("Attack phase")
                this.timeout=this.ticks+60
            }
            else if(this.state==11) {
                this.stateText.setText("")
                // fire weapons
                this.timeout=this.ticks+60
            }
            else if(this.state==12) {
                if(this.player1.emp) {
                    this.stateText.setText("Deploying EMP!")
                    this.timeout=this.ticks+60
                }
                else {
                    this.stateText.setText("")
                    this.timeout=this.ticks
                }
            }
            else if(this.state==13) {
                if(this.player1.emp) {
                    if(this.player2.shield>0) {
                        this.player2.shield-=6
                        if(this.player2.shield<0) {
                            this.player2.shield=0
                        }
                    }
                    this.stateText.setText("ZAP!")
                    this.timeout=this.ticks+60
                    this.updateStatus()
                }
                else {
                    this.stateText.setText("")
                    this.timeout=this.ticks
                }
            }
            else if(this.state==14) {
                if(this.player1.lasers==1) {
                    this.stateText.setText(this.player1.lasers + " laser fires")
                }
                else {
                    this.stateText.setText(this.player1.lasers + " lasers fire")
                }
                // resolve

                this.timeout=this.ticks+60
            }
            else if(this.state==15) {
                this.stateText.setText("")
                for(let i=0; i<this.player1.lasers; i++) {
                    if(this.player2.shield>0) {
                        this.player2.shield--
                    }
                    else {
                        this.player2.fusion--
                    }
                }
                this.updateStatus()
                this.timeout=this.ticks+60
            }
            else if(this.state==16) {
                if(this.player1.rockets==1) {
                    this.stateText.setText(this.player1.rockets + " rocket launcher fires")
                }
                else {
                    this.stateText.setText(this.player1.rockets + " rocket launchers fire")
                }
                // resolve

                this.timeout=this.ticks+60
            }
            else if(this.state==17) {
                if(this.player2.flares==1) {
                    this.stateText.setText(this.player2.flares + " defensive flare deployed")
                }
                else {
                    this.stateText.setText(this.player2.flares + " defensive flares deployed")
                }
                let flares=this.player2.flares
                for(let i=0; i<this.player1.rockets; i++) {
                    if(flares>0) {
                        flares--
                    }
                    else {
                        this.player2.fusion--
                    }
                }
                this.updateStatus()

                this.timeout=this.ticks+60
            }
            else if(this.state==18) {
                if(this.player1.bomb) {
                    this.stateText.setText("Deploying Giant Bomb!")
                    this.timeout=this.ticks+60
                }
                else {
                    this.stateText.setText("")
                    this.timeout=this.ticks
                }
            }
            else if(this.state==19) {
                if(this.player1.bomb) {
                    this.player2.fusion-=4
                    this.stateText.setText("BOOM!")
                    this.timeout=this.ticks+60
                    this.updateStatus()
                }
                else {
                    this.stateText.setText("")
                    this.timeout=this.ticks
                }
            }
            else if(this.state==20) {
                this.stateText.setText("")
                this.timeout=this.ticks+60
            }
            else if(this.state==21) {
                this.stateText.setText("Charging shields")
                this.timeout=this.ticks+60
            }
            else if(this.state==22) {
                this.stateText.setText("")
                this.player1.shield+=this.player1.shieldcharge
                if(this.player1.maxshield<this.player1.shield) {
                    this.player1.shield=this.player1.maxshield
                }
                this.timeout=this.ticks+60
                this.updateStatus()
            }
            else if(this.state==23) {
                this.stateText.setText("The AI's turn!")
                this.timeout=this.ticks
                this.state=33
                this.tutorial=false
                this.currentPlayer=2
            }
            else if(this.state==30) { // couldn't afford it 
                
                this.player1UpdateText.setText("You don't have\nenough fusion\ncores!")
                this.state=5
            }
            else if(this.state==33) {
                this.stateText.setText("")
                this.addStartingCards()
                this.timeout=this.ticks+60
            }
            else if(this.state==34) {
                this.startTurn()
                this.stateText.x=180
                this.stateText.y=500
                this.timeout=this.ticks+60
//                this.skipButton.setVisible(true)
            }
            else if(this.state==35) {
                this.stateText.setText("")
                this.timeout=this.ticks+120 

            }
            else if(this.state==36) {
                this.stateText.x=240
//                this.stateText.setText("Choose a card to play")
                //choose what to play
                if(this.card1.cost<this.player2.fusion-1) {
                    this.card1.x=-100
                    this.playCard(this.card1.key, this.player2, this.player2UpdateText)
                    this.drawpile.unshift(this.card1)
                    this.card1=null
                }
                else if(this.card2.cost<this.player2.fusion-1) {
                    this.card2.x=-100
                    this.playCard(this.card2.key, this.player2, this.player2UpdateText)
                    this.drawpile.unshift(this.card2)
                    this.card2=null
                }
                else if(this.card3.cost<this.player2.fusion-1) {
                    this.card3.x=-100
                    this.playCard(this.card3.key, this.player2, this.player2UpdateText)
                    this.drawpile.unshift(this.card3)
                    this.card3=null
                }                
                this.updateStatus()
                this.timeout=this.ticks+120
            }
            else if(this.state==37) {
                if(this.card3==null) {
                    this.enemyStoredCard=this.card2.putInHand(false, true)
                    this.enemyStoredCard.x=80
                    this.enemyStoredCard.y=215
                }
                else {
                    this.enemyStoredCard=this.card3.putInHand(false, true)
                    this.enemyStoredCard.x=80
                    this.enemyStoredCard.y=215
                }
                this.timeout=this.ticks+60
                this.player2UpdateText.setText("")
            }
            else if(this.state==38) {
                this.stateText.setText("")
                this.timeout=this.ticks+60
            }
            else if(this.state==39) {
                if(this.card1!=null && this.card1!=this.enemyStoredCard) {
                    this.card1.x=-100
                    this.drawpile.unshift(this.card1)
                    this.card1=null
                }
                if(this.card2!=null && this.card2!=this.enemyStoredCard) {
                    this.card2.x=-100
                    this.drawpile.unshift(this.card2)
                    this.card2=null
                }
                if(this.card3!=null && this.card3!=this.enemyStoredCard) {
                    this.card3.x=-100
                    this.drawpile.unshift(this.card3)
                    this.card3=null
                }
                this.timeout=this.ticks+10                
            }
            else if(this.state==40) {
                this.stateText.x=450
                this.stateText.setText("Attack phase")
                this.timeout=this.ticks+60
            }
            else if(this.state==41) {
                this.stateText.setText("")
                // fire weapons
                this.timeout=this.ticks+60
            }
            else if(this.state==42) {
                if(this.player2.emp) {
                    this.stateText.setText("Deploying EMP!")
                    this.timeout=this.ticks+60
                }
                else {
                    this.stateText.setText("")
                    this.timeout=this.ticks
                }
            }
            else if(this.state==43) {
                if(this.player2.emp) {
                    if(this.player1.shield>0) {
                        this.player1.shield-=6
                        if(this.player1.shield<0) {
                            this.player1.shield=0
                        }
                    }
                    this.stateText.setText("ZAP!")
                    this.timeout=this.ticks+60
                    this.updateStatus()
                }
                else {
                    this.stateText.setText("")
                    this.timeout=this.ticks
                }
            }
            else if(this.state==44) {
                if(this.player2.lasers==1) {
                    this.stateText.setText(this.player2.lasers + " laser fires")
                }
                else {
                    this.stateText.setText(this.player2.lasers + " lasers fire")                    
                }
                // resolve

                this.timeout=this.ticks+60
            }
            else if(this.state==45) {
                this.stateText.setText("")
                for(let i=0; i<this.player2.lasers; i++) {
                    if(this.player1.shield>0) {
                        this.player1.shield--
                    }
                    else {
                        this.player1.fusion--
                    }
                }
                this.updateStatus()
                this.timeout=this.ticks+60
            }
            else if(this.state==46) {
                if(this.player2.rockets==1) {
                    this.stateText.setText(this.player2.rockets + " rocket launcher fires")
                }
                else {
                    this.stateText.setText(this.player2.rockets + " rocket launchers fire")
                }
                // resolve

                this.timeout=this.ticks+60
            }
            else if(this.state==47) {
                if(this.player1.flares==1) {
                    this.stateText.setText(this.player1.flares + " defensive flare deployed")
                }
                else {
                    this.stateText.setText(this.player1.flares + " defensive flares deployed")
                }
                let flares=this.player1.flares
                for(let i=0; i<this.player2.rockets; i++) {
                    if(flares>0) {
                        flares--
                    }
                    else {
                        this.player1.fusion--
                    }
                }
                this.updateStatus()
                this.timeout=this.ticks+60
            }
            else if(this.state==48) {
                if(this.player2.bomb) {
                    this.stateText.setText("Deploying Giant Bomb!")
                    this.timeout=this.ticks+60
                }
                else {
                    this.stateText.setText("")
                    this.timeout=this.ticks
                }
            }
            else if(this.state==49) {
                if(this.player2.bomb) {
                    this.player1.fusion-=4
                    this.stateText.setText("BOOM!")
                    this.timeout=this.ticks+60
                    this.updateStatus()
                }
                else {
                    this.stateText.setText("")
                    this.timeout=this.ticks
                }
            }
            else if(this.state==50) {
                this.stateText.setText("")
                this.timeout=this.ticks+60
            }
            else if(this.state==51) {
                this.stateText.setText("Charging shields")
                this.timeout=this.ticks+60
            }
            else if(this.state==52) {
                this.stateText.setText("")
                this.player2.shield+=this.player2.shieldcharge
                if(this.player2.maxshield<this.player2.shield) {
                    this.player2.shield=this.player2.maxshield
                }
                this.timeout=this.ticks+60
                this.updateStatus()
            }
            else if(this.state==53) {
                this.stateText.setText("Your turn!")
                this.timeout=this.ticks+60
                this.state=3
                this.currentPlayer=1
            }        
        }
        for(let i=0; i<this.drawpile.length; i++) {
            this.drawpile[i].setTexture("cardback")
            this.drawpile[i].x=950-i
            this.drawpile[i].y=485-i*2
            this.drawpile[i].depth=i
        }
    }

    playCard(key, player, textField) {
        if(key=="rocket") {
            textField.setText("-1 FUSION CORE\n+1 ROCKET\n   LAUNCHER")
            player.fusion--
            player.rockets++
        }
        else if(key=="shield") {
            textField.setText("-1 FUSION CORE\n+1 MAX SHIELD\n+1 SHIELD")
            player.fusion--
            player.shield++
            player.maxshield++
        }
        else if(key=="shieldcharger") {
            textField.setText("-1 FUSION CORE\n+1 SHIELD\n   CHARGER")
            player.fusion--
            player.shieldcharge++
        }
        else if(key=="laser") {
            textField.setText("-1 FUSION CORE\n+1 LASER")
            player.fusion--
            player.lasers++
        }
        else if(key=="emp") {
            textField.setText("-2 FUSION CORE\nEMP DEPLOYED")
            player.fusion-=2
            player.emp=true
        }
        else if(key=="bomb") {
            textField.setText("-2 FUSION CORE\nGIANT BOMB\nDEPLOYED")
            player.fusion-=2
            player.bomb=true
        }
        else if(key=="flares") {
            textField.setText("-1 FUSION CORE\n+1 FLARE\n   LAUNCHER")
            player.fusion--
            player.flares++
        }
        else if(key=="fusion") {
            textField.setText("+1 FUSION CORE")
            player.fusion++
        }        
    }
    setState(s) {
        this.state=s
        this.timeout = this.ticks
    }
    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            // And swap it with the current element.
            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }

        return array
    }
}

export default GameScene
