GameStates.Preloader = {

    preload: function() {
        this.add.sprite(0, 0, 'bg');
        this.loadingbar = this.add.sprite(this.world.centerX - this.cache.getImage('loadingbar').width / 2, this.world.centerY, 'loadingbar');
        this.load.setPreloadSprite(this.loadingbar);

        //load the assets
        this.load.image('play', 'assets/play.png');
        this.load.image('scores', 'assets/scores.png');
        this.load.image('panel', 'assets/panel.png');
        this.load.image('level', 'assets/level.png');
        this.load.image('levelitem', 'assets/levelitem.png');
        this.load.image('timer', 'assets/timer.png');
        this.load.image('ball_idle', 'assets/ball_idle.png');
        this.load.image('ball_select', 'assets/ball_select.png');
        this.load.image('ball_false', 'assets/ball_false.png');
        this.load.image('ball_true', 'assets/ball_true.png');
    },

    create: function(){
        this.loadingbar.cropEnabled = false;
    },

    update: function() {
        //if(this.time.totalElapsedSeconds() > 1) // wait if loads too quick to show logo.
            this.state.start('Menu');
    }

};