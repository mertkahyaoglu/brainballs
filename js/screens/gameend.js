GameStates.GameEnd = {

  init: function(score) {
    this.score = score;
  },

  create: function() {
    this.stage.backgroundColor = "#2451cc";
    var logo = this.add.sprite(this.world.centerX, 120, 'logo');
		logo.anchor.setTo(0.5, 0.5);
    this.add.tween(logo.scale).to( {x: 1.3, y: 1.3}, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 100, true);
    var congrats = this.add.text(this.world.width/2, this.world.height/4 + 140, "Congratulations", { font: "30px Concert One", fill: "#fff"});
    congrats.anchor.setTo(0.5, 0.5);
    var scoreText = this.add.text(this.world.width/2, this.world.height/4 + 200, "Total Score:"+this.score, { font: "25px Concert One", fill: "#7CC243"});
    scoreText.anchor.setTo(0.5, 0.5);
  }

}
