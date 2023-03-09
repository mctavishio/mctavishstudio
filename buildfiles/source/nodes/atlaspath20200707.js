module.exports = () => {
	const pubdate = "20200707";
	const uri = "atlas"+pubdate;
	const corecode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/"+uri+".js"];
	

	const pathpoints = [
		{
			title: "2020.07.07 ::: a",
			subtitle: "count map pulse breathe", uri: uri+"a",
			content: `<p>
			&amp; then ...<br/>
			</p>`,
			score: {},
			links: [],
		},
	];

	let path = 
	{
		uri: uri, url: uri + ".html",
		title: "daily journal ::: " + pubdate,
		subtitle: "count map pulse breathe",
		keywords: ["count map pulse breathe", "mctavish", "journal", "2020"],
		description: "count map pulse breathe ::: 2020", 
		content: `<p>count map pulse breathe ::: a journal</p>
		<p>Funded in part through a Jerome Artist Fellowship</p>`,
		code: corecode,  score: {},
		css: [],
		links: [
			{
				actuate: "onrequest", type: "external", //internal, external
				format: "html", keywords: ["reference"],
				title: "journal 2020.07.05", uri: "", url: "https://mctavish.studio/atlas20200705.html",
				action: "traverse"
			},
			{
				actuate: "onrequest", type: "external", //internal, external
				format: "html", keywords: ["reference"],
				title: "journal 2020.07.06", uri: "", url: "https://mctavish.studio/atlas20200706.html",
				action: "traverse"
			},
			{
				actuate: "onrequest", type: "external", //internal, external
				format: "html", keywords: ["reference"],
				title: "journal 2020.07.08", uri: "", url: "https://mctavish.studio/atlas20200707.html",
				action: "traverse"
			},
			{
				actuate: "onrequest", type: "external", //internal, external
				format: "html", keywords: ["reference"],
				title: "other studio projects", uri: "", url: "https://mctavish.studio/studio.html",
				action: "traverse"
			}
		],
		pathpoints: pathpoints,
	};
	
	return path;
};