module.exports = () => {
	const corecode = ["code/velocity.min.js", "code/kefir201911.min.js", "code/atlascore.js", "code/atlas3.js"];
	const name = "hugh";

	const pathpoints = [
		{
			title: "count map pulse breathe #3a",
			subtitle: "", uri: "map3a",
			content: `<p>count map pulse breathe ::: map #3a ::: shown at the <a href="http://josephneasegallery.com">Joseph Nease Gallery</a> 12/2019 - 2/2020</p>
<p>Funded in part through a Jerome Artist Fellowship</p>`,
			score: {},
			links: [],
		},
		{
			title: "count map pulse breathe #3b",
			subtitle: "", uri: "map3b",
			content: `<p>count map pulse breathe ::: map #3b</p>`,
			score: {},
			links: [],
		},
		{
			title: "count map pulse breathe #3c",
			subtitle: "", uri: "map3b",
			content: `<p>count map pulse breathe ::: map #3c</p>`,
			score: {},
			links: [],
		},
	];

	let path = 
	{
		uri: name, url: name + ".html",
		title: "count map pulse breathe",
		keywords: ["count map pulse breathe", "mctavish", "Joseph Nease Gallery", "2020"],
		description: "count map pulse breathe ::: 2020 ::: originally shown at the Joseph Nease Gallery", 
		content: `<p>count map pulse breathe ::: shown at the <a href="http://josephneasegallery.com">Joseph Nease Gallery</a> 12/2019 - 2/2020</p>
<p>Funded in part through a Jerome Artist Fellowship</p>`,
		code: corecode,  score: {},
		css: [],
		links: [],
		pathpoints: pathpoints,
	};
	

	
	return path;
};