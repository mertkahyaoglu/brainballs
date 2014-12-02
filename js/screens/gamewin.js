GameStates.GameWin = {

	init: function(level, score) {
    	this.level = level;
    	this.score = score;
    },

	create: function() {
		this.add.sprite(0, 0, 'bg');
		var levelsText = this.add.text(this.world.width/2, 50, "Score:"+this.score, { font: "48px Concert One", fill: "#fff"});
		levelsText.anchor.setTo(0.5, 0.5);

		this.next = this.add.sprite(this.world.width/2-50,220, 'next');
		this.next.anchor.setTo(0.5, 0.5);
		this.next.alpha = 0;
		var tweenNext = this.add.tween(this.next).to( {alpha:1}, 500, Phaser.Easing.None, true , 200, false);
		tweenNext.onComplete.addOnce(this.enableNext, this);

		this.home = this.add.sprite(this.world.width/2+50,220, 'home');
		this.home.anchor.setTo(0.5, 0.5);
		this.home.alpha = 0;
		var tweenHome = this.add.tween(this.home).to( {alpha:1}, 500, Phaser.Easing.None, true , 200, false);
		tweenHome.onComplete.addOnce(this.enableHome, this);
	},

	enableNext: function() {
		this.next.inputEnabled = true;
		this.next.events.onInputDown.addOnce(this.nextLevel, this);
	},

	enableHome: function() {
		//save score 
		this.home.inputEnabled = true;
		this.home.events.onInputDown.addOnce(this.menu, this);
	},

	nextLevel: function() {
		this.state.start('Game', true, false, this.level + 1, this.score);
	},

	menu: function() {
		this.state.start('Menu');
	}

}