export default class Card extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, "cardback")
        //super(scene, x, y, imagename);
        this.scene=config.scene
        this.scene.add.existing(this)

        this.key=config.key
        this.imagename=config.key
        this.cost=config.cost
        this.setInteractive()
        this.inspectable=false
        this.up=false
        this.state=1
        this.setOrigin(0.5,1)
        this.alive=true
        // face down
        // 0: inactive e.g. drawpile or other player's hand
        // 1: top card in drawpile
        // 2: interactive: put into player's hand
        // 3: 

        // face up
        // 11: inactive (discard pile)]
        // 12: inactive (in hand)
        // 13: interactive: (in hand) : play
        // 14: interactive: (in hand) : discard
        //
        // 
        this.updatePointerEvents()
    }

    reset() {
        this.state=1
        this.alive=true
    }

    updatePointerEvents() {
        //delete events
        this.on("pointerout", function() {
            
        }, this)

        this.on("pointerover", function() {
            
        }, this)

        this.on("pointerup", function() {
          
            if(this.scene.state==6) {
                if(this.scene.player1.fusion-1>=this.cost) {
                    this.reset()
                    this.scene.skipButton.setVisible(false)
                    this.scene.playCard(this.key, this.scene.player1, this.scene.player1UpdateText)
                    this.scene.updateStatus()
                    //this.scene.updateText.setVisible(true)
                    this.scene.drawpile.unshift(this)
                    if(this.scene.card1==this) {
                        this.scene.card1.x=-100
                        this.scene.card1=null
                     }
                     if(this.scene.card2==this) {
                        this.scene.card2.x=-100
                        this.scene.card2=null
                     }
                     if(this.scene.card3==this) {
                        this.scene.card3.x=-100
                        this.scene.card3=null
                     }
                     this.scene.setState(6)
                     this.scene.timeout=this.scene.ticks+120
                     this.scene.stateText.setText("")
                }
                else {
                    this.scene.setState(29)
                }
            }
            else if(this.scene.state==8) {
                if(this.scene.storedCard==this) {
                    this.scene.setState(4)
                    this.y=485

                    if(this.scene.card1==null) {
                        this.scene.card1=this
                        this.x=370
                     }
                     if(this.scene.card2==null) {
                        this.scene.card2=this
                        this.x=500
                     }
                     if(this.scene.card3==null) {
                        this.scene.card3=this
                        this.x=630
                    }
                    this.scene.storedCard=null
                }
            }
            else if(this.scene.state==7) {
                 this.scene.storedCard = this
                 this.x=945
                 this.y=740
                 if(this.scene.card1==this) {
                    this.scene.card1=null
                 }
                 if(this.scene.card2==this) {
                    this.scene.card2=null
                 }
                 if(this.scene.card3==this) {
                    this.scene.card3=null
                 }
                 this.scene.setState(8)
            }
        }, this)
    }

    putInHand(player, stored) {
        this.state=13
        //this.scene.hand.push(this)
        //this.scene.drawpile.pop()
        if(player) {
            this.setTexture(this.key)
        }
//        this.scene.setTopCardDrawable()

        this.id=this.scene.id
        this.scene.id+=1
        this.depth=this.id
        if(stored) {
            this.x=80
            this.y=215
            if(player) {
                this.x=945
                this.y=740
            }
        }  
        else {
            this.y=485
        }
        return this     
    }
    setX(x) {
        this.x=x
    }

    setState(state) {
        this.state=state
        if(state==2) {
            this.setTexture(this.key)
        }   
        if(state>10) {
            this.inspectable=true
        }   
    }

    update(time, delta) {

    }
}
