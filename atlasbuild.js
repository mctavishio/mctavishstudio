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
	// require('./source/nodes/jngpath')(),
	// require('./source/nodes/julespath')(),
	// require('./source/nodes/countmappulsebreathepath')(),
	// require('./source/nodes/mapcanvaspath')(),
	// require('./source/nodes/map9path')(),
	// require('./source/nodes/map10path')(),
	require('./source/nodes/nlhowlpath')(),
	// require('./source/nodes/mapcmpbtalkpath')(),
];
const tools = require('./tools')
const defaultpathpoint = {
	id: Date.now(), uri: "default", title: "default title", keywords: ["mctavish"],
	description: "default description"
}

const defaultlink = {
	actuate: "onrequest", uri: "http://mctavish.io/index.html",
	url: "http://mctavish.io/index.html",
	title: "default link", keywords: ["component"], //ex: reference, next, navigation?
	format: "ejs", type: "external"
}

const buildlink = (path, linkuri) => {
	let builtlink = {};
	
	tools.logmsg("in buildlink linkuri = " + linkuri);
	// tools.logmsg("in buildlink ::: path.site.title =  " + path.site.title + " num pathpoints = " + path.pathpoints.length);
	let compositelink = path.pathpoints.filter( ppoint => ppoint.uri === linkuri )[0];
	let homelinks = compositelink.links.filter( link => link.actuate === "onrequest" && link.keywords.includes("home") );
	let home = homelinks.length > 0 ? homelinks[tools.randominteger(0, homelinks.length)] : path.site.home;
	let homelink = {
		uri: home.uri, url: home.url,
		url: home.url ? home.url : home.uri + ".html",
		actuate: home.actuate ? home.actuate : "onrequest",
		title: home.title ? home.title : "-*-*-",
		keywords: home.keywords ? home.keywords : ["home"],
		format: home.format ? home.format : "html",
		type: home.type ? home.type : "external",
		action: home.action ? home.action : "traverse"
	};
	path.pathpoints.filter( ppoint => ppoint.uri === linkuri ).forEach( compositelink =>
	{
		builtlink = {
			id: compositelink.id,
			uri: compositelink.uri ? compositelink.uri : compositelink.id,
			url: compositelink.url ? compositelink.url : compositelink.uri + ".html",
			title: compositelink.title ? compositelink.title : "-*-*- :::",
			subtitle: compositelink.subtitle ? compositelink.subtitle : "",
			keywords: compositelink.keywords ? compositelink.keywords : [],
			description: compositelink.description ? compositelink.description : "",
			links: [], content: compositelink.content ? compositelink.content : "",
			css: compositelink.css ? compositelink.css : [],
			code: compositelink.code ? compositelink.code : [],
			score: compositelink.score ? compositelink.score : {},
			home: homelink
		}
		compositelink.links.forEach( link => {
			let componentlink = {
				uri: link.uri ? link.uri : "#",
				url: link.url ? link.url : "#",
				actuate: link.actuate ? link.actuate : "onrequest",
				title: link.title ? link.title : "-*-*-",
				keywords: link.keywords ? link.keywords : ["reference"],
				format: link.format ? link.format : "html",
				type: link.type ? link.type : "external",
				action: link.action ? link.action : "traverse"
			};
			tools.logmsg("***** link.action = " + link.action + " link.url = " + link.url);
			tools.logmsg("***** componentlink.action = " + componentlink.action);
			// tools.logmsg("*****");
			// tools.logmsg("builtcomponentlink = " + JSON.stringify(componentlink, null, 2));
			// if(componentlink.actuate === "onrequest" && componentlink.type === "internal") { componentlink.uri = componentlink.uri + '.html' }
			if(componentlink.actuate === "onload") componentlink.pathpoint = buildlink(path, componentlink.uri);
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
	let indexes = {
		index: {
			id:  "id_"+ Date.now() + "_public",
			uri: "index", url: "index.html",
			title: "mctavish studio projects",
			subtitle: "comprehensive public index", 
			content: `<h3><i>"There is no such thing as repetition. Only insistance." ― Gertrude Stein</i></h3>`, 
			keywords: ["mctavish studio", "index", "all", "webpage"],
			description: "index of public mctavish studio projects in process", 
			code:  [...mapcode, "code/map5elements.js", "code/map5streams.js"],
			score: mapscore,
			links: [],
			css: [],
			home: { actuate: "onrequest", type: "internal", format: "html", keywords: ["navigation", "home"], title: "home", uri: "index", url: "index.html" },
		},
		hive: {
			id:  "id_"+ Date.now() + "_hive",
			uri: "hive", url: "hive.html", 
			title: "mctavish studio projects",
			subtitle: "hive index", 
			content: `<h3><i>"There is no such thing as repetition. Only insistance." ― Gertrude Stein</i></h3>`, 
			keywords: ["mctavish studio", "index", "all", "webpage"],
			description: "index of subscriber (hive) mctavish studio projects in process", 
			code:  [...mapcode, "code/map8elements.js", "code/map8streams.js"],
			score: mapscore,
			links: [],
			css: [],
			home: { actuate: "onrequest", type: "internal", format: "html", keywords: ["navigation", "home"], title: "home", uri: "hive", url: "hive.html" },
		},
		studio: {
			id:  "id_"+ Date.now() + "_studio",
			uri: "studio", url: "studio.html",
			title: "mctavish studio projects",
			subtitle: "collaboration index", 
			content: `<h3><i>"There is no such thing as repetition. Only insistance." ― Gertrude Stein</i></h3>`, 
			keywords: ["mctavish studio", "index", "studio", "webpage"],
			description: "index of collaborator mctavish studio projects in process", 
			code:  [...mapcode, "code/map5elements.js", "code/map5streams.js"],
			score: mapscore,
			links: [],
			css: [],
			home: { actuate: "onrequest", type: "internal", format: "html", keywords: ["navigation", "home"], title: "home", uri: "studio", url: "studio.html" },
		},

	}
	paths.forEach( (path,pj) => {
		console.log("*** in build loop ::: path.site.title = " + path.site.title);
		let indexsite = path.site;
		path.pathpoints.forEach( (pathpoint, pk) => {
			tools.logmsg("*** pathpoint *** " + pathpoint.uri);
			let p = buildlink(path, pathpoint.uri);
			
			indexsite.links.push({
				actuate: "onrequest", type: "internal",
				format: "html", keywords: ["path"],
				title: p.title ? p.title : p.uri, 
				uri: p.uri, url: p.url, action: "traverse"
			})

			//save archive file ::: 
			try { fse.writeFileSync(config.archivepath + '/' + p.uri + "_" + Date.now()+'.json', JSON.stringify(p, null, "  "), 'utf8');
				} catch(err) { tools.logmsg("problem writing file " + err); }
			
			// render page
			ejs.renderFile(config.sourcepath + '/layouts/' +  'layout.ejs', p, (err, result) => {
			    if (err) { tools.logmsg("problem rendering file " + pathpoint.uri + " ::: " + err); }
			    else {
			        try {
					fse.writeFileSync(config.outputpath + '/' + p.url, result, 'utf8');
			        } catch(err) { tools.logmsg("problem writing file " + pathpoint.uri + " ::: " + err); }
			    }
			});
		});
		indexsite.links[0].keywords.push("next");
		
		let p = indexsite;
		p.home = { actuate: "onrequest", type: "internal", format: "html", keywords: ["navigation", "home"], title: "home", uri: (indexsite.hasOwnProperty("index") && indexes.hasOwnProperty(indexsite.index)) ? indexsite.index + ".html" : path.site.home.uri + ".html"  };
		
		//archive indexsite
		try { fse.writeFileSync(config.archivepath + '/' + p.uri + "_" + Date.now()+'.json', JSON.stringify(p, null, "  "), 'utf8');
		} catch(err) { tools.logmsg("problem writing file " + err); }
		
		//render indexsite
		ejs.renderFile(config.sourcepath + '/layouts/' +  'layout.ejs', p, (err, result) => {
		    if (err) { tools.logmsg("problem rendering file " + p.uri + " ::: " + err); }
		    else {
		        try {
				fse.writeFileSync(config.outputpath + '/' + p.url, result, 'utf8');
		        } catch(err) { tools.logmsg("problem writing file " + p.uri + " ::: " + err); }
		    }
		});
		indexes["studio"].links.push({
			actuate: "onload", type: "internal",
			format: "html", keywords: ["component"],
			title: path.site.title,
			uri: path.site.uri,
			url: path.site.url,
			action: "traverse",
			pathpoint: indexsite
		})
		if(indexsite.hasOwnProperty("index")) {
			if( indexes.hasOwnProperty(indexsite.index) && indexsite.index!=="studio") {
				indexes[indexsite.index].links.push({
					actuate: "onload", type: "internal",
					format: "html", keywords: ["component"],
					title: path.site.title,
					uri: path.site.uri,
					url: path.site.url,
					action: "traverse",
					pathpoint: indexsite
				})
			}
		}
	});
	Object.entries(indexes).forEach( entry => {
		let p = entry[1];
		//archive indexall
		// try { fse.writeFileSync(config.archivepath + '/' + p.uri + "_" + Date.now()+'.json', JSON.stringify(p, null, "  "), 'utf8');
		// } catch(err) { tools.logmsg("problem writing file " + err); }
		
		//render indexall
		ejs.renderFile(config.sourcepath + '/layouts/' +  'layout.ejs', p, (err, result) => {
		    if (err) { tools.logmsg("problem rendering file " + p.uri + " ::: " + err); }
		    else {
		        try {
				fse.writeFileSync(config.outputpath + '/' + p.url, result, 'utf8');
		        } catch(err) { tools.logmsg("problem writing file " + p.uri + " ::: " + err); }
		    }
		});
	})
})();
// module.exports = build;