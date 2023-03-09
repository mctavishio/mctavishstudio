module.exports = () => {
	const uri = "atlas20200705";
	const corecode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/"+uri+".js"];
	

	const pathpoints = [
		{
			title: "2020.07.05 ::: a",
			subtitle: "count map pulse breathe", uri: uri+"a",
			content: `<p>
			i was a tryst<br/>
			a confluence<br/>
			a weaving the woven<br/>
			ecologies arteries forgiven<br/>
			a boat<br/>
			</p>`,
			score: {},
			links: [],
		},
		{
			title: "2020.07.05 ::: b",
			subtitle: "count map pulse breathe", uri: uri+"b",
			content: `<p>
			solitude<br/>
			not silence<br/>
			</p>
			<p>
			every morning<br/>
			heat rises<br/>
			in this<br/>
			basin<br/>
			these bones<br/>
			</p>`,
			score: {},
			links: [],
		},
		{
			title: "2020.07.05 ::: c",
			subtitle: "count map pulse breathe", uri: uri+"c",
			content: `<p>
			on fire<br/>
			balsam fir<br/>
			lit by<br/>
			tiny moths<br/>
			a swarm<br/>
			a flock<br/>
			a hurricane<br/>
			</p>`,
			score: {},
			links: [],
		},
				{
			title: "2020.07.05 ::: d",
			subtitle: "count map pulse breathe", uri: uri+"d",
			content: `<p>
			polar landscapes<br/>
			melt<br/>
			colonists of wind<br/>
			dust storms<br/>
			settle the globe<br/>
			</p>`,
			score: {},
			links: [],
		},
		{
			title: "2020.07.05 ::: e",
			subtitle: "count map pulse breathe", uri: uri+"e",
			content: `<p>
			no rain<br/>
			longing<br/>
			thirst<br/>
			drought<br/>
			</p>
			<p>
			it was like this</br>
			every morning
			</p>
			<p>
			watering can<br/>
			metalic echo<br/>
			pale green<br/>
			drip<br/>
			</p>`,
			score: {},
			links: [],
		},
		{
			title: "2020.07.05 ::: f",
			subtitle: "count map pulse breathe", uri: uri+"f",
			content: `<p>
			this boyhood<br/>
			finally a burst of rain<br/>
			</p>
			<p>
			the poet girlfriend</br>
			sewing masks<br/>
			</p>`,
			score: {},
			links: [],
		},
	];

	let path = 
	{
		uri: uri, url: uri + ".html",
		title: "daily journal ::: 2020.07.05",
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
				title: "weather.gov drought index", uri: "weather.gov_droughtindex20200630", url: "http://blueboatfilms.com/stills/weather.gov_droughtindex20200630.jpg",
				action: "traverse"
			}
		],
		pathpoints: pathpoints,
	};
	
	return path;
};