GameStates.GameWin = {

	init: function(level, score) {
    	this.level = level;
    	this.score = score;
  },

	create: function() {
		this.stage.backgroundColor = "#2451cc";
		var scoreText = this.add.text(this.world.width/2, 50, "Elapsed Time: "+this.score+" sec", { font: "30px Concert One", fill: "#fff"});
		scoreText.anchor.setTo(0.5, 0);

		var next = this.add.sprite(this.world.width/2-50,200, 'next');
		next.anchor.setTo(0.5, 0.5);
		next.alpha = 0;
		next.inputEnabled = true;
		next.events.onInputDown.addOnce(this.nextLevel, this);
		this.add.tween(next).to( {alpha:1}, 500, Phaser.Easing.None, true , 200, false);

		var home = this.add.sprite(this.world.width/2+50,200, 'home');
		home.anchor.setTo(0.5, 0.5);
		home.alpha = 0;
		home.inputEnabled = true;
		home.events.onInputDown.addOnce(this.menu, this);
		this.add.tween(home).to( {alpha:1}, 500, Phaser.Easing.None, true , 200, false);
	},

	nextLevel: function() {
		if(this.level == 5) {
			this.state.start('GameEnd', true, false, this.score);
		}
		else{
			this.state.start('Game', true, false, this.level + 1, this.score);
		}
	},

	menu: function() {
		this.state.start('Menu');
	}

}
