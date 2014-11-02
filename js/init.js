var GameStates = {}; //game states

document.addEventListener("DOMContentLoaded", function()  {
    var game = new Phaser.Game(320, 480, Phaser.CANVAS, "game"); //game object
    game.state.add('Preloader', GameStates.Preloader);   //loads the assets
    game.state.add('Menu', GameStates.Menu);             //menu
    game.state.add('Game', GameStates.Game);             //game
    game.state.add('GameOver', GameStates.GameOver);     //gameover
    game.state.add('GameWin', GameStates.GameWin);       //gamewin
    game.state.start('Preloader');
});