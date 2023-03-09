module.exports = () => {
	const pubdate = "20200706";
	const uri = "atlas"+pubdate;
	const corecode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/"+uri+".js"];
	

	const pathpoints = [
		{
			title: "2020.07.06 ::: a",
			subtitle: "count map pulse breathe", uri: uri+"a",
			content: `<p>
			if i were a bird<br/>
			i would fly<br/>
			over your<br/>
			rooftop<br/>
			</p><p>
			at night<br/>
			when you<br/>
			were sleeping<br/>
			</p>
			<p>
			i would<br/>
			i would fly<br/>
			</p>
			<p>
			fly<br/>
			over your<br/>
			roof top sleeping<br/>
			</p>`,
			score: {},
			links: [],
		},
		{
			title: "2020.07.06 ::: b",
			subtitle: "count map pulse breathe", uri: uri+"b",
			content: `<p>
			if i were a cloud<br/>
			i would shelter you<br/>
			</p>
			<p>
			from this baking<br/>
			sun<br/>
			</p>`,
			score: {},
			links: [],
		},
		{
			title: "2020.07.06 ::: c",
			subtitle: "count map pulse breathe", uri: uri+"c",
			content: `<p>
			Ö x x x ø 0 Ø x X x ø 0 Ø xº3<br/>
			i i i <br/>
			</p>
			<p>
			would<br/>
			shelter<br/>
			you<br/>
			</p>`,
			score: {},
			links: [],
		},
		{
			title: "2020.07.06 ::: d",
			subtitle: "count map pulse breathe", uri: uri+"d",
			content: `<p>
			i was<br/>i<br/>i was looking<br/>i was looking for you<br/>i was
			</p><p>
			walking
			</p>`,
			score: {},
			links: [],
		},
		{
			title: "2020.07.06 ::: e",
			subtitle: "count map pulse breathe", uri: uri+"e",
			content: `<p>
			i i i<br/>i<br/>i was a bird<br/>
			</p><p>
			walking
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
		description: "count map pulse breathe ::: 2020 ::: funded by the jerome foundation", 
		content: `<p>count map pulse breathe ::: a journal</p>
		<p>Funded in part through a Jerome Artist Fellowship</p>`,
		code: corecode,  score: {},
		css: [],
		links: [
			{
				actuate: "onrequest", type: "external", //internal, external
				format: "html", keywords: ["reference"],
				title: "journal 2020.07.05", uri: "", url: "https://mctavish.studio/atlas20200706.html",
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