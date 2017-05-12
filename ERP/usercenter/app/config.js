(function() {
	/**
	 * 作者: furw
	 * 描述: 全局参数配置
	 */
	angular.module('configModule', [])
		.factory('configService', function() {
 
			var config = {};

			// 运行环境 ( 1为本地[localhost], 2为测试服务器[51服], 3为正式环境[120服] );
			var runtimeEnvironment = 1;

			//运行环境
			if(runtimeEnvironment == 1) { //本地

				//登陆接口 服务url (51 测试地址)
				config.SERVICE_URL = "http://123.56.106.51:8888/ep_upms/";
				//质检管理 服务url (51 测试地址)
				config.ZJGL_SERVICE_URL = "http://test.98ep.com:9001/zj_project/";
				//绩效管理 服务url (51 测试地址)
				config.JXGL_SERVICE_URL = "http://182.92.97.52:1133/Achievement_Project/";

				//不需要更改 （ 值为false ）
				config.IS_SPELL = false;
				//页面跳转地址配置 （本地）
				config.ADDRESS = "/usercenter/app/views";

			} else if(runtimeEnvironment == 2) { //测试服务器

				//登陆接口 服务url (51 测试地址)
				config.SERVICE_URL = "http://123.56.106.51:8888/ep_upms/";
				//质检管理 服务url (51 测试地址)
				config.ZJGL_SERVICE_URL = "http://test.98ep.com:9001/zj_project/";
				//绩效管理 服务url (51 测试地址)
				config.JXGL_SERVICE_URL = "http://182.92.97.52:1133/Achievement_Project/";

				//测试服务器拼接 page 目录
				config.IS_SPELL = true;
				//页面跳转地址配置 （51 测试服）
				config.ADDRESS = "/page/usercenter/app/views";

			} else { //正式服务器

				//登陆接口 服务url（120 正式地址）
				config.SERVICE_URL = "http://123.56.165.120:9999/ep_upms/";
				//质检管理 服务url (120 正式地址)
				config.ZJGL_SERVICE_URL = "http://nb.98ep.com/zj_project/";
				//绩效管理 服务url (120 正式地址)
				config.JXGL_SERVICE_URL = "http://nb.98ep.com/Achievement_project/";

				//不需要更改 （ 值为false ）
				config.IS_SPELL = false;
				//页面跳转地址配置 （120 测试服）
				config.ADDRESS = "/usercenter/app/views";

			};

			//Grid 分页大小
			config.PAGE_SIZE = 10;

			return config;

		});
})();