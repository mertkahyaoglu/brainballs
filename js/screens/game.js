GameStates.Game = {
	init: function(level) {
		this.level = level;
	},
	create: function() {
		this.setupWorld();
		this.setupLevel();
	},

	setupWorld: function() {
		this.add.sprite(0, 0, 'bg');
		this.add.sprite(0, 0, 'panel');
		this.add.sprite(this.world.width -  57, 0, 'level');
		this.timer = this.add.sprite(this.world.centerX, this.world.height, "timer");
		this.timer.anchor.setTo(0.5, 1);

		//variables
		this.balls = undefined;
		this.sequence = [];
		this.playerSequence = [];
		this.NUM_BALLS = 0;
		this.picks = 0;
	},

	setupLevel: function() {
		var level = Levels[this.level];

		//setup balls
		this.NUM_BALLS = level.num_balls;
		this.picks = this.NUM_BALLS;
		this.balls = this.add.group();
	    for (var i = 0, ball; i < this.NUM_BALLS; i++) {
	        ball = this.balls.create(level.balls_position[i].x, level.balls_position[i].y, 'ball_idle');
	        ball.anchor.setTo(0.5, 0.5);
	        ball.inputEnabled = true;
	        ball.input.start(0, true);
	        ball.events.onInputDown.addOnce(this.onBallSelect.bind(this));
	    }

	    //setup sequence
	    this.createRandomSequnce();
	    console.log(this.sequence);
	},

	onBallSelect: function(ball, pointer) {
		ball.loadTexture('ball_select', 0);
		this.updatePlayerSequence(ball);
		this.picks--;
	},

	updatePlayerSequence: function(ball) {
		this.playerSequence.push(this.balls.getIndex(ball));
		console.log(this.playerSequence);
	},

	createRandomSequnce: function () {
		var rndSequnce = [];
		for (var i = 0; i < this.NUM_BALLS; i++) rndSequnce.push(i);
    	this.sequence = this.math.shuffleArray(rndSequnce);
	},

	getMatches: function() {
		var matches = [];
		for (var i = 0; i < this.NUM_BALLS; i++) {
			if (this.sequence[i] == this.playerSequence[i]) matches.push(1);
			else matches.push(0);
		};
		console.log("Matches: "+matches);
		return matches;
	},

	update: function () {
		if (this.picks <= 0) {
			for (var i = 0, matches = this.getMatches(), len = matches.length; i < len; i++) {
				if (matches[i] == 1)
					this.balls.getAt(i).loadTexture('ball_true', 0);
				else {
					this.balls.getAt(i).loadTexture('ball_false', 0);
				}
			}
			
		}
	},
}