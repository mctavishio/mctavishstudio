// ***** ############## initialize z ############## ---------
z.start = () => {
	// ***** initialize resources ---------
	z.radio = createradio(z);
	z.radio.start(z);
	z.dashboard = createdashboard(z);

	let nextnodes = document.querySelectorAll('.nextnode');
	if(nextnodes.length > 0) {
		for (let j = 1; j < nextnodes.length; ++j) {
	  		nextnodes[j].style.display = "none";
		}
	}
	setTimeout( () => { document.querySelector('#contentframe').scrollIntoView(); }, 12000);
	z.dashboard.listen(z);
	createstreams(z);
};


window.onload = function() { 
	setTimeout( () => { document.querySelector('#contentframe').scrollIntoView() }, 8);
	z.tools = createtools( z );
	z.score = {
		currentnext: 0, soundloaded: false, soundplaying: false, contentvisible: true
	}; 
	z.score.winmin = Math.min(window.innerWidth, window.innerHeight);
	z.score.winmax = Math.max(window.innerWidth, window.innerHeight);
	z.score.version = (z.score.winmin < 480 && z.score.winmax < 1025) ? "small" : "large";

	z.tools.logmsg("z.score = " + JSON.stringify(z.score,null,2));
	z.tools.logmsg("z.score0 = " + JSON.stringify(z.score0,null,2));
	z.score.nrows = z.score.version === "small" ? z.score0.nrows[0] : z.score0.nrows[1];
	z.score.ncols = z.score.version === "small" ? z.score0.ncols[0] : z.score0.ncols[1];
	z.score.m = z.score.version === "small" ? z.score0.m[0] : z.score0.m[1];
	z.tools.logmsg(JSON.stringify(z.score, null, 2));
	z.data = createdata( z );
	z.score.orchestration = z.data.sounds.playlists[z.score0.soundplaylist];
	z.score.palette = z.data.colors.playlists[z.score0.colorplaylist];
	z.elements = {};
	addcoreelements(z);
	addelements(z);
	z.start(); 
}