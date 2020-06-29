//project ::: lattice
const fse = require('fs-extra');
// const path = require('path');
const ejs = require('ejs');
const savearchive = false;
const marked = require('marked');
const frontMatter = require('front-matter');
const glob = require('glob');
const config = require('./source/nodes/config')();
const paths = [
	require('./source/nodes/atlaspath')(),
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

const build = ( () => {
	// clear destination folder
	fse.emptyDirSync("web");
	// copy resource folder
	if (fse.existsSync(config.resourcepath)) {
		fse.copySync(config.resourcepath, config.outputpath);
	}
	paths.forEach( (path, j) => {
		console.log("*** in build loop ::: path.title = " + path.title);
		//save archive file ::: 
		if(savearchive) {
			try { fse.writeFileSync(config.archivepath + '/' + p.uri + "_" + Date.now()+'.json', JSON.stringify(p, null, "  "), 'utf8');
				} catch(err) { tools.logmsg("problem writing file " + err); }
		}
		// render page
		ejs.renderFile(config.sourcepath + '/layouts/' +  'template.ejs', path, (err, result) => {
		    if (err) { tools.logmsg("problem rendering file " + path.uri + " ::: " + err); }
		    else {
		        try {
				fse.writeFileSync(config.outputpath + '/' + path.url, result, 'utf8');
		        } catch(err) { tools.logmsg("problem writing file " + path.uri + " ::: " + err); }
		    }
		});
	});
		
})();

// module.exports = build;