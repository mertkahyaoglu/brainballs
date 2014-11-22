GameStates.GameWin = {

	init: function(level) {
    	this.level = level;
    },

	create: function() {
		this.add.sprite(0, 0, 'bg');

		this.retry = this.add.sprite(100,180, 'retry');
		this.retry.anchor.setTo(0.5, 0.5);
		this.retry.alpha = 0;
		var tweenRetry = this.add.tween(this.retry).to( {alpha:1}, 500, Phaser.Easing.None, true , 200, false);
		tweenRetry.onComplete.addOnce(this.enableRetry, this);

		this.next = this.add.sprite(this.world.width-100,180, 'next');
		this.next.anchor.setTo(0.5, 0.5);
		this.next.alpha = 0;
		var tweenNext = this.add.tween(this.next).to( {alpha:1}, 500, Phaser.Easing.None, true , 200, false);
		tweenNext.onComplete.addOnce(this.enableNext, this);

		this.home = this.add.sprite(this.world.width/2,270, 'home');
		this.home.anchor.setTo(0.5, 0.5);
		this.home.alpha = 0;
		var tweenHome = this.add.tween(this.home).to( {alpha:1}, 500, Phaser.Easing.None, true , 200, false);
		tweenHome.onComplete.addOnce(this.enableHome, this);
	},

	enableRetry: function() {
		this.retry.inputEnabled = true;
		this.retry.events.onInputDown.addOnce(this.restart, this);
	},

	enableNext: function() {
		this.next.inputEnabled = true;
		this.next.events.onInputDown.addOnce(this.nextLevel, this);
	},

	enableHome: function() {
		this.home.inputEnabled = true;
		this.home.events.onInputDown.addOnce(this.menu, this);
	},

	restart: function() {
		this.state.start('Game', true, false, this.level);
	},

	nextLevel: function() {
		this.state.start('Game', true, false, this.level + 1);
	},

	menu: function() {
		this.state.start('Menu');
	}

}