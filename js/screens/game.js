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
		var level = this.add.sprite(this.world.width -  this.cache.getImage("level").width / 2, 0, 'level');
		level.anchor.setTo(0.5, 0);
		var lvText = this.add.text(level.x, level.y, this.level, { font: "36px Concert One", fill: "#fff"});
		lvText.anchor.setTo(0.5, 0);
		this.timer = this.add.sprite(this.world.centerX, this.world.height, "timer");
		this.timer.anchor.setTo(0.5, 1);
		this.timerRatio = (this.world.height - this.cache.getImage("panel").height) / this.timer.height;

		//variables
		this.startTime = this.time.now;
		this.timeIsOut = false;
		this.balls = undefined;
		this.sequence = [];
		this.playerSequence = [];
		this.NUM_BALLS = 0;
		this.picks = 0;
	},

	setupLevel: function() {
		var level = Levels[this.level];

		//setup balls
		this.timerMilliseconds = level.time;
		this.NUM_BALLS = level.num_balls;
		this.picks = this.NUM_BALLS;
		this.balls = this.add.group();
	    for (var i = 0, ball; i < this.NUM_BALLS; i++) {
	        ball = this.balls.create(level.balls_position[i].x, level.balls_position[i].y, 'ball_idle');
	        ball.anchor.setTo(0.5, 0.5);
	    }

	    //setup sequence
	    this.createRandomSequnce();
	    this.animateSequence();
	},

	onBallSelect: function(ball, pointer) {
		ball.loadTexture('ball_select', 0);
		this.updatePlayerSequence(ball);
		this.picks--;
	},

	updatePlayerSequence: function(ball) {
		this.playerSequence.push(this.balls.getIndex(ball));
	},

	createRandomSequnce: function () {
		var rndSequnce = [];
		for (var i = 0; i < this.NUM_BALLS; i++) rndSequnce.push(i);
    	this.sequence = this.math.shuffleArray(rndSequnce);
	},

	animateSequence: function() {
		var game = this;
		setTimeout(function(){
			for (var i = 0; i < game.NUM_BALLS; i++) {
	    		var ball = game.balls.getAt(game.sequence[i]);
	    		var ballTween = game.add.tween(ball.scale).to( {x: 1.3, y: 1.3}, 500, Phaser.Easing.Back.InOut, true, i * 500, false).to( {x: 1, y: 1}, 500, Phaser.Easing.Back.InOut, true, false);
	    		if (i == game.NUM_BALLS - 1)
	    			ballTween.onComplete.addOnce(game.startGame, game);
	    	}
		}, 2000);
	},

	startGame: function() {
		for (var i = 0; i < this.NUM_BALLS; i++) {
			var ball = this.balls.getAt(this.sequence[i]);
			ball.inputEnabled = true;
		    ball.input.start(0, true);
		    ball.events.onInputDown.addOnce(this.onBallSelect.bind(this));
		}
		this.timerTween = this.add.tween(this.timer.scale).to( {x: 1, y: this.timerRatio}, this.timerMilliseconds, Phaser.Easing.None, true, 500, false, false);
		this.timerTween.onComplete.addOnce(this.timeOut, this);
	},

	timeOut: function() {
		this.timeIsOut = true;
	},

	getMatches: function() {
		var matches = [];
		for (var i = 0; i < this.NUM_BALLS; i++) {
			if (this.sequence[i] == this.playerSequence[i]) matches.push(1);
			else matches.push(0);
		};
		return matches;
	},

	update: function () {
		if (this.picks <= 0) {
			this.timerTween.stop();
			var result = "";
			for (var i = 0, matches = this.getMatches(), len = matches.length; i < len; i++) {
				if (matches[i] == 1) {
					this.balls.getAt(i).loadTexture('ball_true', 0);
					result = "GameWin";
				}
				else {
					this.balls.getAt(i).loadTexture('ball_false', 0);
					result = "GameOver";
				}
			}
			var game = this;
			setTimeout(function() {
				game.state.start(result, true, false, game.level);
			}, 2000);
		}
		if (this.timeIsOut) {
			var game = this;
			setTimeout(function() {
				console.log("Time is out");
				game.state.start("GameOver", true, false, game.level);
			}, 2000);
		}
	},
}