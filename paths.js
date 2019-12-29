module.exports = {
	site: {
		title: 'mctavish.io',
		description: 'website for kathy mctavish',
		baseurl: "http://mctavish.io",
		basecss: [],
		basejavascript: [],
		sourcepath: 'source',
		outputpath: 'web',
		csspath: 'css',
		javascriptpath: 'javascript',
		datapath: 'data',
		startpathpoint: "1576970236172"
	},
	pathpoints: [
		{ 
			id: "1576885159740",
			uri: "default",
			title: "default example",
			keywords: ["default", "mctavish", "example"],
			description: "",
			links: [
				{
					actuate: "onrequest", //onload, onrequest, searchembed
					type: "internal", //internal, external
					format: "html", //pdf,ejs,html,mp3,vimeo
					keywords: ["navigation"], //ex: reference, next, navigation?
					action: "navigate", //function to handle click
					title: "Sun Yung Shin catalogue essay",
					target: "new", //new,here,terminal,overlay
					url: "http://blueboatfilms.com/text/swarm/FINALAOV10ShinEssay.pdf"
				}
			],
			content: ""
		},
		{ 
			id: "1576970236172",
			uri: "swarm",
			title: "swarm",
			keywords: ["about", "mctavish", "exhibit", "webpage"],
			description: "about the exhibit swarm",
			links: [
				{
					actuate: "onload", //onload, onrequest, searchembed
					type: "internal", //internal, external
					format: "html", //pdf,ejs,html,mp3,vimeo
					keywords: ["component"], //ex: reference, next, navigation?
					title: "swarm",
					url: "1576959636186"
				}
			],
			content: `about the swarm exhibit
			test test`
		},
		{ 
			id: "1576959636186",
			uri: "swarmpress",
			title: "swarm press",
			keywords: ["press", "mctavish", "exhibit", "links"],
			description: "press links for the exhibit swarm",
			links: [
				{
					title: "Sun Yung Shin catalogue essay",
					url: "http://blueboatfilms.com/text/swarm/FINALAOV10ShinEssay.pdf"
				},
				{
					title: "award announcement",
					url: "http://northern.lights.mn/platform/artist-on-the-verge-10/"
				}, 
			],
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
		},
		{ 
			id: "1577046922497",
			uri: "map54",
			title: "map 54",
			keywords: ["maps", "mctavish", "countmappulsebreathe"],
			description: "part of count map pulse breathe",
			code: ["../code/map54draw.js"],
			links: [
				{
					title: "Sun Yung Shin catalogue essay",
					url: "http://blueboatfilms.com/text/swarm/FINALAOV10ShinEssay.pdf"
				},
				{
					title: "award announcement",
					url: "http://northern.lights.mn/platform/artist-on-the-verge-10/"
				}, 
				{
					actuate: "onload", //onload, onrequest, searchembed
					type: "internal", //internal, external
					format: "html", //pdf,ejs,html,mp3,vimeo
					keywords: ["component"], //ex: reference, next, navigation?
					title: "swarm",
					url: "1576959636186"
				}
			],
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
		}
		
	],
	sites: {
	},
	paths: {

	}
};