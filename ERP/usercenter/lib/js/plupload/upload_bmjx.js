//document.write('<link rel="stylesheet" href="/Manager/cmm-js/plupload-2.1.2/style.css" />');
(function($) {
	$.fn.Pluploader_1 = function(options, cb) {
		var _this = this;
		accessid = ''
		accesskey = ''
		host = ''
		policyBase64 = ''
		signature = ''
		callbackbody = ''
		filename = ''
		key = ''
		expirestart = 0
		expire = 0
		servertimespan = 0
		g_object_name = ''
		g_object_name_type = ''
		now = timestamp = Date.parse(new Date()) / 1000;
		_osskeyArr = [];
		_isUploadSuccess = true;

		function send_request() {
			var xmlhttp = null;
			if(window.XMLHttpRequest) {
				xmlhttp = new XMLHttpRequest();
			} else if(window.ActiveXObject) {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}

			if(xmlhttp != null) {
				serverUrl = 'http://baojia.98ep.com/backstage/ossapi/signature.do?filepath=' + ((typeof(options.vmodulename) == undefined || options.vmodulename == null) ? 'qa_files' : options.vmodulename); // 模块名
				xmlhttp.open("GET", serverUrl, false);
				xmlhttp.send(null);
				return xmlhttp.responseText
			} else {
				alert("Your browser does not support XMLHTTP.");
			}
		};

		function get_signature() {
			//可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
			now = timestamp = (Date.parse(new Date()) / 1000); // 约定 now + servertimespan = expirestart
			now += servertimespan;
			if(expire < now + 3) {
				body = send_request();
				var obj = eval("(" + body + ")");
				host = obj['host'];
				policyBase64 = obj['policy'];
				accessid = obj['accessid'];
				signature = obj['signature'];
				expirestart = parseInt(obj['expirestart']); // 策略生成时间
				expire = parseInt(obj['expire']); // 策略过期时间
				if(servertimespan == 0)
					servertimespan = expirestart - now; // 本地和服务器时间差值
				callbackbody = obj['callback'];
				key = obj['dir'];
				return true;
			}
			return false;
		};

		function random_string(len) {
			len = len || 32;
			var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
			var maxPos = chars.length;
			var pwd = '';
			for(i = 0; i < len; i++) {
				pwd += chars.charAt(Math.floor(Math.random() * maxPos));
			}
			return pwd;
		}

		function set_upload_param(up, filename, ret) {
			if(ret == false) {
				ret = get_signature()
			}
			g_object_name = filename;
			new_multipart_params = {
				'key': g_object_name,
				'policy': policyBase64,
				'OSSAccessKeyId': accessid,
				'success_action_status': '200', //让服务端返回200,不然，默认会返回204
				'callback': callbackbody,
				'signature': signature
			};

			up.setOption({
				'url': host,
				'multipart_params': new_multipart_params
			});

			up.start();
		}

		// 组装文件名
		function get_prefilename() {
			return Date.parse(new Date()) / 1000;
		}

		function RndNum(n) {
			var rnd = "";
			for(var i = 0; i < n; i++)
				rnd += Math.floor(Math.random() * 10);
			return rnd;
		}

		function clearuploadinfo() {
			// 移除已上传的文件信息
			//$('#file-list-1').html('');
			//$('#file-list-1').html('');
			plupload.each(uploader.files, function(file) {
				uploader.removeFile(file);
			});
			_osskeyArr = [];
			_isUploadSuccess = true;
		}

		// 获取路径中的扩展名
		function get_suffix(filename) {
			pos = filename.lastIndexOf('.')
			suffix = ''
			if(pos != -1) {
				suffix = filename.substring(pos)
			}
			return suffix;
		}

		var uploader = new plupload.Uploader({
			runtimes: 'html5,flash,silverlight,html4',
			//browse_button : 'browse',   //选择文件按钮ID
			browse_button: ((typeof(options.vbrowse_button) == undefined || options.vbrowse_button == null) ? 'selectfiles' : options.vbrowse_button),
			//browse_button : 'selectfiles',
			multi_selection: false,
			container: document.getElementById('container_1'),
			flash_swf_url: 'Moxie.swf',
			silverlight_xap_url: 'Moxie.xap',
			url: 'http://oss.aliyuncs.com',
			filters: {
				/* mime_types: [ //只允许上传图片和zip,rar文件
				 { title: "Image files", extensions: "jpg,gif,png,bmp" },
				 { title: "Zip files", extensions: "zip,rar" }
				 ],*/
				//max_file_size: '10mb', //最大只能上传10mb的文件
				//prevent_duplicates: true //不允许选取重复文件
			},

			init: {
				//当Init事件发生后触发
				PostInit: function() {
					//document.getElementById('file-list').innerHTML = '';
					_this.unbind('click').bind('click', function() {
						set_upload_param(uploader, '', false);
						//return false;
					});
				},
				//当文件添加到上传队列后触发
				FilesAdded: function(up, files) {
					if(!up.settings.multi_selection) { // 仅可以选择一个文件时，删除之前选择的文件
						plupload.each(up.files, function(file) {
							if(up.files.length <= 1) {
								return;
							}
							up.removeFile(file);
						});
					}
					plupload.each(files, function(file) {
						if(!up.settings.multi_selection) // 仅可以选择一个文件时，先清空文件列表，再拼接本次选择的文件信息
							document.getElementById('file-list_1').innerHTML = '';
						document.getElementById('file-list_1').innerHTML += '<div id="' + file.id + '" class="rel"><span class="filename" title="' + file.name + '">' + file.name + '</span> (' + plupload.formatSize(file.size) + ')<b> </b><span class="remove_files icon-remove"></span>' +
							'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>' +
							'</div>';

						//判断该 元素 是否存在
						//						if(null == document.getElementById('file-list-3')) {} else {
						//							document.getElementById('file-list-3').innerHTML = '';
						//						};

						$(".remove_files").click(function() {
							$(this).parent().remove();
							var _osskey_bmjx = window.sessionStorage.getItem("_osskey_bmjx");
							if(_osskey_bmjx == null) {} else {
								sessionStorage.removeItem("_osskey_bmjx"); //移除
							};
						});
					});
				},
				//当队列中的某一个文件正要开始上传前触发
				BeforeUpload: function(up, file) {
					prefilename = get_prefilename(); // 文件名前缀（14位时间戳+5位随机数）
					_osskey = key + '/'; // 模块名
					//<li title=""> += prefilename.substr(0, 8) + '/'; // 8位日期文件夹
					_osskey += prefilename + get_suffix(file.name); //file.name; // 文件名
					var _osskeyfileName = file.name;
					var _attachments = [],
						_attachmentsStr = {};
					_attachmentsStr.qcfilekey = _osskey;
					_attachmentsStr.qcfilename = _osskeyfileName;
					_attachments.push(_attachmentsStr);
					_attachmentss = JSON.stringify(_attachments);

					window.sessionStorage.setItem("_osskey_bmjx", _attachmentss);

					set_upload_param(up, _osskey, false);
				},
				//会在文件上传过程中不断触发，可以用此事件来显示上传进度
				UploadProgress: function(up, file) {

					var d = document.getElementById(file.id);
					if(d) {
						d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
						var prog = d.getElementsByTagName('div')[0];
						var progBar = prog.getElementsByTagName('div')[0];
						prog.style.width = 200 + 'px';
						progBar.style.width = 2 * file.percent + 'px';
						progBar.setAttribute('aria-valuenow', file.percent);
					}

				},
				//当队列中的某一个文件上传完成后触发
				FileUploaded: function(up, file, info) {
					Array.prototype.contains = function(obj) {
						var i = this.length;
						while(i--) {
							if(this[i] === obj) {
								return true;
							}
						}
						return false;
					}

					if(info.status == 200) {
						if(!_osskeyArr.contains(_osskey))
							_osskeyArr.push(_osskey);
						//console.log(osskey);		//文件名称
						//console.log(file.name);			//文件名称
						//$(".progress").remove(); //上传完成清除进度条
					} else {
						_isUploadSuccess = false;
						//clearuploadinfo();
						cb({
							result: false,
							_osskey: ''
						});
					}
				},
				//当上传队列中所有文件都上传完成后触发
				UploadComplete: function(up, files) {
					if(_osskeyArr.join(',')) {
						cb({
							result: true,
							_osskey: _osskeyArr.join(',')
						});
					} else {
						cb({
							result: false,
							_osskey: ''
						});
					}
					//clearuploadinfo();
				},
				//当发生错误时触发
				Error: function(up, err) {
					if(err.code == -600) {
						document.getElementById('console').appendChild(document.createTextNode("\n选择的文件太大了，目前仅支持上传10MB以内的文件！"));
					} else if(err.code == -601) {
						document.getElementById('console').appendChild(document.createTextNode("\n选择的文件后缀不对，目前仅支持 jpg,gif,png,bmp / zip,rar 格式"));
					} else if(err.code == -602) {
						document.getElementById('console').appendChild(document.createTextNode("\n这个文件已经在文件列表中"));
					} else {
						document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
					}
				}
			}
		});
		uploader.init();
	}
})(jQuery)