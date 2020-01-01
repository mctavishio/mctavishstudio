//project ::: lattice
const fse = require('fs-extra');
// const path = require('path');
const ejs = require('ejs');
const marked = require('marked');
const frontMatter = require('front-matter');
const glob = require('glob');
const paths = [
	require('./source/nodes/countmappulsebreathepath')(),
	require('./source/nodes/examplepath')()
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
	let builtnav = {};
	tools.logmsg("in buildlink linkuri = " + linkuri);
	// tools.logmsg("in buildlink ::: path.site.title =  " + path.site.title + " num pathpoints = " + path.pathpoints.length);
	let compositelink = path.pathpoints.filter( ppoint => ppoint.uri === linkuri )[0];
	let homelinks = compositelink.links.filter( link => link.actuate === "onrequest" && link.keywords.includes("home") );
	let nextlinks = compositelink.links.filter( link => link.keywords && link.keywords.includes("next") );
	let home = homelinks.length > 0 ? homelinks[tools.randominteger(0, homelinks.length)] : path.site.home;
	if(nextlinks.length === 0) nextlinks.push(path.site.next);
	builtnav.home = {
		url: (home.actuate === "onrequest" && home.type === "internal") ? home.url + '.html' : home.url, 
		actuate: home.actuate ? home.actuate : "onrequest",
		title: home.title ? home.title : "-*-*-",
		keywords: home.keywords ? home.keywords : ["reference"],
		format: home.format ? home.format : "html",
		type: home.type ? home.type : "external",
		action: home.action ? home.action : ""
	};
	builtnav.next = [];
	nextlinks.forEach( next => {
		builtnav.next.push({
			url: (next.actuate === "onrequest" && next.type === "internal") ? next.url + '.html' : next.url, 
			actuate: next.actuate ? next.actuate : "onrequest",
			title: next.title ? next.title : "-*-*-",
			keywords: next.keywords ? next.keywords : ["reference"],
			format: next.format ? next.format : "html",
			type: next.type ? next.type : "external",
			action: next.action ? next.action : ""
		});
	});
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
			controls: compositelink.controls ? compositelink.controls : ["home","sound","next","aboutproject","hide"],
			nav: builtnav, raw: compositelink
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

// /**
// * Build the site
// */
const buildpath = (path) => {
	tools.logmsg('Building site...');
	const startTime = process.hrtime();

	// copy assets folder ::: later ?
	if (fse.existsSync(`${path.site.sourcepath}/assets`)) {
		fse.copySync(`${path.site.sourcepath}/assets`, path.site.outputpath);
	}
	path.pathpoints.forEach( pathpoint => {
		tools.logmsg("*** pathpoint *** " + pathpoint.uri);
		let p = buildlink(path, pathpoint.uri);
		//save archive file ::: 
		try {
		        fse.writeFileSync(path.site.sourcepath + '/nodes/archive/' + p.uri + "_" + Date.now()+'.json', JSON.stringify(p, null, "  "), 'utf8');
	        } catch(err) { tools.logmsg("problem writing file " + err); }
		// tools.logmsg(JSON.stringify(p, null, "  "));
		//build pages
		// ejs.renderFile(path.join(__dirname, 'animatepath.ejs'), p, (err, result) => {
		ejs.renderFile(path.site.sourcepath + '/layouts/' +  'layout.ejs', p, (err, result) => {
		    if (err) {
		        tools.logmsg("problem rendering file " + pathpoint.uri + " ::: " + err);
		    }
		    else {
		        try {
				fse.writeFileSync(path.site.outputpath + '/' + p.uri + '.html', result, 'utf8');
		        } catch(err) { tools.logmsg("problem writing file " + pathpoint.uri + " ::: " + err); }
		    }
		});
	});
}

const build = (() => {
	// clear destination folder
	fse.emptyDirSync("web");

	console.log("*** in build = " + paths.length);
	paths.forEach( path => {
		console.log("*** in build loop ::: path.site.title = " + path.site.title);
		buildpath(path);
	});
})();
// module.exports = build;