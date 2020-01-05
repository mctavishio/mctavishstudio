let createdashboard = z => {
	return {
		resumeaudio: (z) => {
			try {
				if(!z.score.soundloaded){
					z.radio.loadclips(z);
				}
				z.radio.player.context.resume().then(() => {
					z.tools.logmsg("Playback resumed successfully");
					z.elements["telegraph"].el.innerHTML =  "sound on";
					z.score.soundplaying = true;
					z.elements["soundlink"].el.classList.add("active");
				});
			} catch(e) { z.tools.logerror("mapdashboard ::: resumeaudio " + e) }
		},
		suspendaudio: (z) => {
			try {
				z.radio.player.context.suspend().then(() => {
					z.elements["telegraph"].el.innerHTML =  "sound off";
					z.score.soundplaying = false;
					z.elements["soundlink"].el.classList.remove("active");
				});
			} catch(e) { z.tools.logerror("mapdashboard ::: suspendaudio " + e) }
		},
		showcontent: (z) => {
			try {
				z.tools.logmsg("show content");
				document.querySelector('main').style.opacity=0.8;
				z.score.contentvisible = true;
			} catch(e) {}
		},
		hidecontent: (z) => {
			try {
				z.tools.logmsg("hide content");
				document.querySelector('main').style.opacity=0;
				z.score.contentvisible = false;
			} catch(e) { z.tools.logerror("mapdashboard ::: hidecontent " + e) }
		},
		hidecontrols: (z) => {
			try {
				z.tools.logmsg("hidden");
				z.elements["controls"].el.style.display='none';
				z.elements["menulink"].el.style.display='block';
			} catch(e) { z.tools.logerror("mapdashboard ::: hidecontrols " + e) }
		},
		showcontrols: (z) => {
			try {
				z.tools.logmsg("show");
				z.elements["controls"].el.style.display='block';
				z.elements["menulink"].el.style.display='none';
			} catch(e) { z.tools.logerror("mapdashboard ::: showcontrols " + e) }
		},
		next: (z) => {
			try {
				z.tools.logmsg("next ::: z.score.currentnext = " + z.score.currentnext + " ::: " + JSON.stringify(z.nav.next[z.score.currentnext], null, "  "));
				
				if( z.nav.next[z.score.currentnext].actuate === "onrequest" ) {
					window.location = z.nav.next[z.score.currentnext].url;
				}
				else {
					z.nav.next.filter(link => link.type === "internal" && link.actuate === "onload").forEach( link => {
						z.tools.logmsg("link = " + JSON.stringify(link, null, 2) );
						if( z.nav.next[z.score.currentnext].url === link.url ) {
							document.querySelector("#"+link.url).style.display = 'block';
						}
						else {
							document.querySelector("#"+link.url).style.display = 'none';
						}
					});
				}
				z.score.currentnext = (z.score.currentnext + 1) % z.nav.next.length;
				z.tools.logmsg("next ::: z.score.currentnext = " + z.score.currentnext + " ::: " + JSON.stringify(z.nav.next[z.score.currentnext], null, "  "));

				z.elements["nextlink"].el.classList.add("active");

			} catch(e) { z.tools.logerror("mapdashboard ::: next " + e) }
		},
		listen: (z) => {
			z.elements["soundlink"].el.addEventListener('click', function() {
				if(!z.score.soundplaying) { z.dashboard.resumeaudio(z); }
				else { z.dashboard.suspendaudio(z); }
			});
			z.elements["nextlink"].el.addEventListener('click', function() {
				z.dashboard.next(z);
			});
			z.elements["hidelink"].el.addEventListener('click', function() {
				z.dashboard.hidecontent(z);
				z.dashboard.hidecontrols(z);
			});
			z.elements["menulink"].el.addEventListener('click', function() {
				z.dashboard.showcontent(z);
				z.dashboard.showcontrols(z);
			});
			z.elements["telegraph"].el.innerHTML = z.pathpoint.title + " ::: " + z.pathpoint.subtitle;
		}
	}
};