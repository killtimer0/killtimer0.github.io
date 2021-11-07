var parent = 'game-container';
var id = 'game_board';
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
	  var obj = document.createElement('canvas');
	  obj.id = id, obj.width = 512, obj.height = 540;
	  document.getElementById(parent).appendChild(obj);
	  loadGame(id);
	},
	function(){
		init2048Game('game-container');
	},
];
var lbl = window.location.hash;
var idx = -1;
if ('string' === typeof lbl && '#' === lbl[0]){
	var idx = parseInt(lbl.substring(1));
}
if (!(idx >= 0 && idx < games.length)) idx = Math.floor(Math.random() * games.length);
games[idx]();
