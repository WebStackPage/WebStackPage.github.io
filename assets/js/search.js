document.writeln("<!-- 搜索栏	 -->");
document.writeln("	<div id=\'search\'class=\'s-search\'>");
document.writeln(" <iframe width=\"100%\"  height=\"60\"   frameborder=\"0\" allowtransparency=\"true\" src=\"//i.tianqi.com/index.php?c=code&id=12&icon=1&num=5&site=12\"></iframe>");
document.writeln("					<div id=\'search-list\'class=\'hide-type-list\'>");
document.writeln("						<div class=\'s-type\'>");
document.writeln("							<span></span>");
document.writeln("							<div class=\'s-type-list\'>");
document.writeln("							<label for=\'type-baidu\'><span class=\'tile-lg bg-blue\'><i class=\'fa fa-search fa-2x m-t-sm\'></i></span>默认</label><label for=\'type-xueshu\'><span class=\'tile-lg bg-teal\'><i class=\'fa fa-book fa-2x m-t-sm\'></i></span>学术</label><label for=\'type-yinshi\'><span class=\'tile-lg bg-pink\'><i class=\'fa fa-video-camera fa-2x m-t-sm\'></i></span>影视</label>");
document.writeln("							<label for=\'type-yinle\'><span class=\'tile-lg bg-yl\'><i class=\'fa fa-music fa-2x m-t-sm\'></i></span>音乐</label> <label for=\'type-gongju\'><span class=\'tile-lg bg-gj\'><i class=\'fa fa-legal fa-2x m-t-sm\'></i></span>工具</label><label for=\'type-tupian\'><span class=\'tile-lg bg-tp\'><i class=\'fa fa-file-image-o fa-2x m-t-sm\'></i></span>图片</label>");
document.writeln("							<label for=\'type-shequ\'><span class=\'tile-lg bg-sq\'><i class=\'fa fa-github fa-2x m-t-sm\'></i></span>社区</label><label for=\'type-sucai\'><span class=\'tile-lg bg-sc\'><i class=\'fa fa-tree fa-2x m-t-sm\'></i></span>素材</label><label for=\'type-shenghuo\'><span class=\'tile-lg bg-red\'><i class=\'fa fa-coffee fa-2x m-t-sm\'></i></span>生活</label>");
document.writeln("							</div>");
document.writeln("						</div>");

document.writeln("                                                <div class=\'search-group group-c\'>");

document.writeln("						<span class=\'type-text\'>默认</span>");
document.writeln("							<ul class=\'search-type\'>");

document.writeln("<li><input checked hidden type=\'radio\'name=\'type\'id=\'type-baidu\'value=\'https://www.baidu.com/s?wd=\'data-placeholder=\'百度一下\'><label for=\'type-baidu\'><span style=\'color:#003daa\'>百度</span></label></li>");
document.writeln("");
document.writeln("");document.writeln("<li><input checked hidden type=\'radio\'name=\'type\'id=\'type-maji\'value=\'https://magi.com/search?q=\'data-placeholder=\'智能引擎\'><label for=\'type-maji\'><span style=\'color:#003daa\'>MAGI</span></label></li>");
document.writeln("");

document.writeln("");document.writeln("<li><input checked hidden type=\'radio\'name=\'type\'id=\'type-mijisou\'value=\'https://mijisou.com/?q=\'data-placeholder=\'匿名搜索\'><label for=\'type-mijisou\'><span style=\'color:#003daa\'>秘迹</span></label></li>");
document.writeln("");


document.writeln("<li><input checked hidden type=\'radio\'name=\'type\'id=\'type-google2\'value=\'https://www.google.com.hk/search?query=\'data-placeholder=\'谷歌搜索\'><label for=\'type-google2\'><span style=\'color:#003daa\'>谷歌</span></label></li>");


document.writeln("<li><input checked hidden type=\'radio\'name=\'type\'id=\'type-panduoduo\'value=\'http://www.panduoduo.net/s/name/\'data-placeholder=\'文件搜索\'><label for=\'type-panduoduo\'><span style=\'color:#003daa\'>网盘</span></label></li>");
document.writeln("");
document.writeln("");
document.writeln("<li><input checked hidden type=\'radio\'name=\'type\'id=\'type-ditu\'value=\'https://ditu.amap.com/search?query=\'data-placeholder=\'高德地图\'><label for=\'type-ditu\'><span style=\'color:#003daa\'>地图</span></label></li>");
document.writeln("");
document.writeln("<li><input checked hidden type=\'radio\'name=\'type\'id=\'type-zhihu\'value=\'https://www.zhihu.com/search?q=\'data-placeholder=\'有问题上知乎\'><label for=\'type-zhihu\'><span style=\'color:#003daa\'>知乎</span></label></li>");
document.writeln("");
document.writeln("");
document.writeln("<li><input checked hidden type=\'radio\'name=\'type\'id=\'type-yinyue\'value=\'https://music.163.com/#/search/m/?s=\'data-placeholder=\'网易云音乐\'><label for=\'type-yinyue\'><span style=\'color:#003daa\'>云村</span></label></li>");
document.writeln("<li><input hidden type=\"radio\" name=\"type\" id=\"type-bilibili\" value=\"https://search.bilibili.com/all?keyword=\" data-placeholder=\"哔哩哔哩\"><label for=\"type-bilibili\"><span style=\"color:#003daa\">B站</span></label></li>						");
document.writeln("<li><input hidden type=\"radio\" name=\"type\" id=\"type-github\" value=\"https://github.com/search?q=\" data-placeholder=\"Github\"><label for=\"type-github\"><span style=\"color:#003daa\">Github</span></label></li>						");


document.writeln("							</ul>");
document.writeln("						</div>	");



document.writeln("						<div class=\'search-group group-a s-current\'>");
document.writeln("      <span class=\"type-text\">学术</span>");
document.writeln("      <ul class=\"search-type\">");
document.writeln("		<li><input hidden=\"\" type=\"radio\" name=\"type\" id=\"type-xueshu\" value=\"http://xueshu.baidu.com/s?wd=\" data-placeholder=\"百度学术\"><label for=\"type-xueshu\"><span style=\"color:#003daa\">百度</span></label></li>		");
document.writeln("    	<li><input hidden=\"\" type=\"radio\" name=\"type\" id=\"type-biyingxueshu\" value=\"http://cn.bing.com/academic/search?q=\" data-placeholder=\"必应学术\"><label for=\"type-biyingxueshu\"><span style=\"color:#003daa\">必应</span></label></li>		");
document.writeln("		<li><input hidden=\"\" type=\"radio\" name=\"type\" id=\"type-zhiwang\" value=\"http://kns.cnki.net/kns/brief/Default_Result.aspx?code=SCDB&amp;kw=\" data-placeholder=\"知网文献\"><label for=\"type-zhiwang\"><span style=\"color:#003daa\">知网</span></label></li>		");
document.writeln("		<li><input hidden=\"\" type=\"radio\" name=\"type\" id=\"type-xiaomuchou\" value=\"http://muchong.com/bbs/search.php?wd=\" data-placeholder=\"学术科研\"><label for=\"type-xiaomuchou\"><span style=\"color:#003daa\">小木虫</span></label></li>		");
document.writeln("		<li><input hidden=\"\" type=\"radio\" name=\"type\" id=\"type-wanfang\" value=\"http://s.wanfangdata.com.cn/Paper.aspx?q=\" data-placeholder=\"万方论文\"><label for=\"type-wanfang\"><span style=\"color:#003daa\">万方</span></label></li>		");
document.writeln("		<li><input hidden=\"\" type=\"radio\" name=\"type\" id=\"type-yingxiangyinzhi\" value=\"http://www.letpub.com.cn/index.php?page=journalapp&amp;view=search&amp;searchname=\" data-placeholder=\"SCI查询\"><label for=\"type-yingxiangyinzhi\"><span style=\"color:#003daa\">影响因子</span></label></li>		");
document.writeln("		<li><input hidden=\"\" type=\"radio\" name=\"type\" id=\"type-iData\" value=\"https://search.ehn3.com/search?keyword=\" data-placeholder=\"知识检索\"><label for=\"type-iData\"><span style=\"color:#003daa\">iData</span></label></li>		");
document.writeln("");
document.writeln("      </ul>");
document.writeln("</div>");


document.writeln("                                                <div class=\'search-group group-b\'>");
document.writeln("                                              <span class=\'type-text\'>影视</span>");
document.writeln("							<ul class=\'search-type\'>");
document.writeln("<li><input hidden type=\'radio\'name=\'type\'id=\'type-yinshi\'value=\'http://www.nicotv.club/video/search/\'data-placeholder=\'妮可动漫搜索\'><label for=\'type-yinshi\'><span style=\'color:#003daa\'>妮可影视</span></label></li>");
document.writeln("							   ");
document.writeln("<li><input hidden type=\'radio\'name=\'type\'id=\'type-Neets\'value=\'https://neets.cc/search?key=\'data-placeholder=\'Neets搜索\'><label for=\'type-Neets\'><span style=\'color:#003daa\'>Neets</span></label></li>");
document.writeln("								");
document.writeln("<li><input hidden type=\'radio\'name=\'type\'id=\'type-bashi\'value=\'http://www.74mz.com/search?wd=\'data-placeholder=\'巴士动漫电影网\'><label for=\'type-bashi\'><span style=\'color:#003daa\'>巴士动漫</span></label></li>");
document.writeln("								");
document.writeln("<li><input hidden type=\'radio\'name=\'type\'id=\'type-ckdiany\'value=\'https://www.ck180.net/search.html?q=\'data-placeholder=\'CK电影部落 \'><label for=\'type-ckdiany\'><span style=\'color:#003daa\'>CK电影</span></label></li>");
document.writeln("");
document.writeln("<li><input hidden type=\'radio\'name=\'type\'id=\'type-fenghk\'value=\'http://ifkdy.com/?q=\'data-placeholder=\'疯狂电影搜索\'><label for=\'type-fenghk\'><span style=\'color:#003daa\'>疯狂电影</span></label></li>	");
document.writeln("							</ul>");
document.writeln("</div>	");
document.writeln("");
document.writeln("");
document.writeln("<div class=\'search-group group-d\'>");
document.writeln("	<span class=\'type-text\'>音乐</span>");
document.writeln("	<ul class=\'search-type\'>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-yinle\' value=\'http://music.163.com/#/search/m/?s=\' data-placeholder=\'网易云音乐\'><label for=\'type-yinle\'><span style=\'color:#003daa\'>云音乐</span></label></li>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-xiami\' value=\'http://www.xiami.com/search?key=\' data-placeholder=\'虾米音乐\'><label for=\'type-xiami\'><span style=\'color:#003daa\'>虾米</span></label></li>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-qq-music\' value=\'https://y.qq.com/portal/search.html#searchid=1&amp;remoteplace=txt.yqq.top&amp;t=song&amp;w=\' data-placeholder=\'QQ音乐\'><label for=\'type-qq-music\'><span style=\'color:#003daa\'>QQ音乐</span></label></li>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-ape8\' value=\'http://sou.kuwo.cn/ws/NSearch?type=all&catalog=yueku2016&key=\' data-placeholder=\'酷我音乐\'><label for=\'type-ape8\'><span style=\'color:#003daa\'>酷我音乐</span></label></li>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-soundcloud\' value=\'https://www.kugou.com/yy/html/search.html#searchType=song&searchKeyWord=\' data-placeholder=\'酷狗音乐\'><label for=\'type-soundcloud\'><span style=\'color:#003daa\'>酷狗音乐</span></label></li>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-baidu-music\' value=\'http://music.baidu.com/search?key=\' data-placeholder=\'千千音乐\'><label for=\'type-baidu-music\'><span style=\'color:#003daa\'>千千音乐</span></label></li>");
document.writeln("	</ul>");
document.writeln("</div>");
document.writeln("<div class=\'search-group group-e\'>");
document.writeln("      <span class=\'type-text\'>工具</span>");
document.writeln("      <ul class=\'search-type\'>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-gongju\' value=\'http://rank.chinaz.com/all/\' data-placeholder=\'请输入网址(不带http://)\'><label for=\'type-gongju\'><span style=\'color:#003daa\'>权重查询</span></label></li>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-links\' value=\'http://link.chinaz.com/\' data-placeholder=\'请输入网址(不带http://)\'><label for=\'type-links\'><span style=\'color:#003daa\'>友链检测</span></label></li>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-icp\' value=\'https://icp.aizhan.com/\' data-placeholder=\'请输入网址(不带http://)\'><label for=\'type-icp\'><span style=\'color:#003daa\'>备案查询</span></label></li>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-ping\' value=\'http://ping.chinaz.com/\' data-placeholder=\'请输入网址(不带http://)\'><label for=\'type-ping\'><span style=\'color:#003daa\'>PING检测</span></label></li>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-404\' value=\'http://tool.chinaz.com/Links/?DAddress=\' data-placeholder=\'请输入网址(不带http://)\'><label for=\'type-404\'><span style=\'color:#003daa\'>死链检测</span></label></li>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-ciku\' value=\'http://www.ciku5.com/s?wd=\' data-placeholder=\'请输入关键词\'><label for=\'type-ciku\'><span style=\'color:#003daa\'>关键词挖掘</span></label></li>");
document.writeln("      </ul>");
document.writeln("</div>");
document.writeln("<div class=\'search-group group-f\'>");
document.writeln("	<span class=\'type-text\'>图片</span>");
document.writeln("	<ul class=\'search-type\'>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-tupian\' value=\'http://image.baidu.com/search/index?tn=baiduimage&amp;ps=1&amp;ct=201326592&amp;lm=-1&amp;cl=2&amp;nc=1&amp;ie=utf-8&amp;word=\' data-placeholder=\'搜索百度图片\'><label for=\'type-tupian\'><span style=\'color:#003daa\'>百度</span></label></li>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-hellorf\' value=\'http://www.hellorf.com/photo/search/all/\' data-placeholder=\'海洛图库\'><label for=\'type-hellorf\'><span style=\'color:#003daa\'>海洛图库</span></label></li>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-BING\' value=\'http://cn.bing.com/images/search?q=\' data-placeholder=\'BING搜索引擎\'><label for=\'type-BING\'><span style=\'color:#003daa\'>Bing</span></label></li>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-500px\' value=\'https://500px.com/search?q=\' data-placeholder=\'500PX 品质摄影社区\'><label for=\'type-500px\'><span style=\'color:#003daa\'>500PX</span></label></li>");
document.writeln("	</ul>");
document.writeln("</div>");
document.writeln("<div class=\'search-group group-g\'>");
document.writeln("      <span class=\'type-text\'>社区</span>");
document.writeln("      <ul class=\'search-type\'>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-shequ\' value=\'https://www.zhihu.com/search?type=content&amp;q=\' data-placeholder=\'知乎\'><label for=\'type-shequ\'><span style=\'color:#003daa\'>知乎</span></label></li>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-wechat\' value=\'http://weixin.sogou.com/weixin?type=2&amp;query=\' data-placeholder=\'微信\'><label for=\'type-wechat\'><span style=\'color:#003daa\'>微信</span></label></li>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-weiboo\' value=\'http://s.weibo.com/weibo/\' data-placeholder=\'微博\'><label for=\'type-weiboo\'><span style=\'color:#003daa\'>微博</span></label></li>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-doubann\' value=\'https://www.douban.com/search?q=\' data-placeholder=\'豆瓣\'><label for=\'type-doubann\'><span style=\'color:#003daa\'>豆瓣</span></label></li>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-whyy\' value=\'https://ask.seowhy.com/search/?q=\' data-placeholder=\'SEO问答社区\'><label for=\'type-whyy\'><span style=\'color:#003daa\'>搜外问答</span></label></li>");
document.writeln("      </ul>");
document.writeln("</div>		");
document.writeln("<div class=\'search-group group-h\'>");
document.writeln("	<span class=\'type-text\'>素材</span>");
document.writeln("	<ul class=\'search-type\'>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-sucai\' value=\'http://so.shejidaren.com/cse/search?s=1461928278188833482&amp;q=\' data-placeholder=\'设计达人\'><label for=\'type-sucai\'><span style=\'color:#003daa\'>设计达人</span></label></li>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-freebiesbug\' value=\'https://freebiesbug.com/?s=\' data-placeholder=\'搜索freebiesbug上的 UI 素材\'><label for=\'type-freebiesbug\'><span style=\'color:#003daa\'>UI</span></label></li>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-zcool\' value=\'http://www.zcool.com.cn/tosearch.do?page=4&amp;f=hb&amp;world=\' data-placeholder=\'站酷素材\'><label for=\'type-zcool\'><span style=\'color:#003daa\'>站酷素材</span></label></li>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-nipic\' value=\'http://soso.nipic.com/?q=\' data-placeholder=\'呢图\'><label for=\'type-nipic\'><span style=\'color:#003daa\'>呢图</span></label></li>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-iconfinder\' value=\'https://www.iconfinder.com/search/?q=\' data-placeholder=\'IconFinder\'><label for=\'type-iconfinder\'><span style=\'color:#003daa\'>IconFinder</span></label></li>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-thenounproject\' value=\'https://thenounproject.com/search/?q=\' data-placeholder=\'Noun Project\'><label for=\'type-thenounproject\'><span style=\'color:#003daa\'>Noun Project</span></label></li>");
document.writeln("		<li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-officeplus\' value=\'http://www.officeplus.cn/List.shtml?cat=\' data-placeholder=\'Office Plus\'><label for=\'type-officeplus\'><span style=\'color:#003daa\'>PPT</span></label></li>");
document.writeln("	</ul>");
document.writeln("</div>	");
document.writeln("<div class=\'search-group group-y\'>");
document.writeln("      <span class=\'type-text\'>生活</span>");
document.writeln("      <ul class=\'search-type\'>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-shenghuo\' value=\'https://s.taobao.com/search?q=\' data-placeholder=\'淘宝\'><label for=\'type-shenghuo\'><span style=\'color:#003daa\'>淘宝</span></label></li>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-jd\' value=\'https://search.jd.com/Search?keyword=\' data-placeholder=\'京东\'><label for=\'type-jd\'><span style=\'color:#003daa\'>京东</span></label></li>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-xiachufang\' value=\'http://www.xiachufang.com/search/?keyword=\' data-placeholder=\'下厨房\'><label for=\'type-xiachufang\'><span style=\'color:#003daa\'>下厨房</span></label></li>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-xiangha\' value=\'https://www.xiangha.com/so/?q=caipu&amp;s=\' data-placeholder=\'香哈菜谱\'><label for=\'type-xiangha\'><span style=\'color:#003daa\'>香哈菜谱</span></label></li>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-12306\' value=\'http://www.12306.cn/?\' data-placeholder=\'12306\'><label for=\'type-12306\'><span style=\'color:#003daa\'>12306</span></label></li>");
document.writeln("        <li><input hidden=\'\' type=\'radio\' name=\'type\' id=\'type-qunar\' value=\'https://www.qunar.com/?\' data-placeholder=\'去哪儿\'><label for=\'type-qunar\'><span style=\'color:#003daa\'>去哪儿</span></label></li>");
document.writeln("        <li><input checked hidden type=\'radio\'name=\'type\'id=\'type-kuaidi2\'value=\'https://m.kuaidi100.com/result.jsp?nu=\'data-placeholder=\'输入快递单号\'><label for=\'type-kuaidi2\'><span style=\'color:#003daa\'>快递</span></label></li>");
document.writeln("");
document.writeln("      </ul>");
document.writeln("    </div>");
document.writeln("					</div>");
document.writeln("					<form  height=\"50px\"  action=\'https://www.baidu.com/s?wd=\'method=\'get\'target=\'_blank\'id=\'super-search-fm\'>");
document.writeln("						<input type=\'text\'id=\'search-text\'placeholder=\'百度一下\'style=\'outline:none\'autofocus/><button type=\'submit\'><i class=\'fa fa-search\'></i></button>");
document.writeln("					</form>");
document.writeln("					  <div class=\'set-check hidden-xs\'>");
document.writeln("    <input id=\'set-search-blank\'>");
document.writeln("  </div>");
document.writeln("</div>	");
document.writeln("<!-- END搜索栏	   -->");
  var __search ='www.open356.com',__develop ='seogo.me', __Ox1467e = ["checked", "input[name=\"type\"][value=\"", "\"]", "querySelector", "length", "s-current",
                        "remove", "classList", "add", "parentNode", "superSearch", "setItem", "localStorage", "getItem", "target", "value",
                        "type", "focus", "newWindow", "preventDefault", "", "action", "open", "href", "input[name=\"type\"]:checked",
                        "data-placeholder", "getAttribute", "placeholder", "setAttribute", "_blank", "removeAttribute",
                        "input[name=\"type\"]", "querySelectorAll", "#super-search-fm", "#search-text", "#set-search-blank",
                        ".search-group", "change", "addEventListener", "submit"
                ];             
  !function(){function _0x3bccx1(){_0x3bccx2(),_0x3bccx3(),_0x3bccx5(),_0x3bccx6()}function _0x3bccx2(){_0x3bccx17[__Ox1467e[0]]= _0x3bccxf()}function _0x3bccx3(){var _0x3bccx4=document[__Ox1467e[3]](__Ox1467e[1]+ _0x3bccxc()+ __Ox1467e[2]);_0x3bccx4&& (_0x3bccx4[__Ox1467e[0]]= !0,_0x3bccx7(_0x3bccx4))}function _0x3bccx5(){_0x3bccx12(_0x3bccx11())}function _0x3bccx6(){_0x3bccx13(_0x3bccx10())}function _0x3bccx7(_0x3bccx4){for(var _0x3bccx8=0;_0x3bccx8< _0x3bccx18[__Ox1467e[4]];_0x3bccx8++){_0x3bccx18[_0x3bccx8][__Ox1467e[7]][__Ox1467e[6]](__Ox1467e[5])};_0x3bccx4[__Ox1467e[9]][__Ox1467e[9]][__Ox1467e[9]][__Ox1467e[7]][__Ox1467e[8]](__Ox1467e[5])}function _0x3bccx9(_0x3bccx4,_0x3bccx8){window[__Ox1467e[12]][__Ox1467e[11]](__Ox1467e[10]+ _0x3bccx4,_0x3bccx8)}function _0x3bccxa(_0x3bccx4){return window[__Ox1467e[12]][__Ox1467e[13]](__Ox1467e[10]+ _0x3bccx4)}function _0x3bccxb(_0x3bccx4){_0x3bccx19= _0x3bccx4[__Ox1467e[14]],_0x3bccx12(_0x3bccx11()),_0x3bccx13(_0x3bccx4[__Ox1467e[14]][__Ox1467e[15]]),_0x3bccx9(__Ox1467e[16],_0x3bccx4[__Ox1467e[14]][__Ox1467e[15]]),_0x3bccx16[__Ox1467e[17]](),_0x3bccx7(_0x3bccx4[__Ox1467e[14]])}function _0x3bccxc(){var _0x3bccx8=_0x3bccxa(__Ox1467e[16]);return _0x3bccx8|| _0x3bccx4[0][__Ox1467e[15]]}function _0x3bccxd(_0x3bccx4){_0x3bccx9(__Ox1467e[18],_0x3bccx4[__Ox1467e[14]][__Ox1467e[0]]?1:-1),_0x3bccx14(_0x3bccx4[__Ox1467e[14]][__Ox1467e[0]])}function _0x3bccxe(_0x3bccx4){return _0x3bccx4[__Ox1467e[19]](),__Ox1467e[20]== _0x3bccx16[__Ox1467e[15]]?(_0x3bccx16[__Ox1467e[17]](),!1):(_0x3bccx13(_0x3bccx10()+ _0x3bccx16[__Ox1467e[15]]),_0x3bccx14(_0x3bccxf()),_0x3bccxf()?window[__Ox1467e[22]](_0x3bccx8[__Ox1467e[21]],+ new Date):location[__Ox1467e[23]]= _0x3bccx8[__Ox1467e[21]],void(0))}function _0x3bccxf(){var _0x3bccx4=_0x3bccxa(__Ox1467e[18]);return _0x3bccx4?1== _0x3bccx4:!0}function _0x3bccx10(){return document[__Ox1467e[3]](__Ox1467e[24])[__Ox1467e[15]]}function _0x3bccx11(){return document[__Ox1467e[3]](__Ox1467e[24])[__Ox1467e[26]](__Ox1467e[25])}function _0x3bccx12(_0x3bccx4){_0x3bccx16[__Ox1467e[28]](__Ox1467e[27],_0x3bccx4)}function _0x3bccx13(_0x3bccx4){_0x3bccx8[__Ox1467e[21]]= _0x3bccx4}function _0x3bccx14(_0x3bccx4){_0x3bccx4?_0x3bccx8[__Ox1467e[14]]= __Ox1467e[29]:_0x3bccx8[__Ox1467e[30]](__Ox1467e[14])}var _0x3bccx15,_0x3bccx4=document[__Ox1467e[32]](__Ox1467e[31]),_0x3bccx8=document[__Ox1467e[3]](__Ox1467e[33]),_0x3bccx16=document[__Ox1467e[3]](__Ox1467e[34]),_0x3bccx17=document[__Ox1467e[3]](__Ox1467e[35]),_0x3bccx18=document[__Ox1467e[32]](__Ox1467e[36]),_0x3bccx19=_0x3bccx4[0];for(_0x3bccx1(),_0x3bccx15= 0;_0x3bccx15< _0x3bccx4[__Ox1467e[4]];_0x3bccx15++){_0x3bccx4[_0x3bccx15][__Ox1467e[38]](__Ox1467e[37],_0x3bccxb)};_0x3bccx17[__Ox1467e[38]](__Ox1467e[37],_0x3bccxd),_0x3bccx8[__Ox1467e[38]](__Ox1467e[39],_0x3bccxe)}()
 
     
