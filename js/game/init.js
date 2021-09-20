var parent = 'game-container';
var games = [
	function(){
		window.game = new CatchTheCatGame({
			w: 11,
			h: 11,
			r: 20,
			backgroundColor: 0xffffff,
			parent: parent,
			statusBarAlign: 'center',
			credit: 'github.com/ganlvtech'
		});
	},
	function(){
	  document.getElementById(parent).innerHTML = '<canvas id="game_board" width="512" height="540">Not support.</canvas>';
	  loadGame('game_board');
	}
];
  games[Math.floor(Math.random() * games.length)]();