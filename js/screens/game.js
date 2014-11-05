GameStates.Game = {

	create: function() {
		this.setupWorld();
		this.setupLevel();
	},

	setupWorld: function() {
		this.add.sprite(0, 0, 'bg');
		this.add.sprite(0, 0, 'panel');
		this.timer = this.add.sprite(this.world.centerX, this.world.height, "timer");
		this.timer.anchor.setTo(0.5, 1);
		this.level = 1;
	},

	setupLevel: function() {
		var level = Levels[this.level];
		this.NUM_BALLS = level.num_balls;
		this.balls = this.add.group();
		var ball;
	    for (var i = 0; i < this.NUM_BALLS; i++) {
	        ball = this.balls.create(level.balls_position[i].x, level.balls_position[i].y, 'ball_idle');
	        ball.anchor.setTo(0.5, 0.5);
	        ball.inputEnabled = true;
	        ball.input.start(0, true);
	        ball.events.onInputDown.add(this.onBallSelect);
	    }
	},

	onBallSelect: function(ball, pointer) {
		ball.loadTexture('ball_select', 0);
	},

	update: function () {
		
	},
}