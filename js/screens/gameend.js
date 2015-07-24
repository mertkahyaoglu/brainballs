GameStates.GameEnd = {

  init: function(score) {
    this.score = score;
  },

  create: function() {
    this.stage.backgroundColor = "#2451cc";
    var congrats = this.add.text(this.world.width/2, this.world.height/3, "Congratulations", { font: "40px Concert One", fill: "#fff"});
    congrats.anchor.setTo(0.5, 0.5);
    var scoreText = this.add.text(this.world.width/2, this.world.height/2, "Total Score:"+this.score, { font: "48px Concert One", fill: "#fff"});
    scoreText.anchor.setTo(0.5, 0.5);
  }

}
