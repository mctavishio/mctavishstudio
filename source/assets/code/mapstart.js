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
	z.elements["aboutlink"].el.classList.add("active");
	setTimeout( () => { z.dashboard.hidecontent(z); z.elements["aboutlink"].el.classList.remove("active"); }, 4000);
	
	// document.querySelector('#aboutproject').classList.remove("active");
	z.dashboard.listen(z);
	createstreams(z);
};


window.onload = function() { 
	// document.querySelector('#contentframe').scrollIntoView();
	// document.querySelector('#contentframe').style.top = 0;
	// document.querySelector('#contentframe').style.left = 0;
	setTimeout( () => { document.querySelector('#contentframe').scrollIntoView() }, 8);
	z.winmin = Math.min(window.innerWidth, window.innerHeight);
	z.winmax = Math.max(window.innerWidth, window.innerHeight);
	z.currentnext = 0;
	z.soundloaded = false;
	z.soundplaying = false;
	z.contentvisible = false;
	z.streams = {};
	z.version = (z.winmin < 480 && z.winmax < 1025) ? "small" : "large";
	z.nrows = z.version === "small" ? z.score0.nrows[0] : z.score0.nrows[1];
	z.ncols = z.version === "small" ? z.score0.ncols[0] : z.score0.ncols[1];
	z.m = z.version === "small" ? z.score0.m[0] : z.score0.m[1];
	z.tools = createtools( z );
	z.data = createdata(z);
	z.score = {
		orchestration: z.data.sounds.playlists[z.score0.soundplaylist],
		palette: z.data.colors.playlists[z.score0.colorplaylist],
	};
	z.elements = {};
	addcoreelements(z);
	addelements(z);
	z.start(); 
}