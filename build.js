//project ::: lattice
const fse = require('fs-extra');
// const path = require('path');
const ejs = require('ejs');
const marked = require('marked');
const frontMatter = require('front-matter');
const glob = require('glob');
const config = require('./source/nodes/config')();
const paths = [
	require('./source/nodes/hughpath')(),
	require('./source/nodes/jngpath')(),
	require('./source/nodes/julespath')(),
	require('./source/nodes/countmappulsebreathepath')(),
];
const tools = require('./tools')
const defaultpathpoint = {
	id: Date.now(), uri: "default", title: "default title", keywords: ["mctavish"],
	description: "default description"
}

const defaultlink = {
	actuate: "onrequest", url: "http://mctavish.io/index.html",
	title: "default link", keywords: ["component"], //ex: reference, next, navigation?
	format: "ejs", type: "external"
}

const buildlink = (path, linkuri) => {
	let builtlink = {};
	// let builtnav = {};
	tools.logmsg("in buildlink linkuri = " + linkuri);
	// tools.logmsg("in buildlink ::: path.site.title =  " + path.site.title + " num pathpoints = " + path.pathpoints.length);
	let compositelink = path.pathpoints.filter( ppoint => ppoint.uri === linkuri )[0];
	let homelinks = compositelink.links.filter( link => link.actuate === "onrequest" && link.keywords.includes("home") );
	// let nextlinks = compositelink.links.filter( link => link.keywords && link.keywords.includes("next") );
	let home = homelinks.length > 0 ? homelinks[tools.randominteger(0, homelinks.length)] : path.site.home;
	// if(nextlinks.length === 0) nextlinks.push(path.site.nav.next[0]);
	let homelink = {
		url: (home.actuate === "onrequest" && home.type === "internal") ? home.url + '.html' : home.url, 
		actuate: home.actuate ? home.actuate : "onrequest",
		title: home.title ? home.title : "-*-*-",
		keywords: home.keywords ? home.keywords : ["home"],
		format: home.format ? home.format : "html",
		type: home.type ? home.type : "external",
		action: home.action ? home.action : ""
	};
	// builtnav.next = [];
	// nextlinks.forEach( next => {
	// 	builtnav.next.push({
	// 		url: (next.actuate === "onrequest" && next.type === "internal") ? next.url + '.html' : next.url, 
	// 		actuate: next.actuate ? next.actuate : "onrequest",
	// 		title: next.title ? next.title : "-*-*-",
	// 		keywords: next.keywords ? next.keywords : ["next"],
	// 		format: next.format ? next.format : "html",
	// 		type: next.type ? next.type : "external",
	// 		action: next.action ? next.action : ""
	// 	});
	// });
	// tools.logmsg("builtnav.next = " + JSON.stringify(builtnav.next, null, "  "));
	path.pathpoints.filter( ppoint => ppoint.uri === linkuri ).forEach( compositelink =>
	{
		builtlink = {
			id: compositelink.id,
			uri: compositelink.uri ? compositelink.uri : compositelink.id, 
			title: compositelink.title ? compositelink.title : "-*-*- :::",
			subtitle: compositelink.subtitle ? compositelink.subtitle : "",
			keywords: compositelink.keywords ? compositelink.keywords : [],
			description: compositelink.description ? compositelink.description : "",
			links: [], content: compositelink.content ? compositelink.content : "",
			css: compositelink.css ? compositelink.css : [],
			code: compositelink.code ? compositelink.code : [],
			score: compositelink.score ? compositelink.score : {},
			home: homelink
			// nav: builtnav, 
			// raw: compositelink
		}
		
		compositelink.links.forEach( link => {
			let componentlink = {
				url: link.url ? link.url : "#", 
				actuate: link.actuate ? link.actuate : "onrequest",
				title: link.title ? link.title : "-*-*-",
				keywords: link.keywords ? link.keywords : ["reference"],
				format: link.format ? link.format : "html",
				type: link.type ? link.type : "external",
				action: link.action ? link.action : ""
			};
			// tools.logmsg("*****");
			// tools.logmsg("builtcomponentlink = " + JSON.stringify(componentlink, null, 2));
			if(componentlink.actuate === "onrequest" && componentlink.type === "internal") { componentlink.url = componentlink.url + '.html' }
			if(componentlink.actuate === "onload") componentlink.pathpoint = buildlink(path, componentlink.url);
			builtlink.links.push(componentlink);
		});
	})
	return builtlink;	
}

const build = ( () => {
	// clear destination folder
	fse.emptyDirSync("web");
	// copy resource folder
	if (fse.existsSync(config.resourcepath)) {
		fse.copySync(config.resourcepath, config.outputpath);
	}

	const mapcode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/mapdata.js", "code/radio.js", "code/mapcoreelements.js", "code/mapdrawp.js", "code/mapdashboard.js", "code/mapstart.js"];
	const mapscore = {soundplaylist: "map3", colorplaylist: "map3", nrows:[4,8], ncols:[4,8], m: [2,4] };
	const mapcontrols = ["home", "next", "sound", "aboutmctavish"];

	let indexallpathpoint = {
		id:  "id_"+ Date.now() + "_all",
		uri: "index", title: "mctavish studio projects",
		subtitle: "comprehensive index", 
		content: `<h3><i>"There is no such thing as repetition. Only insistance." ― Gertrude Stein</i></h3>`, 
		keywords: ["mctavish studio", "index", "all", "webpage"],
		description: "comprehensive index of all mctavish studio projects in process", 
		code:  [...mapcode, "code/map5elements.js", "code/map5streams.js"],
		score: mapscore,
		links: [],
		css: [],
		home: { actuate: "onrequest", type: "internal", format: "html", keywords: ["navigation", "home"], title: "home", url: "index.html" },
	}
	// console.log("*** in build = " + paths.length);

	paths.forEach( (path,pj) => {
		console.log("*** in build loop ::: path.site.title = " + path.site.title);
		let indexpathpoint = path.site;
		path.pathpoints.forEach( (pathpoint, pk) => {
			tools.logmsg("*** pathpoint *** " + pathpoint.uri);
			let p = buildlink(path, pathpoint.uri);
			
			indexpathpoint.links.push({
				actuate: "onrequest", type: "internal",
				format: "html", keywords: ["path"],
				title: p.uri, url: p.uri + ".html"
			})
			if(pj===0 && pk===0) {
				indexallpathpoint.links.push({
					actuate: "onrequest", type: "internal",
					format: "html", keywords: ["next"],
					title: p.uri, url: p.uri + ".html"
				})
			}
			//save archive file ::: 
			// try { fse.writeFileSync(config.archivepath + '/' + p.uri + "_" + Date.now()+'.json', JSON.stringify(p, null, "  "), 'utf8');
		 // 	} catch(err) { tools.logmsg("problem writing file " + err); }
			
			// render page
			ejs.renderFile(config.sourcepath + '/layouts/' +  'layout.ejs', p, (err, result) => {
			    if (err) { tools.logmsg("problem rendering file " + pathpoint.uri + " ::: " + err); }
			    else {
			        try {
					fse.writeFileSync(config.outputpath + '/' + p.uri + '.html', result, 'utf8');
			        } catch(err) { tools.logmsg("problem writing file " + pathpoint.uri + " ::: " + err); }
			    }
			});
		});
		indexpathpoint.links[0].keywords.push("next");
		
		let p = indexpathpoint;
		p.home = { actuate: "onrequest", type: "internal", format: "html", keywords: ["navigation", "home"], title: "home", url: (path.site.access || !path.site.home) ? "index.html" : path.site.home.url + ".html"  };
		
		//archive indexpathpoint
		// try { fse.writeFileSync(config.archivepath + '/' + p.uri + "_" + Date.now()+'.json', JSON.stringify(p, null, "  "), 'utf8');
		// } catch(err) { tools.logmsg("problem writing file " + err); }
		
		//render indexpathpoint
		ejs.renderFile(config.sourcepath + '/layouts/' +  'layout.ejs', p, (err, result) => {
		    if (err) { tools.logmsg("problem rendering file " + p.uri + " ::: " + err); }
		    else {
		        try {
				fse.writeFileSync(config.outputpath + '/' + p.uri + '.html', result, 'utf8');
		        } catch(err) { tools.logmsg("problem writing file " + p.uri + " ::: " + err); }
		    }
		});
		indexallpathpoint.links.push( {
			actuate: "onload", type: "internal",
			format: "html", keywords: ["component"],
			title: path.site.title, url: path.site.uri,
			pathpoint: indexpathpoint
		});
	});
	let p = indexallpathpoint;
	//archive indexallpathpoint
	// try { fse.writeFileSync(config.archivepath + '/' + p.uri + "_" + Date.now()+'.json', JSON.stringify(p, null, "  "), 'utf8');
	// } catch(err) { tools.logmsg("problem writing file " + err); }
	
	//render indexallpathpoint
	ejs.renderFile(config.sourcepath + '/layouts/' +  'layout.ejs', p, (err, result) => {
	    if (err) { tools.logmsg("problem rendering file " + p.uri + " ::: " + err); }
	    else {
	        try {
			fse.writeFileSync(config.outputpath + '/' + p.uri + '.html', result, 'utf8');
	        } catch(err) { tools.logmsg("problem writing file " + p.uri + " ::: " + err); }
	    }
	});
})();
// module.exports = build;