let z = {};
window.onload( () => {
	z.pathpoint.action.initialize(z);
	z.pathpoint.action.start(z);
});

/*

all pathpoints have audio container, video container?, backstage div, canvas, stage svg ::: circles, lines, squares, 
foreground div ::: with n absolute positioned divs, text overlay
all pathpoints define navigation
the score sets up how many of each in let nelements = { circles: [large, mobile], lines: [large, mobile] etc ... }
score.clips ... score.instruments, score.soundplaylist, score.colorplaylist, score.textplaylist, 
the pathpoint is translated to the "page" (form ::: pathid_pathpointid.hmtl) other reference pathpoints etc. (defined in path file) are embedded in pathpoint by build ... 
the pathpoint-specific script holds 1) the core score 2) the core streams 3) ...

z.tools, z.elements, z.streams, z.score, z.comass (with current width, height? or mobile or not ? isloaded?? , currenttransformation ...), z.radio, z.transformations ::: form ::: {tranformationid (like an embedded pathpointid): (z) => {use z.tools.removeChildren(from all stage elements), z.stopstreams(remove onValue for all except core streams), create new elements (from score parameters), create new streams, define navigation, set compass} }

the build nodejs actor takes the path file & all the pathpoints & the layout.ejs & creates files (sometimes multiple versions of any given pathpoint)
adding in path info to pathid_pathpointid definition, breadcrumb info, pathinfo (for interpretation by pathpoint nav script listeners) ... these are enclosed in z.score0 for front end
same same radio, corestreams, elements, dashboard (expose functions for setting listeners pass the p[athpoint specific nexr function to the nextbutton() dashboard function etc.])

to do :::

re-create :::
atlasradio
atlasbuild
atlaslayout
atlasdashboard
atlaselements
atlastools
join these into atlas.js

*/
z.pathpoint: {
	"id": "id_1586118915897_0",
  	"uri": "hughmap3a",
  	"url": "hughmap3a.html",
  	"title": "map 3a",
  	"subtitle": "hughmap3a",
	"keywords": ["countmappulsebreathe","exhibit","webpage"],
  	"description": "count map pulse breathe ::: map ::: hughmap3a",
  	"content": "<p>count map pulse breathe with sound from map3 ::: used at the Joseph Nease Gallery 12/2019 - 2/2020</p>",
	"css": [],
	"code": [ "code/velocity.min.js","code/kefir201911.min.js","code/tools.js","code/mapdata.js",
		"code/radio.js",
		"code/mapcoreelements.js",
		"code/mapdrawp.js",
		"code/mapdashboard.js",
		"code/mapstart.js",
		"code/map3elements.js",
		"code/map3astreams.js"
	],
	score: {

	},
	action: {
		initialize: () => {},
		start: () => {},
		end: () => {},
	},
	navigation: {
		home: {},
		next: {},
		map: {},
		pdf: {},
		bio: {},
		sound: {},
	},
	links: [
	{
	      "uri": "hughmap88",
	      "url": "hughmap88.html",
	      "actuate": "onrequest",
	      "title": "map 88",
	      "keywords": [
	        "path"
	      ],
	      "format": "html",
	      "type": "external",
	      "action": "traverse"
	},
	{
	      "uri": "hughmap88",
	      "url": "hughmap88.html",
	      "actuate": "onrequest",
	      "title": "map 88",
	      "keywords": [
	        "path"
	      ],
	      "format": "html",
	      "type": "internal",
	      "action": "draw"
	}]
}
compass: {currentpathpoint}