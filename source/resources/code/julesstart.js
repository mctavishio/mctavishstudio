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
	z.data = createdata( z );
	z.score = {
		currentnext: 0, soundloaded: false, soundplaying: false, contentvisible: true,
		dataset: z.score0.dataset ? z.score0.dataset : ["acc", "bvp", "eda", "hr", "temp"],
		nshapes: z.score0.nshapes,
		video: z.score0.video ? z.score0.video : "382500846",
		orchestration: z.score0.soundplaylist ? z.data.sounds.playlists[z.score0.soundplaylist] : z.data.sounds.playlists["map3"],
		palette: z.score0.colorplaylist ? z.data.colors.playlists[z.score0.colorplaylist] : z.data.colors.playlists["map3"],
	};
	z.score.winmin = Math.min(window.innerWidth, window.innerHeight);
	z.score.winmax = Math.max(window.innerWidth, window.innerHeight);
	z.score.version = (z.score.winmin < 480 && z.score.winmax < 1025) ? "small" : "large";
	z.score.versionj = (z.score.winmin < 480 && z.score.winmax < 1025) ? 0 : 1;
	z.score.nrows = z.score.version === "small" ? z.score0.nrows[0] : z.score0.nrows[1];
	z.score.ncols = z.score.version === "small" ? z.score0.ncols[0] : z.score0.ncols[1];
	z.score.tickrate = z.score0.tickrate ? z.score0.tickrate : 0.125;
	
	z.tools.logmsg(JSON.stringify(z.score, null, 2));
	
	const getdata = {
		hr: gethr,
		temp: gettemp,
		bvp: getbvp,
		acc: getacc,
		eda: geteda
	}
	z.score.data = {};
	z.score.dataset.forEach( d => {
		if(getdata[d]) { z.score.data[d] = getdata[d](); z.tools.logmsg("z.score.data[d].normalizeddata.length = " + z.score.data[d].normalizeddata.length) }
	})

	const largedate = new Date("2100-12-30").getTime();
	z.tools.logmsg("largedate = " + largedate); 
	z.score.tstartmin = largedate, z.tendmax = 0;
	z.score.tstartmax = 0, z.tendmin = largedate;
	z.score.ratemax = 0;
	z.tools.logmsg("tstartmin = " + z.score.tstartmin); 
	Object.keys(z.score.data).forEach( key => {
		z.tools.logmsg("z.score.data has ::: " + key);
		z.tools.logmsg("z.score.data[key].t0 = " + z.score.data[key].t0); 
		if(z.score.data[key].t0 < z.score.tstartmin) {z.score.tstartmin=z.score.data[key].t0}
		else if(z.score.data[key].t0 > z.score.tstartmax) {z.score.tstartmax=z.score.data[key].t0}
		z.score.data[key].tend = z.score.data[key].t0 + Math.floor(z.score.data[key].n/z.score.data[key].rate);
		z.score.data[key].ttotal = z.score.data[key].tend - z.score.data[key].t0;
		
		if(z.score.data[key].tend > z.tendmax) {z.tendmax=z.score.data[key].tend}
		else if(z.score.data[key].tend < z.tendmin) {z.tendmin=z.score.data[key].tend}
		if(z.score.data[key].rate > z.score.ratemax) {z.score.ratemax=z.score.data[key].rate}
		
	});
	Object.keys(z.score.data).forEach( key => {
		z.score.data[key].normalizedrate = z.score.ratemax/z.score.data[key].rate;
	});
	z.ttotal = z.tendmax - z.score.tstartmin;
	z.tools.logmsg(" tstartmin ::: " + z.tools.datestr(new Date(z.score.tstartmin*1000)) + " tendmax ::: " + z.tools.datestr(new Date(z.tendmax*1000)) + " tstartmax ::: " + z.score.tstartmax + " tendmin ::: " + z.tendmin + " total time = " + z.ttotal);
	

	z.elements = {};
	addcoreelements(z);
	addelements(z);
	z.start(); 
}