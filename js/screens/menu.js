GameStates.Menu = {

	create: function() {
		this.add.sprite(0, 0, 'bg');

		var btn_play = this.add.sprite(this.world.centerX, this.world.centerY, 'play');
		btn_play.anchor.setTo(0.5, 0.5);
		btn_play.inputEnabled = true;
		btn_play.events.onInputUp.addOnce(this.setScreen.bind(this, 'Game'), this);

		var btn_scores = this.add.sprite(this.world.centerX, this.world.centerY + 75, 'scores');
		btn_scores.anchor.setTo(0.5, 0.5);
		btn_scores.inputEnabled = true;
		btn_scores.events.onInputUp.addOnce(this.setScreen.bind(this, 'Scores'), this);
	},

	setScreen: function(screen) {
		this.state.start(screen);
	}
}