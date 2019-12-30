// ***** ############## initialize z ############## ---------
z.winmin = Math.min(window.innerWidth, window.innerHeight);
z.winmax = Math.max(window.innerWidth, window.innerHeight);
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
z.start = () => {
	// ***** initialize resources ---------
	z.radio = createradio(z);
	z.radio.start(z);
	z.dashboard = createdashboard(z);
	z.dashboard.hidecontent(z);
	document.querySelector('#aboutproject').classList.remove("active");
	z.dashboard.listen(z);
	createstreams(z);
};
z.elements = createelements(z);

window.onload = function() { z.start() }