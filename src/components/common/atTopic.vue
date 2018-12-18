<template>
	<div class="">
		<div ref="area" class="">
			<textarea ref="textarea" class="t-textarea" :maxlength="allByte"
				autofocus
				placeholder="在这里可以直接输入@符号，发给指定人员，也可直接点击 #标签# 创建标签"
				v-model="content"
				@keydown="keydown"
				@keyup="keyup"
				@input="input"
				@click="input"
				@click.stop="clickStop"
				>
			</textarea>
		</div>
		<div ref="layer" class="t-layer-contain layer_menu_list" v-show="show">
			<ul node-type="suggestWrap">
        <div class="at_top">

					<input
					type="text"
					class="search"
					placeholder="搜索......"
					v-model="searchText"
					@keyup="searchKeyup(data)"
					>
        </div>
				<div class="at_bottom">
					<li class="list_li" v-for="(item, index) of data" :class="{cur : item.cur}" :key="index">
						<a href="javascript:void(0);" @click="insert(item)">{{item.Realname ? item.Realname : item.Title}}<span class="list_span">{{item.Job}}</span></a>
					</li>
        </div>

			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
		    allByte: Number,
		    value: [String, Object],
		    atList: Array, // @数据列表
		    topicList: Array // #数据列表
  		},
		data() {
			return {
				content: '', // 文本框的内容
				// 是否展示弹出层
				show: false,
				// 当前触发弹出字符---#、@
				curchar: null,
				// 关键字符串
				key: "",
				// 弹出层数据
				data:[],
				// 当前选中数据项
				dataidx: 0,

				// 当前光标选中内容起始索引
				selectionStart: 0,
				selectionEnd: 0,

				//
				mappings: [],

				// 匹配‘#xxx# ’和‘@xxx ’的正则
				reg: new RegExp('((@[^@#\\s$]+\\s?|#[^#\\s$]+#(?![^#\\s$]+#)\\s?))', 'g'),

				// 搜索内容
				searchText: '',

			}
		},
		watch: {
			content(val) {
				let arrs = this.parseSubText(val);
				if(this.mappings && arrs.length<this.mappings.length) {
					let preArrs = this.parseSubText(val.substring(0, this.selectionStart));
					let sufArrs = this.parseSubText(val.substring(this.selectionEnd));
					if(preArrs.length+sufArrs.length==arrs.length) {
						this.mappings.splice(preArrs.length, this.mappings.length-arrs.length);
					}
				}
				// 将文本域中内容返回
				this.$emit("input", {
					content: val,
					mappings: this.mappings
				});
			},

		},
		methods: {
			clickStop() {
			  	let clickFunc = (e) => {
				if(e.target.className === 'search') return;
	          	this.show = false;  // 隐藏
				this.searchText = '';
		          $(document).unbind("click", clickFunc);
		        };
		        $(document).bind('click', clickFunc);
			},

			searchKeyup(list) {

				this.data = this.load(this.curchar, this.searchText);
			},
			// 输入字符移动光标
			input: function() {
				this.key = this.getLayerText();
				if(this.key==null) {
					this.hiddenLayer();
					return;
				}
				this.loadData();
				if(!this.data.length) {
					this.show = false;
					return;

				}
				this.showLayer();
			},
			// 按"左/右/删除"键时判定是否需要弹出
			keyup: function(event) {
				if(this.content.length  === this.allByte) {
					this.$message.warning(`最多只能输入${this.allByte}个字`);
					return;
				}
				if(this.show) {
					if(['Enter','ArrowDown','ArrowUp'].indexOf(event.code)>=0) {
						event.returnValue = false;
						return;
					}
				}

				// 如果自己手动输入“#xxx#”或者“@xxx ”，则需要向mappings对应位置加入item
				let selectionStart = this.getSelectionStart(this.$refs.textarea);
				if(this.content.charAt(selectionStart-1) == ' '     // 输入空格
					|| this.content.charAt(selectionStart-1) == '#' // 输入#
					) {
					let key = this.getLayerText(1);
					if(key) {
						let c;
						switch(this.curchar) {
							case '#':
								if(this.content.charAt(selectionStart-1) == '#') {
									c = '#';
									key = key.substring(0, key.length-1);
								}
								break;
							case '@':
								c = '@';
						}
						if(c) {
							let arrs = this.parseSubText(this.content);
							if(arrs.length>this.mappings.length) {
								let preArrs = this.parseSubText(this.content.substring(0, this.selectionStart));
								this.mappings.splice(preArrs.length, 0, {
									curchar: c,
									key: key
								});
							}
						}
					}
				}


				this.input();
			},
			// 弹出情况下，按"上/下/回车"键时操作弹出层，且不触发textarea输入事件
			keydown: function(event) {

				if(this.show && this.data && this.data.length) {
					switch(event.code) {
						case 'Enter':
							let d = this.data[0];
							for(let i in this.data) {
								if(this.data[i].cur) {
									d = this.data[i];
									break;
								}
							}
							this.insert(d);
							this.dataidx = 0;
							event.returnValue = false;
							break;
						case 'ArrowDown':
							this.$set(this.data[this.dataidx], "cur", false);
							if(this.dataidx===this.data.length-1) {
								this.dataidx = 0;
								this.$set(this.data[this.dataidx], "cur", true);
							} else this.$set(this.data[++this.dataidx], "cur", true);
							event.returnValue = false;
							break;
						case 'ArrowUp':
							this.$set(this.data[this.dataidx], "cur", false);
							if(this.dataidx===0) {
								this.dataidx = this.data.length-1;
								this.$set(this.data[this.dataidx], "cur", true);
							} else this.$set(this.data[--this.dataidx], "cur", true);
							event.returnValue = false;
					}
				}
				if(event.code === 'Backspace') {
					let arrs = this.parseSubText(this.content);
					if(arrs.length > this.mappings.length) {
						return;
					}

					let selectionStart = this.getSelectionStart(this.$refs.textarea);
					let preKey = this.content.charAt(selectionStart-1) == ' '
							? this.getLayerText(1) : this.getLayerText();
					if(preKey) {
						let as = this.parseSubText(this.curchar+preKey);
						if(!as || !as.length) {
							return;
						}
					}

					let value = this.content;
					let p = this.getSelectionStart(this.$refs.textarea);

					let delContent = '';
					if(value.charAt(p-1) === ' ') {
						if(value.charAt(p-2) === '#') {
							delContent = this.getLayerText(2);
						} else {
							delContent = this.getLayerText(1);
						}
					} else {
						if(value.charAt(p-1) === '#') {
							delContent = this.getLayerText(1);
							if(!delContent) {
								delContent = this.getLayerText();
							}
						} else {
							delContent = this.getLayerText();
						}
					}
					// 如果#xxxx#不删，则在这儿加上"this.curchar !== '#'"
					if(delContent) {
						this.insert();
						event.returnValue = false;
					}
				}
			},
			// 选中列表项添加到文本域中
			insert: function(item,chars) {
				// 将内容插入文本域
				this.curchar = chars ? chars : this.curchar;

				let value = this.content;
				let curPos = this.selectionStart-1;
				if(item) {
					let preSubs = this.parseSubText(value.substring(0, this.selectionStart-1));
					this.mappings.splice(preSubs.length, 0, {
						curchar: this.curchar,
						key: this.curchar=='#'
								? '#'+item.Title+"#"
								: '@'+item.Realname,
						data: item
					});
					let itemVal = item.Realname ? item.Realname : item.Title;
					let endChar = value.substring(this.selectionEnd-1, this.selectionEnd);
					let v = value.substring(0, this.selectionStart)
						+ (chars ? chars : '')
						+ itemVal
						+ (this.curchar === '#'?'#':'')
						+ (endChar=='\t'||endChar=='\n' ? endChar : " ");
					curPos = v.length;
					this.content = v + value.substring(this.selectionEnd);
					this.selectionStart = this.selectionEnd = curPos+1;

					let arrs = this.parseSubText(this.content);
					if(arrs.length<this.mappings.length) {
						this.mappings.splice(preSubs.length+1, this.mappings.length-arrs.length);
					}
				} else {
					this.content = value.substring(0, this.selectionStart-1) + value.substring(this.selectionEnd);
				}
				this.$nextTick(function () {
					// 将光标移动到正确位置
					this.setCaretPosition(this.$refs.textarea, curPos);
				});
				// 隐藏弹出层
				this.hiddenLayer();
			},
			parseSubText: function(text) {
				let arrs = [];
				if(!this.reg) {
					this.reg = new RegExp();
					this.reg.compile('((@[^@#\\s$]+\\s?|#[^#]+#\\s?))', 'g');
				}
				text.replace(this.reg, ($0,$1) => arrs.push($1));
				return arrs;
			},
			// 重新加载数据
			loadData: function() {
				let value = this.content;
				this.data = this.load(this.curchar,
					value.substring(this.selectionStart, this.getSelectionStart(this.$refs.textarea))
				);
				if(this.data && this.data.length) {
					this.dataidx = 0;
					this.data[0].cur = true;
				}
			},
			// 展示弹出层
			showLayer: function() {
				let pos = $(this.$refs.textarea).caret('position');
				$(this.$refs.layer).css("top", pos.top + 20 - $(this.$refs.textarea).scrollTop());
				$(this.$refs.layer).css("left", pos.left);
				if(!this.show) this.show = true;
			},
			// 隐藏弹出层
			hiddenLayer: function() {
				this.show = false;
			},
			// 获取用于加载列表数据的字符串
			getLayerText: function(offset) {
				offset = offset || 0;
				let value = this.content;
				this.selectionStart = this.getSelectionStart(this.$refs.textarea);
				this.selectionEnd = this.getSelectionEnd(this.$refs.textarea);
				// 当前光标位置向左，如果遇到#或@中间没有空格，则需要弹出（中间遇到的文本返回）
				let startIdx = 0;
				for(let i=this.selectionStart-offset; i>=0; i--) {
					let c = value.charAt(i-1);
					if(!c || c===' ' || c==='\t' || c==='\n') return null;
					switch(c) {
						case '#':
						case '@':
							this.curchar = c;
							startIdx = i;
					}
					if(startIdx) break;
				}
				if(!startIdx) return null;

				if(this.selectionEnd > this.selectionStart) {
					for(let i=this.selectionStart-offset; i<this.selectionEnd-offset; i++) {
						let endIdx = this.findEndIndex(value, i);
						if(endIdx>0) {
							this.selectionStart = startIdx;
							this.selectionEnd = this.selectionEnd;
							return value.substring(startIdx, this.selectionEnd);
						}
					}
				}
				for(let i=this.selectionEnd-offset; i<=value.length; i++) {
					let endIdx = this.findEndIndex(value, i);
					if(endIdx>0) {
						this.selectionStart = startIdx;
						this.selectionEnd = endIdx;
						return value.substring(startIdx, endIdx);
					}
				}
				return '';
			},
			findEndIndex: function(value, i) {
				let c = value.charAt(i);
				if(!c) return i;
				switch(c) {
					case ' ':
					case '\t':
					case '\n':
						if(this.curchar === '@') {
							return i + 1;
						}
						return i;
					case '@':
						return this.selectionEnd;
					case '#':
						if(this.curchar === '@') {
							return this.selectionEnd;
						}
						let sc = value.charAt(i+1);
						if(!sc || sc===' ') {
							return i + 2;
						}
						return this.selectionEnd;
				}
				return -1;
			},
			load: function(c, v) {
				switch(c) {
					case '@':
						return this.atList.filter(ele => {
							return ele.Realname.indexOf(v) >= 0;
						});

					case '#':
						return this.topicList.filter(ele => {
							return ele.Title.indexOf(v) >= 0;
						});
				}
			},
			/**
			 * ----------------------------------------------
			 * 获取文本域光标索引
			 * ----------------------------------------------
			 */
			getSelectionStart: function(target) {
				if (target.selectionStart) {
					return target.selectionStart;
				} else if (document.selection) {
					target.focus();
					var r=document.selection.createRange();
					var sr = r.duplicate();
					sr.moveToElementText(target);
					sr.setEndPoint('EndToEnd', r);
					return sr.text.length - r.text.length;
				}
				return 0;
			},
			getSelectionEnd: function(target) {
				if (target.selectionEnd) {
					return target.selectionEnd;
				} else if (document.selection) {
					target.focus();
					var r=document.selection.createRange();
					var sr = r.duplicate();
					sr.moveToElementText(target);
					sr.setEndPoint('EndToEnd', r);
					return sr.text.length;
				}
				return 0;
			},
			setCaretPosition: function(target, pos){
				if(target.setSelectionRange) {
					target.focus();
					target.setSelectionRange(pos, pos);
				} else if (target.createTextRange) {
					var range = target.createTextRange();
					range.collapse(true);
					range.moveEnd('character', pos);
					range.moveStart('character', pos);
					range.select();
				}
			}
		}
	}
</script>
<style lang="less">
  .box_sizing {
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
  }
	.t-contain {
		position: relative;
		height: 80px;
	}
	.t-area-contain {
		position: absolute;
		left:0;
		top:0;
		background-color: #fff;
		border-color: #cccccc;
		height: auto;
		width: 580px;
		box-sizing: border-box;
		border-width: 1px;
		border-style: solid;
		padding: 5px;
		box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.15) inset;

		border-color: #fa7d3c;
		box-shadow:none;
	}
	.t-layer-contain {
		position:absolute;
		left:0;
		top:0;
		margin: 5px 5px;
		background-color: #fff;
		min-width: 130px;
		border: 2px solid pink;
		border-radius: 4px;
	}
	.t-textarea {
		height: 68px;
		min-height: 68px;
		width: 100%;
		margin: 0px;
		padding: 0px;
		border-style: none;
		border-width: 0px;
		border-radius: 3px;
		font-size: 14px;
		word-wrap: break-word;
		line-height: 18px;
		overflow: auto;
		outline: none;
		vertical-align: middle;
		resize: none;
	}

	.layer_menu_list {
		position: absolute;
		background: #fff;
		color: #333;
		border: 1px solid #ccc;
		border-radius: 2px;
		// padding: 2px;
		box-shadow: 0px 2px 8px 1px rgba(0,0,0,0.2);
		font: 12px/1.3 'Arial','Microsoft YaHei';
		z-index: 9999;
		width: 154px;
		.box_sizing;
	}
	.layer_menu_list ul {
		margin: 0;
		padding: 0;
		clear: both;
		list-style: none;
		max-height: 300px;
	}

	.layer_menu_list ul {
		// position: relative;
		// top: 0;
		// width: 136px;
		// height: 20px;
		// border-bottom: 1px solid #eee;
		// padding: 4px;
		// .box_sizing;
		// margin: 4px 0;

		.at_top {
	    position: absolute;
	    top: 0;
	    width: 100%;
	    height: 30px;
	    border-bottom: 1px solid #eee;
	    .search {
	      width: 100%;
	      height: 100%;
	      padding-left: 4px;
	      .box_sizing;
	    }
		}
		.at_bottom {
      width: 100%;
      margin-top: 34px;
      max-height:224px;
      overflow: auto;

    }
	}
	.layer_menu_list ul li {
		float: none;
		margin: 0;
		padding: 0;
		display: inline;
		margin-top: 34px;
        max-height:224px;
        overflow: auto;
	}
	.layer_menu_list ul li.title, .layer_menu_list ul li.suggest_title {
		padding: 5px 10px;
		display: block;
		cursor: default;
		white-space: nowrap;
		background-color: red;
	}

	.layer_menu_list ul li a {
		position: relative;
	}
	.layer_menu_list ul li .list_span{
		position: absolute;
		top: 8px;
		right: 14px;
		color: #808080;
	}
	.layer_menu_list ul li.cur a, .layer_menu_list ul li a:hover {
		background-color: #f2f2f5;
		text-decoration: none;
		color: #eb7350;
	}
	.layer_menu_list ul li a {
		white-space: nowrap;
		min-width: 50px;
		padding: 7px 13px;
		color: #333;
		display: block;
		cursor: pointer;
		text-decoration: none;
	}

</style>
