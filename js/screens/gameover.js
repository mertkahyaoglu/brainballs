GameStates.GameOver = {
	init: function(level) {
    	console.log("You lost level : "+level);
    },
	create: function() {
		this.add.sprite(0, 0, 'bg');
	},

	update: function () {
		
	}

};