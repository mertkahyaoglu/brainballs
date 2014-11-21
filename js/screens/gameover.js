GameStates.GameOver = {

	init: function(level) {
    	this.level = level;
    },

	create: function() {
		this.add.sprite(0, 0, 'bg');
		var gameover = this.add.sprite(this.world.width/2, 150, 'gameover');
		gameover.anchor.setTo(0.5, 0.5);

		this.retry = this.add.sprite(100,230, 'retry');
		this.retry.alpha = 0;
		this.retry.anchor.setTo(0.5, 0.5);
		var tweenRetry = this.add.tween(this.retry).to( {alpha:1}, 500, Phaser.Easing.None, true , 500, false);
		tweenRetry.onComplete.addOnce(this.enableRetry, this);

		this.home = this.add.sprite(this.world.width-100,230, 'home');
		this.home.anchor.setTo(0.5, 0.5);
		this.home.alpha = 0;
		var tweenHome = this.add.tween(this.home).to( {alpha:1}, 500, Phaser.Easing.None, true, 500, false);
		tweenHome.onComplete.addOnce(this.enableHome, this);
	},

	enableRetry: function() {
		this.retry.inputEnabled = true;
		this.retry.events.onInputDown.addOnce(this.restart, this);
	},

	enableHome: function() {
		this.home.inputEnabled = true;
		this.home.events.onInputDown.addOnce(this.menu, this);
	},

	restart: function() {
		this.state.start('Game', true, false, this.level);
	},

	menu: function() {
		this.state.start('Menu');
	}

};