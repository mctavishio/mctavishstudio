let createdashboard = z => {
	return {
		resumeaudio: (z) => {
			try {
				if(!z.soundloaded){
					// z.createradio();
					// z.radio = createradio(z);
					// z.tools.logmsg("hello ::: lets load sound " + JSON.stringify(z.radio.clips));
					Object.keys(z.radio.clips).forEach( key => {
						// z.tools.logmsg("key= " + key );
						let clip = z.radio.clips[key];
						// z.tools.logmsg("clip " + JSON.stringify(z.radio.clips[key]));
						if(!z.radio.loading.includes(clip.url)) {
							z.radio.loading.push(clip.url);
							let request = new XMLHttpRequest();
							// request.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/" +clip.url, true);
							// request.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + clip.url, true);
							request.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/" + clip.url, true);
							z.tools.logmsg("url" + window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/"  + clip.url);
							// z.tools.logmsg("trying to load" + clip.url);
							request.responseType = "arraybuffer";
							request.onload = () =>  {
								// z.tools.logmsg("loaded" + clip.url);
								z.radio.player.context.decodeAudioData(request.response, buffer => {
									clip.loaded = true;
									clip.buffer = buffer;
									clip.duration = clip.buffer.duration;
									if( clip.duration > z.radio.clipduration.max) {z.radio.clipduration.max = clip.duration}
									else if( clip.duration < z.radio.clipduration.min) {z.radio.clipduration.min  = clip.duration}
									// z.tools.logmsg("decoded" + clip.url);
								}, e => {
									z.tools.logerror("audio error! clip = " + clip.url + ", err = " + e);
								});
								
							};
							request.send();
						}
					});
					z.soundloaded = true;
				}
				z.radio.player.context.resume().then(() => {
					// document.querySelector('#volume-on').style.display='none';
					// document.querySelector('#volume-off').style.display='block';
					z.tools.logmsg("Playback resumed successfully");
					z.elements["telegraph"].el.innerHTML =  "sound on";
					z.soundplaying = true;
				});
			} catch(e) { z.tools.logerror("dashboard 47 " + e)}
		},
		suspendaudio: (z) => {
			try {
				z.radio.player.context.suspend().then(() => {
					// z.tools.logmsg("Playback suspended successfully");
					// document.querySelector('#volume-off').style.display='none';
					// document.querySelector('#volume-on').style.display='block';
					z.elements["telegraph"].el.innerHTML =  "sound off";
					z.soundplaying = false;
				});
			} catch(e) {}
		},
		showcontent: (z) => {
			try {
				z.tools.logmsg("show content");
				document.querySelector('main').style.opacity=0.8;
				z.contentvisible = true;
			} catch(e) {}
		},
		hidecontent: (z) => {
			try {
				z.tools.logmsg("hide content");
				document.querySelector('main').style.opacity=0;
				z.contentvisible = false;
			} catch(e) {}
		},
		hidecontrols: (z) => {
			try {
				z.tools.logmsg("hidden");
				document.querySelector('#controls').style.display='none';
				document.querySelector('#menu').style.display='block';
			} catch(e) {}
		},
		showcontrols: (z) => {
			try {
				z.tools.logmsg("show");
				document.querySelector('#controls').style.display='block';
				document.querySelector('#menu').style.display='none';
			} catch(e) {}
		},
		next: (z) => {
			// try {
				z.tools.logmsg("next ::: z.currentnext = " + z.currentnext + " ::: " + JSON.stringify(z.nav.next[z.currentnext], null, "  "));
				
				if( z.nav.next[z.currentnext].actuate === "onrequest" ) {
					// z.tools.logmsg("next url = " + z.nav.next[z.currentnext].url);
					window.location = z.nav.next[z.currentnext].url;
				}
				else {
					z.nav.next.filter(link => link.type === "internal" && link.actuate === "onload").forEach( link => {
						z.tools.logmsg("link = " + JSON.stringify(link, null, 2) );
						if( z.nav.next[z.currentnext].url === link.url ) {
							document.querySelector("#"+link.url).style.display = 'block';
						}
						else {
							document.querySelector("#"+link.url).style.display = 'none';
						}
					});
				}
				z.currentnext = (z.currentnext + 1) % z.nav.next.length;
				z.tools.logmsg("next ::: z.currentnext = " + z.currentnext + " ::: " + JSON.stringify(z.nav.next[z.currentnext], null, "  "));

				document.querySelector('#next').classList.add("active");

			// } catch(e) {}
		},
		listen: (z) => {
			// One-liner to resume playback when user interacted with the page.
			document.querySelector('#volume-on').addEventListener('click', function() {
				if(!z.soundplaying) {
					z.dashboard.resumeaudio(z);
					document.querySelector('#volume-on').classList.add("active");
				}
				else {
					z.dashboard.suspendaudio(z);
					document.querySelector('#volume-on').classList.remove("active");
				}
			});
			// document.querySelector('#volume-off').addEventListener('click', function() {
			// 	z.dashboard.suspendaudio(z);
			// });
			document.querySelector('#aboutproject').addEventListener('click', function() {
				if(!z.contentvisible) {
					z.dashboard.showcontent(z);
					document.querySelector('#aboutproject').classList.add("active");
				}
				else {
					z.dashboard.hidecontent(z);
					document.querySelector('#aboutproject').classList.remove("active");
				}
			});
			document.querySelector('#next').addEventListener('click', function() {
				z.dashboard.next(z);
			});
			document.querySelector('#hide').addEventListener('click', function() {
				z.dashboard.hidecontent(z);
				document.querySelector('#aboutproject').classList.remove("active");
				z.dashboard.hidecontrols(z);
			});
			document.querySelector('#menu').addEventListener('click', function() {
				z.dashboard.showcontrols(z);
			});
			document.querySelector('#volume-on').style.display='block';
			// document.querySelector('#volume-on').classList.add("active");
			// document.querySelector('#volume-off').style.display='none';
			z.elements["telegraph"].el.innerHTML = "hell0 worlD";

		}
	}
};