GameStates.Menu = {

	create: function() {
		this.add.sprite(0, 0, 'bg');
		var logo = this.add.sprite(this.world.centerX, 120, 'logo');
		logo.anchor.setTo(0.5, 0.5);
		var btn_play = this.add.sprite(this.world.centerX, this.world.centerY + 50, 'play');
		btn_play.anchor.setTo(0.5, 0.5);
		btn_play.inputEnabled = true;
		btn_play.events.onInputUp.addOnce(this.startGame, this);
	},

	setScreen: function(screen) {
		this.state.start(screen);
	},

	startGame: function() {
		this.state.start("Game", true, false, 0, 0);
	}
}
