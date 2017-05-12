(function() {
	/**
	 * 作者: furw
	 * 描述: 绩效分配明细 module
	 */
	var jxfpmxModule = angular.module('jxfpmxModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 绩效分配明细 控制器
	 */
	jxfpmxModule.controller('jxfpmxCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var window_czjl, // 操作记录
				window_sc, //上传
				grid, //Grid
				columns, //Grid 列
				config, //grid 配置
				recordGrid,
				recordColumns,
				recordConfig;
			var _data;

			//初始化
			$scope.init = function() {
				$scope.initGrid(); // 初始化 grid
			};

			//初始化 grid
			$scope.initGrid = function() {
				grid = uiService.createGrid(columns, config);
			};

			//Grid 配置
			config = {
				dataSouce: utilService.JXGL_SERVICE_URL + "PerDetai/getlist", //URL
				divId: "grid", //grid id
				sortable: false, // 排序
				pageable: true, //分页
				scrollable: false, //可滚动
			};

			//recordGrid 配置
			recordConfig = {
				dataSouce: utilService.JXGL_SERVICE_URL + "PerDetai/FileList", //URL
				divId: "recordGrid", //grid id
				sortable: false, // 排序
				pageable: false, //分页
				scrollable: false, //可滚动
			};

			//实例化一个plupload上传对象
			var uploader = new plupload.Uploader({
				runtimes: 'html5,flash,silverlight,html4',
				browse_button: 'browse', //触发文件选择对话框的按钮，为那个元素id
				url: utilService.JXGL_SERVICE_URL + 'PerDetai/FileUpLoad', //服务器端的上传页面地址
				filters: {
//					mime_types: [ //只允许上传zip,rar文件
//						{
//							title: "Zip files",
//							extensions: "zip,rar"
//						}
//					],
				},
			});

			//初始化upload
			uploader.init();

			//绑定文件添加进队列事件
			uploader.bind('FilesAdded', function(uploader, files) {
				$("#file-list").html(""); //清空
				for(var i = 0, len = files.length; i < len; i++) {
					var file_name = files[i].name; //文件名
					//构造html来更新UI
					var html = '<div id="file-' + files[i].id + '"><p class="file-name">' + file_name + '</p><p class="progress"></p></div>';
					$(html).appendTo('#file-list');
				}
			});

			//绑定文件添加进队列事件
			uploader.bind('UploadProgress', function(up, file) {
				$("#file-list .progress").css("width", file.percent + "%")
			});

			//上传成功后
			uploader.bind('FileUploaded', function(up, file, res) {
				window_sc.close();
				uiService.alert("上传文件成功！");
				grid.reload();
			});

			//上传失败
			uploader.bind('Error', function(up, err) {
				if(err.code == -600) {
					alert("\n选择的文件太大了，目前仅支持上传10MB以内的文件！");
				} else if(err.code == -601) {
					alert("\n选择的文件后缀不对，目前仅支持 zip,rar 格式");
				} else if(err.code == -602) {
					alert("\n这个文件已经在文件列表中")
				} else {
					//alert("\nError xml:" + err.response);
				}
			});

			//开始上传
			$("#upload-btn").click(function() {
				//获取 ticket
				var ticket = utilService.TICKET;
				var remark = $("#remark").val();
				uploader.settings.url = utilService.JXGL_SERVICE_URL + "PerDetai/FileUpLoad";
				uploader.settings.url = uploader.settings.url + "?ticket=" + ticket + '&year=' + _data.Year + "&month=" + _data.Month;
				uploader.setOption("multipart_params", {
					"Remark": remark
				});
				uploader.start();
			});

			//grid 配置
			columns = [{
				field: "ShowTime",
				title: "时间",
				headerAttributes: { // 设置样式
					style: "text-align: center;" //该列文本居中显示
				},
			}, {
				command: [ //对行数据的操作
					{
						text: "上传", //名称
						click: uploadFun //自定义编辑事件
					}, {
						text: "操作记录",
						click: recordFun
					}
				],
				title: "分配表", //表头名称
				headerAttributes: { // 设置样式
					style: "text-align: center;" //该列文本居中显示
				},
			}];

			//recordColumns 配置
			recordColumns = [{
				field: "No",
				title: "序号",
				template: "#= ++record #",
				sortable: false,
				width: 50
			}, {
				field: "fileName",
				title: "文件名称"
			}, {
				field: "CreatedTime",
				title: "创建时间",
				width: 150
			}, {
				field: "Creator",
				title: "创建人登录账户"
			}, {
				field: "CreatorName",
				title: "创建人姓名"
			}, {
				field: "Remark",
				title: "文件说明"
			}, {
				field: "fileName",
				title: "下载",
				attributes: {
					onclick: 'downCount(this)',
					style: "color:blue; text-align: left;height:5px;padding-left: 10px;text-decoration:underline",
					onmouseover: "this.style.cursor='pointer'"
				}
			}];

			//打开上传窗口
			function uploadFun(e) {
				var tr = $(e.target).closest("tr"); // e.target 代表当前行DOM ,获当前选中行
				var data = this.dataItem(tr); // 将当前行数据 存进 data
				$('.k-button-icontext').removeAttr('href'); //去掉a标签中的href属性

				_data = data;

				//配置 window config
				var window_config;
				window_config = {
					divId: "sc_window",
					width: "500px",
					height: "280px",
					title: "上传文件",
					onClose: onClose,
				};

				$("#remark").val("");
				$("#file-list").html("");

				//生成window
				window_sc = uiService.window(window_config);

				//监听关闭事件
				function onClose(e) {
					var breadcrumb = window.parent.document.getElementById("breadcrumb");
					breadcrumb.style.borderBottom = "1px solid #ddd";
				};

			};

			//关闭上传窗口
			$scope.close = function() {
				window_sc.close();
			};

			//实现下载
			downCount = function(this_1) {

				//获取 ticket
				var ticket = utilService.TICKET;

				idsToSend = [];
				var _this = this_1.parentNode.rowIndex - 1;
				var grid1 = $("#recordGrid").data("kendoGrid");
				var ds = grid1.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid1.table.find("tr[data-uid='" + ds[i].uid + "']");
					if(i == _this) {
						idsToSend.push(ds[i]);
					}
				};

				//模拟from 提交 实现下载文件流
				var form = $("<form>");
				form.attr('style', 'display:none');
				form.attr('target', '');
				form.attr('method', 'post');
				form.attr('action', utilService.JXGL_SERVICE_URL + "PerDetai/DownFile" + "?ticket=" + ticket + "&filePath=" + idsToSend[0].filePath + "&fileName=" + idsToSend[0].fileName);
				$('body').append(form);
				form.submit();
			};

			//操作记录
			function recordFun(e) {
				var tr = $(e.target).closest("tr"); // e.target 代表当前行DOM ,获当前选中行
				var data = this.dataItem(tr); // 将当前行数据 存进 data
				$('.k-button-icontext').removeAttr('href'); //去掉a标签中的href属性

				//配置 window config
				var window_config;
				window_config = {
					divId: "czjl_window",
					width: "700px",
					height: "350px",
					title: "操作记录",
					onClose: onClose,
				};

				//初始化
				recordGrid = uiService.createGrid(recordColumns, recordConfig);

				project = {};
				project.year = data.Year;
				project.month = data.Month;

				//操作记录
				recordGrid.search(project);

				//生成window
				window_czjl = uiService.window(window_config);

				//监听关闭事件
				function onClose(e) {
					var breadcrumb = window.parent.document.getElementById("breadcrumb");
					breadcrumb.style.borderBottom = "1px solid #ddd";
				};
			};

		}
	]);
})();