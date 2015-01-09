GameStates.GameEnd = {

  init: function(score) {
    this.score = score;
  },

  create: function() {
    this.add.sprite(0, 0, 'bg');
    var congrats = this.add.text(this.world.width/2, this.world.height/3, "congratulations", { font: "48px Concert One", fill: "#fff"});
    var scoreText = this.add.text(this.world.width/2, this.world.height/2, "Score:"+this.score, { font: "48px Concert One", fill: "#fff"});
  }

}
