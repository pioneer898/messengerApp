module.exports = {
	waitMilliseconds: async function(ms){
		return new Promise((resolve) => {
			setTimeout(function(){ resolve(); }, ms);
		});
	},
	leftPad: function(str,char,len){
		var pad = char.repeat(len);
		var paddedString = pad+str;
		return paddedString.substring(paddedString.length-len,paddedString.length);
	},
	uuidv4: function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
	makeId(length,keyspace='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
		var result = '';
		var keyspace = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (var i=0;i<length;i++){
			result += keyspace.charAt(Math.floor(Math.random()*keyspace.length));
		}
		return result;
	}
}