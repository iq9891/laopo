define("pages/voice_component.js",["biz_common/dom/event.js","biz_common/tmpl.js","pages/loadscript.js","pages/music_player.js","biz_common/dom/class.js","pages/report.js","biz_common/utils/monitor.js"],function(t,e,o,r){
"use strict";
function i(t){
this._o={
type:0,
comment_id:"",
src:"",
mid:"",
songId:"",
autoPlay:!1,
duration:0,
debug:!1,
needVioceMutex:!0,
appPlay:!0,
title:"",
singer:"",
epname:"",
coverImgUrl:"",
webUrl:[location.protocol,"//mp.weixin.qq.com/s?referFrom=#referFrom#&songid=#songId#&__biz=",window.biz,"&mid=",window.mid,"&idx=",window.idx,"&sn=",window.sn,"#wechat_redirect"].join(""),
playingCss:"",
playCssDom:"",
playArea:"",
progress:"",
detailUrl:"",
detailArea:"",
fileSize:0
},this._init(t);
}
function n(t,e,o,r){
I.num++,e.musicSupport=I.musicSupport,e.show_not_support=!1,I.musicSupport||1!=I.num||(e.show_not_support=!0);
var i=document.createElement("div"),n="";
n=r?y.render(t,e):y.tmpl(t,e),i.innerHTML=n;
var s=o.parentNode;
s&&(s.lastChild===o?s.appendChild(i.children[0]):s.insertBefore(i.children[0],o.nextSibling));
}
function s(){
"undefined"==typeof window.reportVoiceid&&(window.reportVoiceid=[]),"undefined"==typeof window.reportMid&&(window.reportMid=[]);
}
function p(){
m.on(window,"unload",a);
}
function a(){
for(var t in I.reportData)g.musicreport({
data:I.reportData[t]
});
}
function c(t){
f.setSum(I.reportId,18,1),f.send();
var e=+new Date,o="//open.music.qq.com/fcgi-bin/fcg_music_get_song_info_weixin.fcg?song_id=#songid#&mid=#mid#&format=json&app_id=1034002693&app_key=cjjDaueOyPYRJFeTqG&device_id=weixin&file_type=mp3&qqmusic_fromtag=50&callback=get_song_info_back";
o=o.replace("#mid#",t.mid).replace("#songid#",t.id),_({
url:o,
timeout:3e4,
callbackName:"get_song_info_back",
callback:function(o){
var r=+new Date-e;
if(!o||"undefined"==typeof o.ret){
var i=1;
return d({
type:"error",
time:r,
code:i
}),void("function"==typeof t.onError&&t.onError({
errcode:i
}));
}
var n;
n=0==o.ret?1:1001==o.ret?0:1002==o.ret?2:1003==o.ret?3:1004==o.ret?4:5,d({
type:"success",
time:r,
code:n
}),t.onSuc({
status:n
});
},
onerror:function(o){
var r=+new Date-e,i=4;
switch(1*o){
case 400:
i=2;
break;

case 500:
i=3;
break;

default:
i=4;
}
d({
type:"error",
time:r,
code:i
}),"function"==typeof t.onError&&t.onError({
errcode:i
});
}
});
}
function d(t){
var e=Math.max(t.time,0);
if(e=Math.min(e,6e4),t.time>=0&&t.time<200?f.setSum(I.reportId,24,1):t.time>=200&&t.time<500?f.setSum(I.reportId,25,1):t.time>=500&&t.time<1e3?f.setSum(I.reportId,26,1):t.time>=1e3&&t.time<2e3?f.setSum(I.reportId,27,1):t.time>=2e3&&t.time<1e4?f.setSum(I.reportId,28,1):t.time>=1e4&&f.setSum(I.reportId,29,1),
f.setAvg(I.reportId,23,e),"error"==t.type){
switch(1*t.code){
case 1:
f.setSum(I.reportId,9,1);
break;

case 2:
f.setSum(I.reportId,10,1);
break;

case 3:
f.setSum(I.reportId,11,1);
break;

case 4:
f.setSum(I.reportId,12,1);
}
f.setSum(I.reportId,19,1);
}else if("success"==t.type){
switch(1*t.code){
case 0:
f.setSum(I.reportId,8,1);
break;

case 1:
f.setSum(I.reportId,17,1);
break;

case 2:
f.setSum(I.reportId,13,1);
break;

case 3:
f.setSum(I.reportId,14,1);
break;

case 4:
f.setSum(I.reportId,15,1);
break;

case 5:
f.setSum(I.reportId,16,1),f.setSum(I.reportId,17,1);
}
f.setSum(I.reportId,20,1);
}
f.send();
}
function u(t){
return new i(t);
}
var m=t("biz_common/dom/event.js"),y=t("biz_common/tmpl.js"),_=t("pages/loadscript.js"),l=t("pages/music_player.js"),h=t("biz_common/dom/class.js"),g=t("pages/report.js"),f=t("biz_common/utils/monitor.js"),I={
reportId:"28306",
musicSupport:l.getSurportType(),
reportData:{},
posIndex:{},
qqMusiceSongId:"http://thirdparty.gtimg.com/#songId#.m4a?fromtag=38&songid=#songId#",
qqMusiceMid:"http://thirdparty.gtimg.com/C100#mid#.m4a?fromtag=38&songid=#songId#",
num:0
};
return s(),p(),i.prototype._init=function(t){
this._extend(t),this._g={
copyright:-1,
check_copyright:!1
},this._initSrc(),this._initQQmusicLyric(),this._initReportData(),this._initPlayer(),
this._playEvent();
},i.prototype._initSrc=function(){
var t=this._o;
t.src||(0==t.type||1==t.type)&&(t.mid?t.src=I.qqMusiceMid.replace("#mid#",t.mid).replace(/#songId#/g,t.songId||""):t.songId&&(t.src=I.qqMusiceSongId.replace(/#songId#/g,t.songId||"")));
},i.prototype._initQQmusicLyric=function(){
var t=this._o;
t.webUrl=0==t.type||1==t.type?t.webUrl.replace("#songId#",t.songId||"").replace("#referFrom#","music.qq.com"):t.webUrl.replace("#songId#","").replace("#referFrom#","");
},i.prototype._initReportData=function(){
var t=this._o;
2==t.type||3==t.type?window.reportVoiceid.push(t.songId):(0==t.type||1==t.type)&&window.reportMid.push(t.songId),
"undefined"==typeof I.reportData[t.type]&&(I.reportData[t.type]=g.getMusicReportData(t),
I.posIndex[t.type]=0),this._g.posIndex=I.posIndex[t.type]++;
var e=I.reportData[t.type];
e.musicid.push(t.songId),e.commentid.push(t.comment_id),e.hasended.push(0),e.mtitle.push(t.title),
e.detail_click.push(0),e.duration.push(parseInt(1e3*t.duration)),e.errorcode.push(0),
e.play_duration.push(0);
},i.prototype._initPlayer=function(){
I.musicSupport&&(this._o.onStatusChange=this._statusChangeCallBack(),this._o.onTimeupdate=this._timeupdateCallBack(),
this._o.onError=this._errorCallBack(),this.player=new l.init(this._o));
},i.prototype._playEvent=function(){
var t=this,e=this._o,o=this._g;
if(I.musicSupport){
var r=0;
2==e.type||3==e.type?r=3:(0==e.type||1==e.type)&&(r=1),m.tap(e.playArea,function(){
return h.hasClass(e.playCssDom,e.playingCss)?(t.player.stop(),g.report({
type:r,
comment_id:e.comment_id,
voiceid:e.songId,
action:5
})):3==r?t._playMusic(3):1==r&&t._checkCopyright(function(){
t._playMusic(1);
}),!1;
});
}
e.detailUrl&&e.detailArea&&m.tap(e.detailArea,function(){
t._checkCopyright(function(){
I.reportData[e.type].detail_click[o.posIndex]=1,window.location.href=e.detailUrl;
});
});
},i.prototype._checkCopyright=function(t){
var e=this,o=this._o,r=this._g;
return this._musicCopyrightWarnning()===!1?void("function"==typeof t&&t()):void(r.check_copyright||(r.check_copyright=!0,
c({
id:o.songId,
mid:o.mid,
onSuc:function(o){
r.check_copyright=!1,r.copyright=1*o.status,e._musicCopyrightWarnning()===!1&&"function"==typeof t&&t();
},
onError:function(){
r.check_copyright=!1;
}
})));
},i.prototype._musicCopyrightWarnning=function(){
var t=this._g;
return 1*t.copyright===-1?!0:1*t.copyright===0?(r("该歌曲版权已过期，无法播放"),!0):1*t.copyright===2?(r("抱歉，应版权方要求，当前国家或地区暂不提供此歌曲服务"),
!0):1*t.copyright===3?(r("该歌曲版权已过期，无法播放"),!0):1*t.copyright===4?(r("抱歉，歌曲信息不正确"),
!0):!1;
},i.prototype._playMusic=function(t){
var e=this._o,o=this._g;
this.player.play(0),I.reportData[e.type].hasended[o.posIndex]=1,g.report({
type:t,
comment_id:e.comment_id,
voiceid:e.songId,
action:4
});
},i.prototype._extend=function(t){
for(var e in t)this._o[e]=t[e];
},i.prototype._statusChangeCallBack=function(){
var t=this;
return function(e,o){
t._updatePlayerCss(this,o);
};
},i.prototype._timeupdateCallBack=function(){
var t=this,e=this._o,o=this._g;
return function(r,i){
t._updateProgress(this,i),0!=i&&(I.reportData[e.type].play_duration[o.posIndex]=parseInt(1e3*i));
};
},i.prototype._errorCallBack=function(){
var t=this,e=this._o,o=this._g;
return function(r,i){
I.reportData[e.type].errorcode[o.posIndex]=i,t._updatePlayerCss(this,3);
};
},i.prototype._updatePlayerCss=function(t,e){
var o=this._o,r=o.playCssDom,i=o.progress;
2==e||3==e?(h.removeClass(r,o.playingCss),!!i&&(i.style.width=0)):1==e&&h.addClass(r,o.playingCss);
},i.prototype._updateProgress=function(t,e){
var o=this._o,r=o.progress,i=t.getDuration();
i&&r&&(r.style.width=this._countProgress(i,e));
},i.prototype._countProgress=function(t,e){
return e/t*100+"%";
},{
init:u,
renderPlayer:n
};
});define("appmsg/async.js",["biz_common/utils/string/html.js","appmsg/img_copyright_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","biz_wap/utils/storage.js","appmsg/log.js","rt/appmsg/getappmsgext.rt.js","a/a.js","pages/version4video.js","appmsg/like.js","appmsg/comment.js","appmsg/reward_entry.js","a/testdata.js","appmsg/iframe.js"],function(e){
"use strict";
function t(e){
if(e&&e.img_copy_info&&e.img_copy_info.list){
for(var t={},i=e.img_copy_info.list,n=window.__appmsgCgiData.copyright_stat,r=window.__appmsgCgiData.source_biz,a=0,o=i.length;o>a;a++){
var s=i[a];
if(2==s.type){
if(2==n&&r==s.source_uin)continue;
t[s.img_url]={
source_nickname:s.source_nickname,
source_uin:s.source_uin,
source_encode_biz:s.source_encode_biz||""
};
}
}
for(var m=document.getElementsByTagName("img"),a=0,o=m.length;o>a;a++){
var s=m[a],c=s.getAttribute("data-src")||s.getAttribute("data-backsrc")||"";
if(t[c]){
var p=document.createElement("div");
p.innerHTML=f.tmpl(d,t[c]);
{
var l=p.children[0],g=s.parentNode,w=g.insertBefore(l,s),u=w.children[0];
(function(e,t){
_.on(t,"click",function(){
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene=112#wechat_redirect";
return-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?(location.href=t,
!1):(h.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
}),!1);
});
})(t[c],u);
}
w.insertBefore(s,u);
}
}
}
}
function i(e){
if(k&&k.length>0)for(var t,i,n,r=0,a=k.length;a>r;++r)t=k[r],i=t.iframe,n=t.src,
e&&(n=n.replace(/\&encryptVer=[^\&]*/gi,""),n=n.replace(/\&platform=[^\&]*/gi,""),
n=n.replace(/\&cKey=[^\&]*/gi,""),n=n+"&encryptVer=6.0&platform=61001&cKey="+e),
i.setAttribute("src",n);
}
function n(t){
var i=t.appmsgstat||{};
window.appmsgstat||(window.appmsgstat=i),i.show&&(!function(){
var e=document.getElementById("js_read_area3"),t=document.getElementById("like3");
e.style.display="block",t.style.display="inline",i.liked=window.is_temp_url?window.liked:i.liked,
i.liked&&u.addClass(t,"praised"),t.setAttribute("like",i.liked?"1":"0");
var n=document.getElementById("likeNum3"),r=document.getElementById("readNum3"),a=window.is_temp_url?window.read_num:i.read_num,o=window.is_temp_url?window.like_num:i.like_num;
a||(a=1),o||(o="赞"),parseInt(a)>1e5?a="100000+":"",parseInt(o)>1e5?o="100000+":"",
r&&(r.innerHTML=a),n&&(n.innerHTML=o);
}(),e("appmsg/like.js")),1==t.comment_enabled&&(window.can_fans_comment_only=t.only_fans_can_comment,
e("appmsg/comment.js")),-1==p.indexOf("WindowsWechat")&&-1!=p.indexOf("MicroMessenger")&&t.reward&&(s=e("appmsg/reward_entry.js"),
s.handle(t.reward,a()));
}
function r(){
var r="";
k&&k.length>0&&(r="&is_need_ticket=1");
var o=b.checkNeedAds(),s=o.is_need_ad,m=(o._adInfo,o.both_ad),d=-1!=location.href.indexOf("&mock_ad=1");
d&&(o.is_need_ad=s=1),y("[Appmsg] start get asycn data, is_need_ad:"+s),w({
url:"/mp/getappmsgext?__biz="+biz+"&appmsg_type="+appmsg_type+"&mid="+mid+"&sn="+sn+"&idx="+idx+"&scene="+source+"&title="+encodeURIComponent(msg_title.htmlDecode())+"&ct="+ct+"&abtest_cookie="+abtest_cookie+"&devicetype="+devicetype.htmlDecode()+"&version="+version.htmlDecode()+"&f=json&r="+Math.random()+r+"&is_need_ad="+s+"&comment_id="+comment_id+"&is_need_reward="+is_need_reward+"&both_ad="+m+"&reward_uin_count="+(is_need_reward?3*a():0)+(window.send_time?"&send_time="+send_time:"")+"&msg_daily_idx="+msg_daily_idx,
data:{
is_only_read:is_only_read,
req_id:window.req_id||"",
is_temp_url:window.is_temp_url||0
},
type:"POST",
dataType:"json",
rtId:"27613",
rtKey:"50",
rtDesc:v,
async:!0,
success:function(r){
if(y("[Appmsg] success get async data"),r)try{
if(d){
r.advertisement_num=1;
var a=e("a/testdata.js");
r.advertisement_info=a.data;
}
if(r&&r.base_resp&&r.base_resp.wxtoken&&(window.wxtoken=r.base_resp.wxtoken),window.fromWeixinCached&&e("appmsg/iframe.js"),
i(r.appmsgticket?r.appmsgticket.ticket:""),t(r),r.ret)return;
b.afterGetAdData(o,r),window.wx_user_can_reward=r.user_can_reward,n({
appmsgstat:r.appmsgstat,
comment_enabled:r.comment_enabled,
only_fans_can_comment:r.only_fans_can_comment,
reward:{
reward_total:r.reward_total_count,
reward_head_imgs:r.reward_head_imgs||[],
can_reward:r.can_reward,
timestamp:r.timestamp
}
});
}catch(s){
y("[Appmsg] error parse async data, biz="+biz+", mid="+mid);
var m=new Image;
return m.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(s.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(s));
}
},
error:function(){
y("[Appmsg] error get async data, biz="+biz+", mid="+mid);
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
function a(){
return _.on(window,"resize",function(){
o(),s&&s.render(a());
}),o();
}
function o(){
var e=window.innerWidth||document.documentElement.clientWidth;
try{
var t=document.getElementById("page-content").getBoundingClientRect();
t.width&&(e=t.width);
}catch(i){}
var n=30,r=34,o=Math.floor(.9*(e-n)/r);
return document.getElementById("js_reward_inner")&&(document.getElementById("js_reward_inner").style.width=o*r+"px"),
a=function(){
return o;
},o;
}
e("biz_common/utils/string/html.js");
var s,m,d=e("appmsg/img_copyright_tpl.html.js"),c=!1,p=navigator.userAgent,l=-1!=p.indexOf("MicroMessenger"),_=(-1!=navigator.userAgent.indexOf("WindowsWechat"),
e("biz_common/dom/event.js")),g=200,w=e("biz_wap/utils/ajax.js"),u=e("biz_common/dom/class.js"),h=e("biz_wap/jsapi/core.js"),f=e("biz_common/tmpl.js"),y=(e("biz_wap/utils/storage.js"),
e("appmsg/log.js")),v=e("rt/appmsg/getappmsgext.rt.js"),b=e("a/a.js"),j=document.getElementsByTagName("iframe"),x=document.getElementById("js_content"),k=[],z=x.offsetWidth,q=3*z/4;
window.logs.video_cnt=0;
for(var O=0,I=j.length;I>O;++O){
m=j[O];
var A=m.getAttribute("data-src")||"",E=m.getAttribute("src")||A;
if(E){
var B=e("pages/version4video.js");
if(!B.isShowMpVideo()&&(0==E.indexOf("http://v.qq.com/iframe/player.html")||0==E.indexOf("https://v.qq.com/iframe/player.html")||0==E.indexOf("http://v.qq.com/iframe/preview.html")||0==E.indexOf("https://v.qq.com/iframe/preview.html"))||0==E.indexOf("http://z.weishi.com/weixin/player.html")){
-1==E.indexOf("http://z.weishi.com/weixin/player.html")&&-1==A.indexOf("http://z.weixin.com/weixin/player.html")&&(A=A.replace(/^https:/,location.protocol),
A=A.replace(/^http:/,location.protocol),A=A.replace(/preview.html/,"player.html"),
E=E.replace(/^https:/,location.protocol),E=E.replace(/^http:/,location.protocol),
E=E.replace(/preview.html/,"player.html")),E=E.replace(/width=\d+/g,"width="+z),
E=E.replace(/height=\d+/g,"height="+q),l&&(0==E.indexOf("http://v.qq.com/iframe/player.html")||0==E.indexOf("https://v.qq.com/iframe/player.html"))||l&&(0==E.indexOf("http://v.qq.com/iframe/preview.html")||0==E.indexOf("https://v.qq.com/iframe/preview.html"))?k.push({
iframe:m,
src:E
}):m.setAttribute("src",E),m.width=z,m.height=q,m.style.setProperty&&(m.style.setProperty("width",z+"px","important"),
m.style.setProperty("height",q+"px","important")),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10),
window.logs.video_cnt++;
continue;
}
}
}
var M=document.getElementById("js_toobar3"),W=window.innerHeight||document.documentElement.clientHeight,T=function(){
var e=window.pageYOffset||document.documentElement.scrollTop,t=M.offsetTop;
e+W+g>=t&&(r(),_.off(window,"scroll",T));
};
c?(_.on(window,"scroll",T),T()):r();
});define("appmsg/index.js",["biz_common/utils/string/html.js","biz_wap/jsapi/a8key.js","biz_wap/utils/device.js","biz_common/dom/class.js","appmsg/log.js","biz_common/dom/attr.js","appmsg/max_age.js","biz_wap/utils/mmversion.js","appmsg/test.js","biz_common/dom/event.js","page/appmsg/page_mp_article_improve_combo.css","page/appmsg/not_in_mm.css","biz_common/utils/url/parse.js","appmsg/cdn_img_lib.js","appmsg/share.js","biz_common/log/jserr.js","biz_wap/ui/lazyload_img.js","appmsg/async.js","appmsg/copyright_report.js","biz_wap/jsapi/core.js","appmsg/outer_link.js","appmsg/review_image.js","appmsg/iframe.js","appmsg/qqmusic.js","appmsg/voice.js","appmsg/wxtopic.js","appmsg/cdn_speed_report.js","appmsg/page_pos.js","appmsg/report_and_source.js","appmsg/report.js","appmsg/fereport.js","biz_wap/safe/mutation_observer_report.js","sougou/index.js"],function(e){
"use strict";
function t(){
function t(e,t){
var o={
lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
},n=new Image;
n.onload=function(){
var o=n.width>0&&n.height>0;
t(e,o);
},n.onerror=function(){
t(e,!1);
},n.src="data:image/webp;base64,"+o[e];
}
function o(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e.timing){
var t=e.timing;
a("[Appmsg] dns:"+(t.domainLookupEnd-t.domainLookupStart)+"^^^ ssl:"+(0==t.secureConnectionStart?0:t.connectEnd-t.secureConnectionStart)+"^^^ tcp:"+(t.connectEnd-t.connectStart)+"^^^ request:"+(t.responseStart-t.requestStart)+"^^^ getPackageTime:"+(t.responseEnd-t.responseStart)+"^^^ domCententLoaded:"+(t.domContentLoadedEventStart-t.domLoading)+"^^^ domComplete:"+(t.domComplete-t.domLoading)+"^^^ firstViewTime:"+(real_show_page_time-t.navigationStart)+"^^^ interactiveTime:"+(page_endtime-t.navigationStart))+"^^^ ua:"+window.navigator.userAgent,
setTimeout(function(){
t.loadEventEnd&&a("[Appmsg] onload:"+(t.loadEventEnd-t.loadEventStart));
},100);
}
"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){
return this.replace(/^\s+|\s+$/g,"");
}),""==document.getElementById("js_content").innerHTML.trim()&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=24729_94_1");
var o=Math.random();
.001>o&&document.getElementById("js_read_area3")&&document.getElementById("js_read_area3").innerText&&document.getElementById("js_read_area3").innerText.indexOf("Pageview")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=24729_95_1");
}
var r=document.getElementsByTagName("body");
if(!r||!r[0])return!1;
r=r[0],function(){
var e=(new Date).getHours(),t=function(e,t){
t=t||"",window.isSg?(t=["uin:sougou","resp:"+t].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+t+"&r="+Math.random()+"&from=sougou"):(t=["uin:"+top.window.user_uin,"resp:"+t].join("|"),
(new Image).src="/mp/jsreport?key="+e+"&content="+t+"&r="+Math.random());
},o=function(e,t,o){
var n=e+"_"+t;
o=o||1,window.logs.idkeys[n]||(window.logs.idkeys[n]={
val:0
}),window.logs.idkeys[n].val+=o;
},n=e>=11&&17>=e&&Math.random()<1,i=function(e,o){
n&&t(e,o);
};
window.__report=t,window.__commonVideoReport=i,window.__addIdKeyReport=o;
}();
var l=/^http(s)?:\/\/mp\.weixin\.qq\.com\//g;
try{
if(top!=window&&(!top||top&&top.location.href&&l.test(top.location.href))&&!window.isSg)throw new Error("in iframe");
}catch(m){
var g="",u=new Image;
u.src=("http://mp.weixin.qq.com/mp/jsreport?key=4&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key4]"+g+"&r="+Math.random()).substr(0,1024);
}
window.isInWeixinApp()&&/#rd$/.test(location.href)&&!window.isWeixinCached&&location.replace(location.href.replace(/#rd$/,"#wechat_redirect"));
var w=e("biz_common/utils/url/parse.js");
e("appmsg/cdn_img_lib.js"),window.page_endtime=+new Date;
{
var f=e("biz_wap/utils/mmversion.js"),_=!f.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger");
-1!=navigator.userAgent.indexOf("WindowsWechat");
}
if(e("appmsg/share.js"),window.isSg||"mp.weixin.qq.com"==location.host){
var h=e("biz_common/log/jserr.js");
h({
key:0,
reporturl:"http://mp.weixin.qq.com/mp/jsreport?1=1",
replaceStr:/http(s)?:(.*?)js\//g
});
}
window.logs.webplog={
lossy:0,
lossless:0,
alpha:0,
animation:0,
total:0
};
var A=-1!=navigator.userAgent.indexOf("TBS/"),y=function(e,o){
t(e,function(e,t){
if(window.logs.webplog[e]=t?1:0,window.logs.webplog.total++,4==window.logs.webplog.total){
var n=window.logs.webplog,i=Math.random();
A&&1>=i&&(n.lossy=n.lossless=n.alpha=1,window.logs.webplog=n);
var a=n.lossy&n.lossless&n.alpha;
o(!!a);
}
});
},v=function(e){
y("lossy",e),y("lossless",e),y("alpha",e),y("animation",e);
};
window.webp=!1,v(function(t){
function o(e,t){
if(1*t.getAttribute("data-order")<5)return e;
var o=1e3*window.svr_time||+new Date;
o=new Date(o);
var n=o.getHours(),i=(60*n+o.getMinutes(),e),a=document.createElement("span");
a.className="gif_img_wrp",a.innerHTML='<span class="gif_img_tips" style="display:none;"><i class="gif_img_play_arrow"></i>动图</span><span class="gif_img_tips loading" style="display:none;"><i class="weui_loading gif_img_loading"></i>加载中</span>';
var r="click",s=function(){
if(a){
a.children.item(0).style.display="none",a.children.item(1).style.display="";
var e=t.onload;
t.onload=function(){
a&&(a.children.item(1).style.display="none",p.off(a,r,s),a=null),t.className+=" img_gif_onload",
e&&e.apply(t,arguments);
};
var o=t.onerror;
t.onerror=function(){
a&&(a.children.item(0).style.display="",a.children.item(1).style.display="none",
p.off(a,r,s),a=null),o&&o.apply(t,arguments);
},t.src=i,t.loadGif=!0,window.__addIdKeyReport("28307",15);
}
};
return t.autoTap=function(){
t.src=i,t.loadGif=!0,t.autoTap=null,p.off(a,r,s),window.__addIdKeyReport("28307",26);
},t.span=a,(window.user_uin&&100>(user_uin/100|0)%100&&"MzI5NjExODQ4OA=="!==window.biz||location.href.indexOf("gif=1")>-1)&&(e=e.nogif(),
t.gray=!0,t.parentNode.insertBefore(a,t),a.appendChild(t),p.on(a,r,s),window.__addIdKeyReport("28307",16)),
e;
}
function n(e){
var t,o=getComputedStyle(e),n=new Image,i=o.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi,"$2"),a=o.backgroundSize,r=parseFloat(o.width.replace("px","")),s=parseFloat(o.height.replace("px","")),c=[r,s],d=[];
if(n.src=i,t=n.width>n.height?n.width/n.height:n.height/n.width,a=a.split(" "),d[0]=a[0],
d[1]=a.length>1?a[1]:"auto","cover"===a[0])c[0]>c[1]&&c[0]/c[1]>=t?(d[0]=c[0],d[1]="auto"):(d[0]="auto",
d[1]=c[1]);else if("contain"===a[0])c[0]<c[1]?(d[0]=c[0],d[1]="auto"):c[0]/c[1]>=t?(d[0]="auto",
d[1]=c[1]):(d[1]="auto",d[0]=c[0]);else for(var p=a.length;p--;)a[p].indexOf("px")>-1?d[p]=a[p].replace("px",""):a[p].indexOf("%")>-1&&(d[p]=c[p]*(a[p].replace("%","")/100));
return"auto"===d[0]&&"auto"===d[1]?(d[0]=n.width,d[1]=n.height):(t="auto"===d[0]?n.height/d[1]:n.width/d[0],
d[0]="auto"===d[0]?n.width/t:d[0],d[1]="auto"===d[1]?n.height/t:d[1]),{
width:d[0],
height:d[1]
};
}
window.webp=t,t&&window.localStorage&&window.localStorage.setItem&&window.localStorage.setItem("webp","1"),
window.logs.img={
download:{},
read:{},
load:{}
};
var i=document.getElementById("js_cover");
if(i){
var r=i.getAttribute("data-src");
if(r){
if(r.isCDN()){
var c=new Date;
for(c.setFullYear(2014,9,1);-1!=r.indexOf("?tp=webp");)r=r.replace("?tp=webp","");
for(;-1!=r.indexOf("&tp=webp");)r=r.replace("&tp=webp","");
1e3*ct>=c.getTime()&&""!=img_format&&"gif"!=img_format&&(r=r.replace(/\/0$/,"/640"),
r=r.replace(/\/0\?/,"/640?"),i.dataset&&(i.dataset.s="300,640")),t&&(r=w.addParam(r,"tp","webp",!0)),
r=w.addParam(r,"wxfrom","5",!0),is_https_res?r=r.http2https():("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(r=r.https2http());
}
setTimeout(function(){
i.onload=function(){
s(i,"height","auto","important"),s(i,"visibility","visible","important");
},i.setAttribute("src",r);
},0),window.logs.img.read[r]=!0,window.logs.img.load[r]=!0,i.removeAttribute("data-src");
}
}
var d=e("biz_wap/ui/lazyload_img.js"),l=1;
window.logs.outer_pic=0;
for(var m=document.getElementsByTagName("img"),g=0,u=m.length;u>g;++g){
var f=m[g].getAttribute("data-src");
f&&f.isGif()&&m[g].className.indexOf("__bg_gif")<0&&(m[g].className+=" __bg_gif");
}
for(var _=document.getElementsByClassName("__bg_gif"),g=0,u=_.length;u>g;++g)_[g].setAttribute("data-order",g);
var h=!1,A=function(){
if(!h){
h=!0;
for(var e=document.getElementsByClassName("__bg_gif"),t=function(e){
var t=document.createElement("span"),o=document.createElement("div");
o.style.position="relative",o.style.height=0,o.className="gif_bg_tips_wrp",t.className="gif_img_tips_group",
t.innerHTML='<span class="gif_img_tips"><i class="gif_img_play_arrow"></i>动图</span><span class="gif_img_tips loading" style="display:none;"><i class="weui_loading gif_img_loading"></i>加载中</span>',
o.appendChild(t);
var i=getComputedStyle(e),a=i.backgroundPosition,r=i.backgroundPositionX||a.split(" ")[0],s=i.backgroundPositionY||a.split(" ")[1]||backgroundPositionX,c=n(e),d=parseFloat(c.width),l=parseFloat(c.height);
if(120>d||120>l)return"autoTap";
var m,g,u=e.clientWidth,w=e.clientHeight,f=i.backgroundOrigin,_=i.backgroundImage.slice(4,-1).replace(/"/g,""),h=parseFloat(i.paddingLeft),A=parseFloat(i.borderLeftWidth),y=parseFloat(i.paddingRight),v=parseFloat(i.borderRightWidth),b=parseFloat(i.paddingTop),x=parseFloat(i.borderTopWidth),j=parseFloat(i.paddingBottom),I=parseFloat(i.borderBottomWidth),E=parseFloat(i.marginTop),q=parseFloat(i.marginLeft);
"padding-box"===f?(m=A+q,g=x+E):"border-box"===f?(u+=A+v,w+=x+I,m=q,g=E):"content-box"===f&&(u-=y+h,
w-=b+j,m=A+q+h,g=x+E+b);
var z;
if(r.indexOf("%")>=0){
var k=.01*parseFloat(r);
z=(u-d)*k;
}else r.indexOf("px")>=0&&(z=parseFloat(r));
var B;
if(s.indexOf("%")>=0){
var k=.01*parseFloat(s);
B=(w-l)*k;
}else s.indexOf("px")>=0&&(B=parseFloat(s));
var S=B+g+l,O=z+m;
O=Math.max(O,q),S=Math.min(S,w+5+g),O+=10,S-=35,t.style.top=S+"px",t.style.left=O+"px";
var T="click",C=function(){
if(t){
t.children.item(0).style.display="none",t.children.item(1).style.display="";
var o=new Image,n=_;
_.indexOf("mmbiz_gif")>=0?n=n.replace("/s640?","/0?"):(n=n.replace("/s640?","/0?"),
n+="&wx_fmt=gif"),o.src=n,o.onload=function(){
t&&(t.children.item(1).style.display="none",p.off(t,T,C),t=null),e.style.backgroundImage='url("'+n+'")',
e.loadGif=!0;
},o.onerror=function(){
t&&(t.children.item(0).style.display="",t.children.item(1).style.display="none",
p.off(t,T,C),t=null);
},window.__addIdKeyReport("28307",15);
}
};
return p.on(t,T,C),o;
},o=5,i=function(e){
var t=getComputedStyle(e),o=t.backgroundImage.slice(4,-1).replace(/"/g,""),n=o;
o.indexOf("/mmbiz_gif/")>=0?n=n.replace("/s640?","/0?"):(n=n.replace("/s640?","/0?"),
n+="&wx_fmt=gif"),e.style.backgroundImage='url("'+n+'")',e.loadGif=!0;
},a=0,r=e.length;r>a;++a){
var s=e[a].getAttribute("data-src");
if(!(s&&s.isGif()||e[a].loadGif))if(o>a)i(e[a]);else{
var c=t(e[a]);
"autoTap"===c?i(e[a]):e[a].parentNode.insertBefore(c,e[a]);
}
}
}
};
p.on(window,"load",A),setTimeout(function(){
A();
},1e4),function(){
var e="onorientationchange"in window?"orientationchange":"resize";
p.on(window,e,function(){
if(h){
for(var e=document.getElementsByClassName("gif_bg_tips_wrp");e.length>0;)e[0].parentNode.removeChild(e[0]);
h=!1,A();
}
});
}(),new d({
attrKey:"data-src",
imgOccupied:!0,
lazyloadHeightWhenWifi:function(){
var e,t=1,o=1;
e=window.svr_time?new Date(1e3*window.svr_time):new Date;
var n=e.getHours();
return n>=20&&23>n&&(t=.5,o=0),{
bottom:t,
top:o
};
},
inImgRead:function(e){
e&&(window.logs.img.read[e]=!0);
},
changeSrc:function(e,t,n){
if(!t)return"";
var i=t;
if(i=i.replace(/(\?tp=webp)|(\?tp=wxpic)|(&tp=webp)|(&tp=wxpic)/g,""),t.isCDN()){
(e.dataset&&e.dataset.s||-1!=t.indexOf("wx_fmt=")&&-1==t.indexOf("wx_fmt=gif"))&&(i=i.replace(/\/0$/,"/640"),
i=i.replace(/\/0\?/,"/640?"));
var r,s=top.window.navigator.userAgent,c=/TBS\/([\d\.]+)/i,d=s.match(c);
d&&d[1]&&(r=parseInt(d[1]));
var p=0,l=top.window.user_uin||0,m=0!==l&&Math.floor(l/100)%1e3<p;
r>=36901&&i.isGif()&&m?(i=w.addParam(i,"tp","wxpic",!0),window.__addIdKeyReport("28307",51)):window.webp&&(i=w.addParam(i,"tp","webp",!0)),
i=w.addParam(i,"wxfrom","5",!0),is_https_res?i=i.http2https():("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(i=i.https2http());
}else try{
var c=new RegExp("^http(s)?://((mmbiz.qpic.cn/.*)|(m.qpic.cn/.*)|(mmsns.qpic.cn/.*)|(shp.qpic.cn/.*)|(wx.qlogo.cn/.*)|(mmbiz.qlogo.cn/.*)|((a|b)[0-9]*.photo.store.qq.com/.*)|(mp.weixin.qq.com/.*)|(res.wx.qq.com/.*))");
c.test(t)||(window.__addIdKeyReport("28307",9),window.logs.outer_pic++);
}catch(g){}
var u=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
return i=i.replace(u,"http://m.qpic.cn"),i=w.addParam(i,"wx_lazy","1",!0),t.isGif()&&(i=o(i,e,n)),
window.logs.img.load[i]=!0,a("[Appmsg] image_load_event_change_src. originsrc:"+t+"  ^^^ newsrc : "+i),
i;
},
onerror:function(e,t){
var o=t?t.__retryload||0:0;
if(e&&!(o>l)&&(window.__addIdKeyReport("28307",4),e.indexOf("tp=wxpic")>=0&&window.__addIdKeyReport("28307",50),
window.__addIdKeyReport("28307",6+2*o),l>o&&(o++,t.__retryload=o,t.src=w.addParam(e,"retryload",o,!0)),
e.isCDN())){
a("[Appmsg] image_load_event_on_error. src:"+e),t.setAttribute("data-fail",1);
var n=10;
/tp\=webp/.test(e)&&(n=11);
var i=new Image;
i.src="http://mp.weixin.qq.com/mp/jsreport?key="+n+"&content="+(encodeURIComponent(e)+"["+uin+"]")+"&r="+Math.random();
}
},
onload:function(e,t){
t.gray&&!t.loadGif&&(t.naturalWidth<120||t.naturalHeight<120?t.autoTap&&t.autoTap():t.span&&t.span.children&&t.span.children.item(0)&&(t.span.children.item(0).style.display=""));
var o=t?t.__retryload||0:0;
o>l||(a("[Appmsg] image_load_event_onload_image. src:"+e+"  ^^^  retryloadtimes: "+o),
t.setAttribute("data-fail",0),window.__addIdKeyReport("28307",3),window.__addIdKeyReport("28307",5+2*o));
},
detect:function(e){
if(e&&e.time&&e.loadList){
var t=e.time,o=e.loadList;
window.logs.img.download[t]=o;
}
},
container:document.getElementById("page-content")
});
}),e("appmsg/async.js"),!window.isSg;
var b=e("appmsg/copyright_report.js"),x=e("biz_wap/jsapi/core.js");
!function(){
var e=document.getElementById("post-user"),t=document.getElementById("copyright_info"),o=[];
if(e){
var n="57";
"26"==window.source&&(n="95"),"28"==window.source&&(n="96"),"29"==window.source&&(n="39"),
"15"==window.source&&(n="121"),o.push({
dom:e,
username:user_name_new||user_name,
scene:n
});
}
t&&source_encode_biz&&o.push({
dom:t,
source_encode_biz:source_encode_biz,
scene:"110"
});
for(var i=0,r=o.length;r>i;i++)!function(e){
p.on(e.dom,"click",function(){
if("copyright_info"==e.dom.id&&source_encode_biz){
b.card_click_report({
scene:"0"
});
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene="+e.scene+"#wechat_redirect";
-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?location.href=t:x.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
});
}else a("[Appmsg] profile_click_before_loadprofile: username:"+e.username+", scene:"+e.scene),
x.invoke("profile",{
username:e.username,
scene:e.scene
},function(t){
window.__addIdKeyReport("28307","1"),a("[Appmsg] profile_click_after_loadprofile: username:"+e.username+", scene:"+e.scene+", res.err_msg:"+t.err_msg);
});
return!1;
}),f.isWp&&e.dom.setAttribute("href","weixin://profile/"+e.username);
}(o[i]);
}(),function(){
location.href.match(/fontScale=\d+/)&&f.isIOS&&x.on("menu:setfont",function(e){
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
document.getElementsByTagName("html").item(0).style.lineHeight=160/e.fontScale;
});
}();
var j=e("appmsg/outer_link.js");
if(new j({
container:document.getElementById("js_content"),
changeHref:function(e,t){
if(e&&0==e.indexOf("http://mp.weixin.qq.com/s")){
e=e.replace(/#rd\s*$/,""),e=e.replace(/#wechat_redirect\s*$/,""),e=e.replace(/[\?&]scene=21/,"");
var o="&";
-1==e.indexOf("?")&&(o="?"),e+=o+"scene=21#wechat_redirect";
}else{
if(18==ban_scene)return"/mp/ban?action=check&__biz="+biz+"&mid="+mid+"&idx="+idx+"&scene="+ban_scene+"#wechat_redirect";
if(0!=e.indexOf("http://mp.weixinbridge.com/mp/wapredirect"))return"http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&type="+t+"&scene=0";
}
return e;
}
}),!_){
var I=e("appmsg/review_image.js"),E=document.getElementById("js_cover"),q=[];
E&&q.push(E),new I({
container:document.getElementById("js_content"),
is_https_res:is_https_res,
imgs:q
});
}
!function(){
try{
var e=document.getElementById("js_content");
if(!e||!e.querySelectorAll)return;
for(var t=e.querySelectorAll("*"),o="list-paddingleft-2,selectTdClass,noBorderTable,ue-table-interlace-color-single,ue-table-interlace-color-double,__bg_gif".split(","),n=function(e){
if(e&&e.className){
for(var t=e.className.split(/\s+/),n=[],i=0,a=t.length;a>i;++i){
var r=t[i];
r&&-1!=o.indexOf(r)&&n.push(r);
}
e.className=n.join(" ");
}
},i=0,a=t.length;a>i;++i){
var r=t[i];
r.tagName&&"iframe"!=r.tagName.toLowerCase()&&n(r);
}
}catch(s){}
}(),window.fromWeixinCached||e("appmsg/iframe.js"),e("appmsg/qqmusic.js"),e("appmsg/voice.js"),
e("appmsg/wxtopic.js"),e("appmsg/cdn_speed_report.js"),e("appmsg/page_pos.js"),setTimeout(function(){
window.article_improve_combo_css;
},0),setTimeout(function(){
p.tap(document.getElementById("copyright_logo"),function(){
location.href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150326iquI3e.html";
}),c(),d(),e("appmsg/report_and_source.js"),function(){
if(_){
i.addClass(r,"not_in_mm");
var e=document.getElementById("js_pc_qr_code_img");
if(e){
var t=10000004,o=document.referrer;
if(0==o.indexOf("http://weixin.sogou.com")?t=10000001:0==o.indexOf("https://wx.qq.com")&&(t=10000003),
window.isSg)e.setAttribute("src",sg_qr_code.htmlDecode());else{
e.setAttribute("src","/mp/qrcode?scene="+t+"&size=102&__biz="+biz);
var n=new Image;
n.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+t+"&r="+Math.random();
}
document.getElementById("js_pc_qr_code").style.display="block";
}
var a=document.getElementById("js_profile_qrcode"),s=document.getElementById("js_profile_arrow_wrp"),c=document.getElementById("post-user");
if(a&&c&&s){
var d=function(){
var e=10000005,t=document.referrer;
0==t.indexOf("http://weixin.sogou.com")?e=10000006:0==t.indexOf("https://wx.qq.com")&&(e=10000007);
var o=document.getElementById("js_profile_qrcode_img");
if(o)if(window.isSg)o.setAttribute("src",sg_qr_code.htmlDecode());else{
o.setAttribute("src","/mp/qrcode?scene="+e+"&size=102&__biz="+biz);
var n=new Image;
n.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+e+"&r="+Math.random();
}
return a.style.display="block",s.style.left=c.offsetLeft-a.offsetLeft+c.offsetWidth/2-8+"px",
!1;
};
p.on(c,"click",d),p.on(a,"click",d),p.on(document,"click",function(e){
var t=e.target||e.srcElement;
t!=c&&t!=a&&(a.style.display="none");
});
}
}else{
var l=document.getElementById("js_report_article3");
!!l&&(l.style.display="");
}
}(),function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=document.getElementById("img-content");
if(e&&t&&t.getBoundingClientRect){
var o=t.getBoundingClientRect().height;
window.scrollTo(0,o);
}
}(),e("appmsg/report.js");
for(var t=document.getElementsByTagName("map"),o=0,n=t.length;n>o;++o)t[o].parentNode.removeChild(t[o]);
if(b.card_pv_report(),Math.random()<.01)try{
var a="https://js.aq.qq.com/js/aq_common.js",s=document.createElement("script");
s.src=a;
var l=document.getElementsByTagName("head")[0];
l.appendChild(s);
}catch(m){}
var g=document.getElementById("js_close_temp");
p.on(g,"click",function(){
g.parentNode.parentNode.removeChild(g.parentNode),i.removeClass(document.getElementById("js_article"),"preview_appmsg");
});
},1e3),function(){
if(n.os.ios&&"onorientationchange"in window){
var e=[],t="onorientationchange"in window?"orientationchange":"resize",o=function(){
return 90===Math.abs(window.orientation)?1:2;
};
e.push({
ori:o(),
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
var i=(new Date).getHours();
p.on(window,t,function(){
var t=e.length-2,n=o();
if(t>=0){
var a=e[t],r=a.ori;
r!==n||e[e.length-1].istouchmove||(i>=11&&17>=i&&window.__report(63),window.scrollTo(0,a.scroll));
}
e.push({
ori:n,
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
}),p.on(window,"scroll",function(){
var t=e.length-1;
e[t].ori==o()&&(e[t].scroll=window.pageYOffset||document.documentElement.scrollTop,
e[t].istouchmove=!0);
});
}
}(),a("[Appmsg] href:"+location.href+"^^^ ua:"+window.navigator.userAgent),window.addEventListener?window.addEventListener("load",o,!1):window.attachEvent&&window.attachEvent("onload",o),
e("appmsg/fereport.js"),function(){
window.addEventListener&&document.getElementsByTagName("body")[0].addEventListener("copy",function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_18_1",
f.isIOS&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_19_1"),
f.isAndroid&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_20_1");
},!1);
}(),function(){
window.__observer&&window.__observer_data&&e("biz_wap/safe/mutation_observer_report.js");
}(),function(){
var e=[.875,1,1.125,1.25,1.375],t=window.location.href.match(/winzoom=(\d+(?:\.\d+)?)/);
if(t){
var o=parseFloat(t[1]);
"undefined"!=typeof e.indexOf&&e.indexOf(o)>=0&&(document.getElementById("page-content").style.zoom=o,
document.getElementsByClassName("rich_media_title")[0].style.zoom=1/o,document.getElementsByClassName("rich_media_meta_list")[0].style.zoom=1/o);
}
}(),"undefined"!=typeof isSg&&e("sougou/index.js"),setTimeout(function(){
for(var e=function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_49_1&lc=1&log0=[28307_49_appmsg_fe_filter]"+encodeURIComponent(location.href);
},t=(window.appmsg_fe_filter||"").split(","),o=function(t,o){
try{
if(!t)return;
if(t.querySelectorAll){
var n=t.querySelectorAll("*["+o+"]");
if(n&&n.length>0){
e();
for(var i=0;i<n.length;++i)n[i]&&n[i].removeAttribute&&n[i].removeAttribute(o);
}
return;
}
var a=t.childNodes;
if(t.hasAttribute&&t.hasAttribute(o)&&e(),t.removeAttribute&&t.removeAttribute(o),
a&&a.length)for(var i=0;i<a.length;++i)filterContenteditable(a[i]);
}catch(r){}
},n=document.getElementById("js_content"),i=0;i<t.length;++i)t[i]&&o(n,t[i]);
},0);
}
e("biz_common/utils/string/html.js");
var o=e("biz_wap/jsapi/a8key.js"),n=e("biz_wap/utils/device.js"),i=e("biz_common/dom/class.js"),a=e("appmsg/log.js"),r=e("biz_common/dom/attr.js"),s=r.setProperty,c=e("appmsg/max_age.js"),d=(e("biz_wap/utils/mmversion.js"),
e("appmsg/test.js")),p=e("biz_common/dom/event.js");
e("page/appmsg/page_mp_article_improve_combo.css"),e("page/appmsg/not_in_mm.css"),
o.config({
onOutOfWeixinApp:function(){
console.log("onOutOfWeixinApp"),a("[Appmsg] onOutOfWeixinApp");
},
onNoCacheFuncWeixin:function(){
console.log("isWeixinCached == false"),a("[Appmsg] isWeixinCached == false");
},
onAlreadyHasA8Key:function(){
console.log("URL已有A8Key"),a("[Appmsg] URL alery has A8Key");
},
onJSAPIGetA8KeyStart:function(){
console.log("onJSAPIGetA8KeyStart"),a("[Appmsg] onJSAPIGetA8KeyStart");
},
onJSAPIGetA8KeyEnd:function(){
console.log("onJSAPIGetA8KeyEnd"),a("[Appmsg] onJSAPIGetA8KeyEnd");
},
onJSAPIGetA8KeyTimeout:function(){
console.log("onJSAPIGetA8KeyTimeout"),a("[Appmsg] onJSAPIGetA8KeyTimeout");
}
}),o.onReady(function(){
window.logs.pagetime.jsapi_ready_time=+new Date,window.logs.idkeys={},console.log("进入index.js init"),
a("[Appmsg] start run index.js init"),t();
});
});