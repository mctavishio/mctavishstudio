//project ::: lattice
const fse = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const marked = require('marked');
const frontMatter = require('front-matter');
const glob = require('glob');
const paths = require('./paths')();
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

const buildlink = linkuri => {
	let builtlink = {};
	let builtnav = {};
	let compositelink = paths.pathpoints.filter( ppoint => ppoint.uri === linkuri )[0];
	let homelinks = compositelink.links.filter( link => link.actuate === "onrequest" && link.keywords.includes("home") );
	let nextlinks = compositelink.links.filter( link => link.keywords && link.keywords.includes("next") );
	let home = homelinks.length > 0 ? homelinks[tools.randominteger(0, homelinks.length)] : paths.site.home;
	if(nextlinks.length === 0) nextlinks.push(paths.site.next);
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
	paths.pathpoints.filter( ppoint => ppoint.uri === linkuri ).forEach( compositelink =>
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
		// tools.logmsg("builtlink = " + JSON.stringify(builtlink));
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
			if(componentlink.actuate === "onrequest" && componentlink.type === "internal") { componentlink.url = componentlink.url + '.html' }
			if(componentlink.actuate === "onload") componentlink.pathpoint = buildlink(componentlink.url);
			builtlink.links.push(componentlink);
		});
	})
	return builtlink;	
}

// /**
// * Build the site
// */
const build = (options = {}) => {
	tools.logmsg('Building site...');
	const startTime = process.hrtime();

	// clear destination folder
	fse.emptyDirSync(paths.site.outputpath);

	// copy assets folder ::: later ?
	if (fse.existsSync(`${paths.site.sourcepath}/assets`)) {
		fse.copySync(`${paths.site.sourcepath}/assets`, paths.site.outputpath);
	}
	paths.pathpoints.forEach( pathpoint => {
		tools.logmsg("*** pathpoint *** " + pathpoint.uri);
		let p = buildlink(pathpoint.uri);
		// tools.logmsg(JSON.stringify(p, null, "  "));
		//build pages
		// ejs.renderFile(path.join(__dirname, 'animatepath.ejs'), p, (err, result) => {
		ejs.renderFile(paths.site.sourcepath + '/layouts/' +  'layout.ejs', p, (err, result) => {
		    if (err) {
		        console.log('info', 'error encountered: ' + err);
		        // throw err;
		    }
		    else {
		        try {
		            fse.writeFileSync(paths.site.outputpath + '/' + p.uri + '.html', result, 'utf8');
		        } catch(err) {
		            if (err) {
		                throw err;
		            }
		        }

		    }
		});
});
}

build();


// // read pages
// const files = glob.sync('**/*.@(md|ejs|html)', { cwd: `${paths.sourcepath}/pages` });

// files.forEach(file =>
// _buildPage(file, { srcPath, outputPath, cleanUrls, site })
// );

// // display build time
// const timeDiff = process.hrtime(startTime);
// const duration = timeDiff[0] * 1000 + timeDiff[1] / 1e6;
// log.success(`Site built succesfully in ${duration}ms`);
// };

// /**
// * Loads a layout file
// */
// const _loadLayout = (layout, { srcPath }) => {
// const file = `${srcPath}/layouts/${layout}.ejs`;
// const data = fse.readFileSync(file, 'utf-8');

// return { file, data };
// };

// /**
// * Build a single page
// */
// const _buildPage = (file, { srcPath, outputPath, cleanUrls, site }) => {
// const fileData = path.parse(file);
// let destPath = path.join(outputPath, fileData.dir);

// // create extra dir if generating clean URLs and filename is not index
// if (cleanUrls && fileData.name !== 'index') {
// destPath = path.join(destPath, fileData.name);
// }

// // create destination directory
// fse.mkdirsSync(destPath);

// // read page file
// const data = fse.readFileSync(`${srcPath}/pages/${file}`, 'utf-8');

// // render page
// const pageData = frontMatter(data);
// const templateConfig = {
// site,
// page: pageData.attributes
// };

// let pageContent;
// const pageSlug = file.split(path.sep).join('-');

// // generate page content according to file type
// switch (fileData.ext) {
// case '.md':
// pageContent = marked(pageData.body);
// break;
// case '.ejs':
// pageContent = ejs.render(pageData.body, templateConfig, {
// filename: `${srcPath}/page-${pageSlug}`
// });
// break;
// default:
// pageContent = pageData.body;
// }

// // render layout with page contents
// const layoutName = pageData.attributes.layout || 'default';
// const layout = _loadLayout(layoutName, {
// srcPath
// });

// const completePage = ejs.render(
// layout.data,
// Object.assign({}, templateConfig, {
// body: pageContent,
// filename: `${srcPath}/layout-${layoutName}`
// })
// );

// // save the html file
// if (cleanUrls) {
// fse.writeFileSync(`${destPath}/index.html`, completePage);
// } else {
// fse.writeFileSync(`${destPath}/${fileData.name}.html`, completePage);
// }
// };

module.exports = build;