GameStates.Game = {

	init: function(level, score) {
		this.level = level;
		this.prevscore = score;
	},

	create: function() {
		this.setupWorld();
		this.setupLevel();
	},

	setupWorld: function() {
		this.add.sprite(0, 0, 'bg');
		var panel = this.add.sprite(0, 0, 'panel');
		this.notificationText = this.add.text(10, panel.height/2, "", { font: "30px Concert One", fill: "#fff"});
		this.notificationText.anchor.setTo(0, 0.5);
		var level = this.add.sprite(this.world.width -  this.cache.getImage("level").width / 2, 0, 'level');
		level.anchor.setTo(0.5, 0);
		var lvText = this.add.text(level.x, level.y, this.level+1, { font: "36px Concert One", fill: "#fff"});
		lvText.anchor.setTo(0.5, 0);
		this.timer = this.add.sprite(this.world.centerX, this.world.height, "timer");
		this.timer.anchor.setTo(0.5, 1);
		this.timerRatio = (this.world.height - this.cache.getImage("panel").height) / this.timer.height;
	},

	setupLevel: function() {
		var level = this.cache.getJSON('levels').levels[this.level];

		//variables
		this.gametime = this.time.now;
		this.waittime = 4000;
		this.animatetime = level.animatetime;
		this.started = false;
		this.animating = false;
		this.animated = false;
		this.timeIsOut = false;
		this.finish = false;
		this.sequence = [];
		this.playerSequence = [];
		this.levelTime = level.time;
		this.NUM_BALLS = level.num_balls;
		this.picks = this.NUM_BALLS;
		this.balls = this.add.group();

		//create balls
	    for (var i = 0, ball; i < this.NUM_BALLS; i++) {
	        ball = this.balls.create(level.balls_position[i].x, level.balls_position[i].y, 'ball_idle');
	        ball.anchor.setTo(0.5, 0.5);
	    }

	    //setup sequence
		for (var i = 0; i < this.NUM_BALLS; i++)
			this.sequence.push(i);
    	this.sequence = this.math.shuffleArray(this.sequence);
	},

	onBallSelect: function(ball, pointer) {
		ball.loadTexture('ball_select', 0);
		this.playerSequence.push(this.balls.getIndex(ball));
		this.picks--;
	},

	animateSequence: function() {
		this.animating = true;
		var ballTween;
		var animateperball = this.animatetime / this.NUM_BALLS / 2;
		for (var i = 0; i < this.NUM_BALLS; i++) {
    		var ball = this.balls.getAt(this.sequence[i]);

    		ballTween = this.add.tween(ball.scale).to( {x: 1.3, y: 1.3}, animateperball, Phaser.Easing.Back.InOut, true, i * animateperball, false).to( {x: 1, y: 1}, animateperball, Phaser.Easing.Back.InOut, true, false);
    	}
    	ballTween.onComplete.add(this.setAnimated, this);
	},

	setAnimated: function() {
		this.animated = true;
	},

	startGame: function() {
		for (var i = 0; i < this.NUM_BALLS; i++) {
			var ball = this.balls.getAt(this.sequence[i]);
			ball.inputEnabled = true;
		    ball.input.start(0, true);
		    ball.events.onInputDown.addOnce(this.onBallSelect.bind(this));
		}
		this.started = true;
		this.notificationText.setText("Start!");
		this.startTime = this.time.now;
		this.timerTween = this.add.tween(this.timer.scale).to( {x: 1, y: this.timerRatio}, this.levelTime, Phaser.Easing.None, true, false);
	},

	getMatches: function() {
		var matches = [];
		for (var i = 0; i < this.NUM_BALLS; i++) {
			if (this.sequence[i] == this.playerSequence[i]) matches.push(1);
			else matches.push(0);
		};
		return matches;
	},

	getGameTime: function() {
		return this.time.elapsedSince(this.gametime);
	},

	update: function() {
		console.log("Game Time:", this.getGameTime());
		if (!this.animated && this.getGameTime() <= this.waittime) {
			var timer = this.math.floor((this.waittime - this.getGameTime()) / 1000);
			this.notificationText.setText(timer > 0 ? "Ready! " + timer : "Ready!");
		}
		if(!this.animating && this.getGameTime() >= this.waittime) {
			this.animateSequence();
		}
		if (!this.started && this.animated) {
			this.startGame();
		}
		if (!this.finish) {
			this.score = this.math.floor(this.time.elapsedSecondsSince(this.startTime));
		}
		if (!this.finish && this.picks <= 0) {
			this.finish = true;
			this.timerTween.stop();
			var result = "GameWin";
			for (var i = 0, matches = this.getMatches(), len = matches.length; i < len; i++) {
				if (matches[i] == 1) {
					this.balls.getAt(i).loadTexture('ball_true', 0);
				}
				else {
					this.balls.getAt(i).loadTexture('ball_false', 0);
					result = "GameOver";
				}
			}
			if (result == "GameWin")
				this.notificationText.setText("Good Job!");
			else
				this.notificationText.setText("Wrong!");
			var game = this;
			setTimeout(function() {
				game.state.start(result, true, false, game.level, game.score+game.prevscore);
			}, 1000);
		}
		if (this.started && this.time.elapsedSince(this.startTime) >= this.levelTime) {
			this.notificationText.setText("Time is out!");
			this.finish = true;
			for (var i = 0; i < this.NUM_BALLS; i++) {
				this.balls.getAt(i).inputEnabled = false;
			}
			var game = this;
			setTimeout(function() {
				console.log("Time is out");
				game.state.start("GameOver", true, false, game.level, game.score+game.prevscore);
			}, 1000);
		}
	}

}
