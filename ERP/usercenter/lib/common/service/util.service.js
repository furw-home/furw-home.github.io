(function() {
	/**
	 * 作者: furw
	 * 描述: 基础配置
	 */
	var utilModule = angular.module('utilModule', ["configModule"]);

	//公共service
	utilModule.factory('utilService', function(configService) {

		var service = {};

		//登陆服务url
		service.SERVICE_URL = configService.SERVICE_URL;

		//质检管理服务
		service.ZJGL_SERVICE_URL = configService.ZJGL_SERVICE_URL;
		
		//绩效管理服务
		service.JXGL_SERVICE_URL = configService.JXGL_SERVICE_URL;

		//获取当前用户信息
		service.USER_NAME = window.sessionStorage.getItem("userName");

		//页面跳转地址
		service.ADDRESS = configService.ADDRESS;

		//获取当前用户 ticket;
		service.TICKET = sessionStorage.getItem("ticket");

		//获取当前系统时间
		service.getDataTime = function() {
			var mydate = new Date();
			var str = "" + mydate.getFullYear() + "年";
			str += (mydate.getMonth() + 1) + "月";
			str += mydate.getDate() + "日";
			return str;
		};

		//会话缓存
		service.session = function() {
			return {
				//存储单个属性
				set: function(key, value) {
					sessionStorage.setItem(key, value);
				},
				//读取单个属性
				get: function(key) {
					return sessionStorage.getItem(key);
				},
				//存储对象，以JSON格式存储
				setObject: function(key, value) {
					sessionStorage.setItem(key, JSON.stringify(value));
				},
				//读取对象
				getObject: function(key) {
					return JSON.parse(sessionStorage.getItem(key) || '{}');
				}
			}
		};

		//获取父级页面作用域
		service.getParentScope = function(ctrlId) {
			var domBody = parent.window.document.getElementsByTagName(ctrlId)[0];
			var scope = parent.angular.element(domBody).scope();
			return scope;
		};

		//获取网站虚拟路径根目录
		service.getRootPath = function() {
			var strFullPath = window.document.location.href;
			var strPath = window.document.location.pathname;
			var pos = strFullPath.indexOf(strPath);
			var prePath = strFullPath.substring(0, pos);
			var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
			return(prePath + postPath);
		};

		//测试服务器拼接 page 目录
		service.IS_SPELL = configService.IS_SPELL;

		return service;
	});

})();