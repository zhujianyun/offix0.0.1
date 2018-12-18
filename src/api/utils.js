const MyPlugin = {};
MyPlugin.install = function (Vue, options) {
	function checkStatus(response) {
		// store.dispatch('global/gProgress', 100)
		if (response.status === 200 || response.status === 304) {
			return response
		}
		return {
			data: {
				code: -404,
				message: response.statusText,
				data: ''
			}
		}
	}

	// urls: 请求地址; obj: 参数;
	// type: 请求方式(默认是get); headers: 请求头
	Vue.prototype.$HTTP = function (type, urls, obj, load) {
		//  if(load) {
		//   var loading = this.$loading({
		//     target: load,
		//     lock: true,
		//     text: 'Loading',
		//     spinner: 'el-icon-loading',
		//     background: 'rgba(211,211,211, 0.3)'
		//   });
		// }

		if (type === 'post') {
			return this.$axios({
				method: type,
				url: urls === 'file' ? '/img.ashx' : '/AppServer2.0.asmx' + urls,
				data: this.$qs.stringify(obj),
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': urls === 'file' ? 'application/x-www-form-urlencoded' : 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(res => {
				//  if(load) {
				//   loading.close();
				// }
				return res.data;
			});
		}
		if (type === 'get') {
			return this.$axios({
				method: type,
				url: '/AppServer2.0.asmx' + urls,
				params: obj,
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				}
			}).then(res => {
				// if(load) {
				//   loading.close();
				// }
				return res.data;
			});
		}
	}


	// 时间格式化
	Vue.prototype.format = (dt) => {
		let str = ""; //存储时间的字符串
		//获取年
		let year = dt.getFullYear();
		//获取月
		let month = dt.getMonth() + 1;
		//获取日
		let day = dt.getDate();
		//获取小时
		let hour = dt.getHours();
		//获取分钟
		let min = dt.getMinutes();
		//获取秒
		let sec = dt.getSeconds();
		month = month < 10 ? "0" + month : month;
		day = day < 10 ? "0" + day : day;
		hour = hour < 10 ? "0" + hour : hour;
		min = min < 10 ? "0" + min : min;
		sec = sec < 10 ? "0" + sec : sec;
		str = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
		return str;
	}

	// 字节转换
	Vue.prototype.conver = (limit) => {
		var size = "";
		if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B
			size = limit.toFixed(2) + "B";
		} else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB
			size = (limit / 1024).toFixed(2) + "KB";
		} else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB
			size = (limit / (1024 * 1024)).toFixed(2) + "MB";
		} else { //其他转化成GB
			size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
		}

		var sizestr = size + "";
		var len = sizestr.indexOf("\.");
		var dec = sizestr.substr(len + 1, 2);
		if (dec == "00") {//当小数点后为00时 去掉小数部分
			return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
		}
		return sizestr;
	}

	// 获取文件名后缀
	Vue.prototype.getSuffix = (filename) => {
		var index1 = filename.lastIndexOf(".");
		var index2 = filename.length;
		var suffix = filename.substring(index1 + 1, index2);//后缀名
		return suffix;
	}

	// 判断文件类型
	Vue.prototype.getFlieTyle = (surffix) => {
		surffix = surffix.toLocaleLowerCase();
		if (surffix === 'png' || surffix === 'jpeg' || surffix === 'jpg' || surffix === 'gif' || surffix === 'bmp') {
			return 1;
		} else if (surffix === 'doc' || surffix === 'docx') {
			return 2; // 文档
		} else if (surffix === 'xls' || surffix === 'xlsx') {
			return 3; // 表格
		} else if (surffix === 'psd') {
			return 4; // PS
		} else if (surffix === 'ppt' || surffix === 'pptx') {
			return 5; // ppt
		} else if (surffix === 'pdf') {
			return 6; // pdf
		} else if (surffix === 'mp3' || surffix === 'wma' || surffix === 'wav' || surffix === 'ogg' || surffix === 'ra') {
			return 7; // 音频
		} else if (surffix === 'wmv' || surffix === 'avi' || surffix === 'mpg' || surffix === 'rmvb' || surffix === 'mp4') {
			return 8; //视频
		} else if (surffix === 'zip' || surffix === 'rar') {
			return 9; // 压缩包
		} else if (surffix === 'ai') {
			return 10; // ai
		} else if (surffix === 'txt') {
			return 11; // txt文本
		} else {
			return 0; // 其他
		}
	}

}
export default MyPlugin;

