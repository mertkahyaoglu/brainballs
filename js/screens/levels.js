GameStates.Levels = {

	create: function() {
		this.add.sprite(0, 0, 'bg');
		this.levels = this.add.group();

		var i = 0;
		for(var lv in Levels) {
		    var level = this.levels.create(80 + i * 80, 125, 'levelitem');
	        level.anchor.setTo(0.5, 0.5);
	        level.inputEnabled = true;
	        level.input.start(0, true);
	        level.events.onInputDown.addOnce(this.onLevelSelected.bind(this));
	        i++;
		}
	},

	onLevelSelected: function(level) {
		this.state.start("Game", true, false, this.levels.getIndex(level) + 1);
	}

}