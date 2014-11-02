GameStates.Preloader = {

    preload: function() {
         game.load.atlas('atlas', 'assets/atlas.png', 'assets/atlas.json');
    },
    create: function(){
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        if(!this.game.device.desktop && !this.isFirefoxOS) {
            this.scale.forceOrientation(true, false, 'screenRotate');
        }
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        this.state.start('Game');
    },
    isFirefoxOS: function(){
        return (!!"mozApps" in navigator && navigator.userAgent.search("Mobile")) != -1;
    }
    
};