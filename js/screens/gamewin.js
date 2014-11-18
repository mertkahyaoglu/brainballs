GameStates.GameWin = {
    init: function(level) {
    	console.log("You win Level : "+level);
    },
	create: function() {
		this.add.sprite(0, 0, 'bg');
	},

	update: function () {
		
	}

}