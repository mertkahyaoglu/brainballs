GameStates.Levels = {

	create: function() {
		this.add.sprite(0, 0, 'bg');
		this.levels = this.add.group();

		var i = 0;
		for(var lv in Levels) {
		    var level = this.levels.create(((this.world.width-(3*90))/2+(i%3)*90),
		    	50+(90*this.math.floor(i/3)), 'levelitem');
	        level.inputEnabled = true;
	        level.input.start(0, true);
	        level.events.onInputDown.addOnce(this.onLevelSelected.bind(this));
	        i++;
	        lvText = this.add.text(level.x+level.width/2, level.y+level.height/2, this.levels.getIndex(level) + 1, { font: "36px Concert One", fill: "#fff"});
	        lvText.anchor.setTo(0.5, 0.5);
	        lvText.setShadow(1, 1, 'rgba(0,0,0,0.4)', 4);
	        this.add.text(lvText);
		}
	},

	onLevelSelected: function(level) {
		this.state.start("Game", true, false, this.levels.getIndex(level) + 1);
	}

}