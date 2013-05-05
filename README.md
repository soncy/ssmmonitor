# Server Stock Monitor (服务器存货监控)

监控各IDC的各项产品是否有货，有货邮件通知

## 使用前提

1. 该程序基于Nodejs，请确保你的环境支持，使用`node -v`检查是否已安装Nodejs.
2. 邮件发送依赖sendmail，请确保安装并启动了sendmail，使用`ps aux|grep sendmail`检查sendmail是否启动.


## 安装

### git 安装

使用git安装，确保你的环境已经安装了git，使用`git --version`检查是否安装git
	
		git clone git://github.com/soncy/ssmmonitor.git
		cd ssmmonitor
		node yourserver.js yourmail@email.com -t
	
参数说明： 

1. `yourserver.js` 对应根目录下的js文件，如果要监控Directspace.net的，就执行 `node directspace.net.js yourmail@email.com`
2. `yourmail@email.com`为需要接收通知的邮箱，建议使用能发短信通知的邮箱，支持多个邮箱，使用`,`分割
3. `-t` 为是否发送测试邮件，如果使用该参数，会在启动程序时先发送一份测试邮件到接收邮箱，邮件标题含有`(test mail)`


### download安装

直接下载 <https://github.com/soncy/ssmmonitor/archive/master.zip> ，解压后执行 `git 安装`里的步骤即可


## 说明

邮件的发送地址会是 `servername@ssmmonitor.soncy`，其中`servername`为各监控脚本中定义的`name`，如`directspace.net.js`中的 `name: 'Directspace',`

## 贡献代码

你可以基于ssmmonitor开发自己想要监控的服务商页面，只需要新建一个`yourserver.js`，代码参考`directspace.net.js`或者`buyvm.net.js`即可。

首先，你需要引入ssmmonitor，
	
	var ssmmonitor = require('./lib/ssmmonitor');

接下来，只需要让ssmmonitor启动就可以了
	
	ssmmonitor.start(config);

**config说明:**

	var config = {
    	name: 'Directspace', // 监控服务商名称 
    	url: 'https://eportal.directspace.net/cart.php?gid=22', // 监控的页面
   	 	interval: 120, // 监控频率，单位：秒
    	checkFunc: function(data) { // 检查是否有货方法，data为被监控页面源码内容，该方法返回true则表明有货，返回false会继续监控
        	return !(~data.indexOf('Out of Stock'));
    	},
    	mailSubject: 'Directspace有货啦' // 邮件标题
	};
	
