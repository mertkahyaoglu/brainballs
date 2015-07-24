var GameStates = {}; //game states

GameStates.Init = {

    preload: function() {
        this.load.image('loadingbar', 'assets/loadingbar.png');
    },

    create: function(){
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        if(!this.game.device.desktop && !this.isFirefoxOS) this.scale.forceOrientation(true, false, 'screenRotate');
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        this.state.start('Preloader');
    },

    isFirefoxOS: function(){
        return (!!"mozApps" in navigator && navigator.userAgent.search("Mobile")) != -1;
    }

};
