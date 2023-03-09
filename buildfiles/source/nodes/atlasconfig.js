module.exports = () => {
	let web = {
		title: 'mctavish studio',
		description: 'mctavish studio sketches',
		baseurl: "http://mctavish.studio/index.html",
		basecss: ["css/draw.css"],
		basecode: ["code/velocity.min.js", "code/kefir201911.min.js", "code/tools.js", "code/data.js", "code/radio.js", "code/clock.js", "code/mapcoreelements.js", "code/drawp.js", "code/dashboard.js", "code/mapstart.js"],
		sourcepath: 'source',
		archivepath: 'source/nodes/archive',
		resourcepath: 'source/resources',
		outputpath: 'web',
		csspath: 'css',
		codepath: 'code',
		datapath: 'data',
	};
	console.log(JSON.stringify(web,null,2));
	return web;
};