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
		loadGobangGame(parent,'/js/game/gobang.min.js',function(bg,bd,fb,tb){
			bg.style.backgroundImage="url('/pictures/game/bg.jpg')",
			bd.style.backgroundImage="url('/pictures/game/board.jpg')"
		}, {lineColor: '#333'});
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
