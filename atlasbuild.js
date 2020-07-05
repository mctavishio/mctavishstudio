//project ::: lattice
const fse = require('fs-extra');
// const path = require('path');
const ejs = require('ejs');
const savearchive = true;
const marked = require('marked');
const frontMatter = require('front-matter');
const glob = require('glob');
const config = require('./source/nodes/atlasconfig')();
const paths = [
	require('./source/nodes/atlasprototypepath')(),
	require('./source/nodes/atlaspath20200705')(),
];
const tools = require('./tools')

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
			try { fse.writeFileSync(config.archivepath + '/' + path.uri + "_" + Date.now()+'.js', JSON.stringify(path, null, "  "), 'utf8');
				} catch(err) { console.log("problem writing file " + err); }
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