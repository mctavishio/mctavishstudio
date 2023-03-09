module.exports = {
	randominteger: (min, max) => {
		return Math.floor( min + Math.random()*(max-min));
	},
	logmsg: function(msg) {
		console.log("### ::: " + msg);
	},
	logerror: function(error) {
		try { console.log("rusty error ... " + error); }
		catch(err) {}
	}			
}