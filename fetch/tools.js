var wx = require('weixin-js-sdk');
export default {
	checkXcx(callback) {
		const ua = navigator.userAgent.toLowerCase();
		if ((ua.match(/MicroMessenger/i) == 'micromessenger')) {
			wx.miniProgram.getEnv(function(res) {
				if (res.miniprogram) {
					callback(true);
				} else {
					callback(false);
				}
			});
		} else {
			callback(false);
		}
	}
}