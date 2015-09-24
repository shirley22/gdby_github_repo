"use strict";angular.module("pda",["ngAnimate","ngCookies","ngTouch","ngSanitize","ui.router","ui.bootstrap","dachu.widget"]),angular.module("pda").controller("ModifypwdCtrl",["$scope","req","$location","$cookieStore","$timeout",function(e,r,a,t,o){e.user={mobile:"",password:"",newPassword:"",newRePassword:""},e.modifypwd=function(){if(e.modifypwdForm.$invalid)return e.modifypwdForm.submitted=!0,!1;if(e.user.password===e.user.newPassword)return e.error={cls:"alert alert-danger",msg:"新密码和原密码相同，请重新输入"},!1;if(e.user.newRePassword!==e.user.newPassword)return e.error={cls:"alert alert-danger",msg:"确认新密码填写和新密码不一致"},!1;var a=function(a){return 0!==parseInt(a.status)?(e.error={cls:"alert alert-danger",msg:a.msg},!1):(e.error={cls:"alert alert-success",msg:"修改密码成功!"},void o(function(){r.redirect("login")},2e3))};r.getdata("user/update_password","POST",a,e.user)}}]),angular.module("pda").controller("LoginCtrl",["$scope","req","$location","$cookieStore","HopAuth",function(e,r,a,t,o){o.auth(),1==o.isLogin&&r.redirect("index"),e.user={mobile:"",password:""},e.wait=!1,e.login=function(){if(e.loginForm.$invalid)return e.loginForm.submitted=!0,!1;e.wait=!0;var a=function(a){return e.wait=!1,-1===a.status?(e.error={cls:"alert alert-danger",msg:a.msg},!1):0!==parseInt(a.status)?(e.error={cls:"alert alert-danger",msg:a.msg},!1):(t.put("type",a.info.type),t.put("id",a.info.id),localStorage.setItem("access",a.access),r.redirect("index"),void 0)};r.getdata("user/login","POST",a,e.user)}}]),angular.module("pda").controller("PickingConfirm",["$scope","req","$location","$cookieStore","$stateParams","$timeout","daChuLocal","HopAuth",function(e,r,a,t,o,n,s,i){e.wait=!1,e.code_number="",e.order_count=0,e.error={cls:"alert alert-danger",msg:""};var l={};l.operator_utype=t.get("type"),l.operator_uid=t.get("id"),l.operator_uid||r.redirect("login");var c=function(r){return-1===r.status?(e.error={cls:"alert alert-danger text-center",msg:r.msg},!1):0!==parseInt(r.status)?(e.error={cls:"alert alert-danger text-center",msg:r.data},!1):(e.order_count=r.data.order_count||"",void(e.code_number=r.data.pick_number?r.data.prefix+r.data.pick_number:""))},d={length:function(e){var r=typeof e;if("string"==r)return e.length;if("object"==r){var a=0;for(var t in e)a++;return a}return!1}},p=s.get("picking_info");d.length(p)>0?(e.order_count=p.order_count||"",e.code_number=p.pick_number?p.prefix+p.pick_number:""):(l.code_number=o.code,alert(o.code),r.getdata("pda/picking_info","POST",c,l));var g=function(a){return e.wait=!1,0===parseInt(a.status)&&parseInt(a.data)>0?(e.error={cls:"alert alert-success text-center",msg:"订单更新成功"},void n(function(){r.redirect("picking")},1500)):(e.error={cls:"alert alert-danger text-center",msg:a.data},!1)};e.submit_update=function(){e.wait=!0,""!=e.code_number?(l.code_number=e.code_number,r.getdata("pda/picking","POST",g,l)):(e.wait=!1,e.error={cls:"alert alert-danger text-center",msg:"请提供正确的分拣单号"})},e.logout=function(){i.logout()}}]),angular.module("pda").controller("PickingCtrl",["$scope","req","$location","$cookieStore","daChuLocal","HopAuth",function(e,r,a,t,o,n){document.getElementById("autofocus").focus(),e.wait=!1,e.code_number="",e.error={cls:"alert alert-danger",msg:""};var s={};s.operator_utype=t.get("type"),s.operator_uid=t.get("id"),s.operator_uid||r.redirect("login"),e.logout=function(){n.logout()};var i={length:function(e){var r=typeof e;if("string"==r)return e.length;if("object"==r){var a=0;for(var t in e)a++;return a}return!1}},l=function(a){return e.wait=!1,-1===a.status?(e.error={cls:"alert alert-danger text-center",msg:"failed"==a.msg?a.data:a.msg},!1):0!==parseInt(a.status)?(e.error={cls:"alert alert-danger",msg:a.data},!1):void(i.length(a.data)>0?(o.set("picking_info",a.data),r.redirect("picking_confirm/"+a.data.prefix+a.data.pick_number)):e.error={cls:"alert alert-danger",msg:"无效的分拣单号"})};e.check_code=function(){e.wait=!0,""!=e.code_number?(s.code_number=e.code_number,r.getdata("pda/picking_info","POST",l,s)):(e.wait=!1,e.error={cls:"alert alert-danger",msg:"请提供正确的配送单号"})}}]),angular.module("pda").controller("IndexCtrl",["$scope","req","$location","$cookieStore","HopAuth",function(e,r,a,t,o){var n={};n.operator_utype=t.get("type"),n.operator_uid=t.get("id"),n.operator_uid||r.redirect("login"),e.logout=function(){o.logout()}}]),angular.module("pda").controller("DispatchConfirm",["$scope","req","$location","$cookieStore","$stateParams","$timeout","daChuLocal","HopAuth",function(e,r,a,t,o,n,s,i){e.wait=!1,e.code_number="",e.order_count=0,e.error={"class":"alert alert-danger",msg:""};var l={};l.operator_utype=t.get("type"),l.operator_uid=t.get("id"),l.operator_uid||r.redirect("login");var c=function(r){return 0!==parseInt(r.status)?(e.error={"class":"alert alert-danger",msg:r.data},!1):(e.order_count=r.data.order_count||"",void(e.code_number=r.data.dist_number?r.data.prefix+r.data.dist_number:""))},d=s.get("dispatch_info");d.length>0?(e.order_count=d.order_count||"",e.code_number=data.data.dist_number?data.data.prefix+data.data.dist_number:""):(l.code_number=o.code,r.getdata("pda/dispatch_info","POST",c,l));var p=function(a){return e.wait=!1,-1===a.status?(e.error={cls:"alert alert-danger text-center",msg:a.msg},!1):0===parseInt(a.status)&&parseInt(a.data)>0?(e.error={cls:"alert alert-success",msg:"订单更新成功"},void n(function(){r.redirect("dispatch")},1500)):(e.error={"class":"alert alert-danger",msg:a.data},!1)};e.submit_update=function(){e.wait=!0,""!=e.code_number?(l.code_number=e.code_number,r.getdata("pda/dispatch","POST",p,l)):(e.wait=!1,e.error={cls:"alert alert-danger",msg:"请提供正确的配送单号"})},e.logout=function(){i.logout()}}]),angular.module("pda").controller("DispatchCtrl",["$scope","req","$location","$cookieStore","daChuLocal","HopAuth",function(e,r,a,t,o,n){e.wait=!1,document.getElementById("autofocus").focus(),e.code_number="",e.error={"class":"alert alert-danger",msg:""};var s={};s.operator_utype=t.get("type"),s.operator_uid=t.get("id"),s.operator_uid||r.redirect("login");var i={length:function(e){var r=typeof e;if("string"==r)return e.length;if("object"==r){var a=0;for(var t in e)a++;return a}return!1}},l=function(a){return e.wait=!1,-1===a.status?(e.error={cls:"alert alert-danger text-center",msg:a.msg},!1):0!==parseInt(a.status)?(e.error={cls:"alert alert-danger text-center",msg:a.data},!1):void(i.length(a.data)>0?(o.set("dispatch_info",a.data),r.redirect("dispatch_confirm/"+a.data.prefix+a.data.dist_number)):e.error={cls:"alert alert-danger text-center",msg:"无效的配送单号"})};e.check_code=function(){e.wait=!0,""!=e.code_number?(s.code_number=e.code_number,r.getdata("pda/dispatch_info","POST",l,s)):(e.wait=!1,e.error={cls:"alert alert-danger",msg:"请提供正确的配送单号"})},e.logout=function(){n.logout()}}]),angular.module("pda").controller("TopCtrl",["$scope","$cookieStore","$location","HopAuth",function(e,r,a,t){if(e.currentUrl=a.$$url.split("_")[0],e.status={isopen:!1},t.auth(),e.isLogin=t.isLogin,e.title="商品信息管理系统",e.isLogin){var o=r.get("type");100===parseInt(o)?e.userInfo="超级管理员":10==parseInt(o)?e.userInfo="运营":11===parseInt(o)?e.userInfo="财务":103===parseInt(o)&&(e.userInfo="仓管"),e.toggleDropdown=function(r){r.preventDefault(),r.stopPropagation(),e.status.isopen=!e.status.isopen},e.logout=function(){t.logout()},e.changePwd=function(){t.pwd()}}else a.path("/login")}]),angular.module("pda").controller("SidebarCtrl",["$scope","$location","$cookieStore",function(e,r,a){e.selectedItem=null,e.changeUrl=function(r){e.selectedItem=r};var t=(parseInt(a.get("type")),{name:"分类管理",val:[{name:"分类列表",val:"home.category"},{name:"前端分类映射",val:"home.cateMap"}]}),o={name:"货物管理",val:[{name:"货物列表",val:"home.goods"}]},n={name:"规格管理",val:[{name:"规格列表",val:"home.property"}]};e.urls=[t,n,o]}]),angular.module("pda").controller("NavbarCtrl",["$scope","$cookieStore","$location",function(e,r,a){e.currentUrl=a.$$url.split("_")[0],e.status={isopen:!1},e.title="PMS"}]),angular.module("pda").factory("daChuTimer",function(){var e={getNow:function(){return parseInt((new Date).getTime()/1e3)},cacheTime:30};return{getNow:e.getNow,setCacheTime:function(r){e.cacheTime=parseInt(r)},compare:function(r){var a=this.getNow();return parseInt(r)+e.cacheTime>a?!0:!1}}}),angular.module("pda").factory("req",["$http","$location","$cookieStore","appConfigure",function(e,r,a,t){var o=(r.$$host,t.url),n=t.timeout;return{getdata:function(r,t,s,i){void 0==t&&(t="POST");var l=this;e({url:o+"/"+r+"?r="+Math.random(),method:t,cache:!1,withCredentials:!0,timeout:n,headers:{"Content-Type":"application/x-www-form-urlencoded"},data:i}).success(function(e){e&&-100===e.status&&(a.remove("id"),a.remove("type"),l.redirect("/user/login")),s(e)}).error(function(){var e={};e.status=-1,e.msg="网络连接错误，请重新刷新尝试",s(e)})},init:r,refer:"/",redirect:function(e,a){void 0!=a?this.refer=a:""==e&&r.path(this.refer),r.path(e)}}}]),angular.module("pda").factory("pagination",function(){var e={page:1,isProcessing:!1,processingText:"努力加载中...",isDone:!1,more:"点击加载更多",callback:null};return e.nextPage=function(){e.isProcessing||e.isDone||(e.more="正在加载更多...",e.isProcessing=!0,e.page++,e.callback&&e.callback(function(r){r?(e.isDone=!0,e.more="没有更多了"):e.more="点击加载更多",e.isProcessing=!1}))},e.init=function(r){e.page=1,e.isProcessing=!1,e.isDone=!1,e.more="点击加载更多",e.callback=r},e}),angular.module("pda").factory("daChuLocal",function(){var e={get:function(e){return JSON.parse(localStorage.getItem(e))},set:function(e,r){localStorage.setItem(e,JSON.stringify(r))}};return e}),angular.module("pda").factory("dialog",["$modal",function(e){var r=function(r,a){var t={headerText:"提示信息",bodyText:"设置成功",closeText:"关闭"},o={templateUrl:"myModalContent.html"};angular.extend(o,a),angular.extend(t,r);e.open({templateUrl:o.templateUrl,controller:"ModalInstanceCtrl",resolve:{items:function(){return t}}})};return{tips:r}}]).controller("ModalInstanceCtrl",["$scope","$modalInstance","items",function(e,r,a){e.items=a,e.selected={item:e.items[0]},e.ok=function(){r.close(e.selected.item)},e.cancel=function(){r.dismiss("cancel")}}]),angular.module("pda").factory("HopPermit",["req",function(){var e=[100,10,11,12,103],r={menus:{},checkType:function(r){return-1!==e.indexOf(r)?!0:!1}};return{getPermit:function(e){return r.checkType(e)?!0:!1}}}]).factory("HopAuth",["HopPermit","$cookieStore","req","dialog",function(e,r,a,t){var o={isLogin:!1,getAuth:function(){var a=parseInt(r.get("type"));return e.getPermit(a)?(this.isLogin=!0,!0):(this.isLogin=!1,!1)},changePwd:function(e){var o=this;o.isLogin&&t.tips({headerText:"修改密码",actionText:"修改密码",ok:function(n){return n.newRePassword!=n.newPassword?!1:(angular.isDefined(e)||(e=r.get("id")),a.getdata("user/update_password","POST",function(e){0===parseInt(e.status)?(t.tips({bodyText:e.msg}),o.isLogin=!1,r.remove("type"),r.remove("id"),a.redirect("/user/login")):t.tips({bodyText:e.msg})},n),!1)}},{templateUrl:"password.html"})}};return{isLogin:o.isLogin,auth:o.getAuth,info:{id:r.get("id"),type:r.get("type")},logout:function(){a.getdata("user/logout","GET",function(){r.remove("type"),r.remove("id"),a.redirect("/login")})},pwd:o.changePwd}}]),angular.module("dachu.widget",[]).directive("dachuPagination",[function(){return{restrict:"EA",template:'<div class="page-list"><ul class="pagination" ng-show="conf.totalItems > 0"><li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><span>&laquo;</span></li><li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ng-click="changeCurrentPage(item)"><span>{{ item }}</span></li><li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><span>&raquo;</span></li></ul><div class="page-total" ng-show="conf.totalItems > 0">第<input type="text" ng-model="jumpPageNum"  ng-keyup="jumpToPage($event)"/>页 每页<select ng-model="conf.itemsPerPage" ng-options="option for option in conf.perPageOptions " ng-change="changeItemsPerPage()"></select>/共<strong>{{ conf.totalItems }}</strong>条</div><div class="no-items" ng-show="conf.totalItems <= 0">暂无数据</div></div>',replace:!0,scope:{conf:"="},link:function(e){function r(){e.conf.currentPage=parseInt(e.conf.currentPage)?parseInt(e.conf.currentPage):1,e.conf.totalItems=parseInt(e.conf.totalItems),e.conf.rememberPerPage?(parseInt(localStorage[e.conf.rememberPerPage])||(localStorage[e.conf.rememberPerPage]=parseInt(e.conf.itemsPerPage)?parseInt(e.conf.itemsPerPage):15),e.conf.itemsPerPage=parseInt(localStorage[e.conf.rememberPerPage])):e.conf.itemsPerPage=parseInt(e.conf.itemsPerPage)?parseInt(e.conf.itemsPerPage):15,e.conf.numberOfPages=Math.ceil(e.conf.totalItems/e.conf.itemsPerPage),e.conf.currentPage<1&&(e.conf.currentPage=1),e.conf.currentPage>e.conf.numberOfPages&&(e.conf.currentPage=e.conf.numberOfPages),e.jumpPageNum=e.conf.currentPage;for(var r,a=e.conf.perPageOptions.length,t=0;a>t;t++)parseInt(e.conf.perPageOptions[t])==parseInt(e.conf.itemsPerPage)&&(r=!0);if(r||e.conf.perPageOptions.push(e.conf.itemsPerPage),e.conf.perPageOptions.sort(function(e,r){return e-r}),e.pageList=[],e.conf.numberOfPages<=e.conf.pagesLength)for(t=1;t<=e.conf.numberOfPages;t++)e.pageList.push(t);else{var o=(e.conf.pagesLength-1)/2;if(e.conf.currentPage<=o){for(t=1;o+1>=t;t++)e.pageList.push(t);e.pageList.push("..."),e.pageList.push(e.conf.numberOfPages)}else if(e.conf.currentPage>e.conf.numberOfPages-o){for(e.pageList.push(1),e.pageList.push("..."),t=o+1;t>=1;t--)e.pageList.push(e.conf.numberOfPages-t);e.pageList.push(e.conf.numberOfPages)}else{for(e.pageList.push(1),e.pageList.push("..."),t=Math.ceil(o/2);t>=1;t--)e.pageList.push(e.conf.currentPage-t);for(e.pageList.push(e.conf.currentPage),t=1;o/2>=t;t++)e.pageList.push(e.conf.currentPage+t);e.pageList.push("..."),e.pageList.push(e.conf.numberOfPages)}}e.conf.onChange&&e.conf.onChange(),e.$parent.conf=e.conf}e.changeCurrentPage=function(r){"..."!==r&&(e.conf.currentPage=r)},e.conf.pagesLength=parseInt(e.conf.pagesLength)?parseInt(e.conf.pagesLength):9,e.conf.pagesLength%2===0&&(e.conf.pagesLength=e.conf.pagesLength-1),e.conf.perPageOptions||(e.conf.perPageOptions=[10,15,20,30,50]),e.prevPage=function(){e.conf.currentPage>1&&(e.conf.currentPage-=1)},e.nextPage=function(){e.conf.currentPage<e.conf.numberOfPages&&(e.conf.currentPage+=1)},e.jumpToPage=function(){e.jumpPageNum=e.jumpPageNum.replace(/[^0-9]/g,""),""!==e.jumpPageNum&&(e.conf.currentPage=e.jumpPageNum)},e.changeItemsPerPage=function(){e.conf.rememberPerPage&&localStorage.removeItem(e.conf.rememberPerPage)},e.$watch(function(){var r=e.conf.currentPage+" "+e.conf.totalItems+" ";return r+=e.conf.rememberPerPage&&localStorage[e.conf.rememberPerPage]?localStorage[e.conf.rememberPerPage]:e.conf.itemsPerPage},r)}}}]),angular.module("pda").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,r,a){var t="app/modules";e.state("login",{url:"/login",templateUrl:t+"/user/login.html",controller:"LoginCtrl"}).state("root",{url:"/",templateUrl:t+"/user/login.html",controller:"LoginCtrl"}).state("modifypwd",{url:"/modifypwd",templateUrl:t+"/user/modifypwd.html",controller:"ModifypwdCtrl"}).state("index",{url:"/index",templateUrl:t+"/index/index.html",controller:"IndexCtrl"}).state("picking",{url:"/picking",templateUrl:t+"/picking/picking.html",controller:"PickingCtrl"}).state("picking_confirm",{url:"/picking_confirm/{code}",templateUrl:t+"/picking/picking_confirm.html",controller:"PickingConfirm"}).state("dispatch",{url:"/dispatch",templateUrl:t+"/dispatch/dispatch.html",controller:"DispatchCtrl"}).state("dispatch_confirm",{url:"/dispatch_confirm/{code}",templateUrl:t+"/dispatch/dispatch_confirm.html",controller:"DispatchConfirm"}),r.otherwise("/"),a.html5Mode(!0)}]),angular.module("pda").provider("appConfigure",{$get:["$location",function(e){var r=e.$$host,a=1e4;return r.indexOf("dachuwang")<0&&(r="pda.dachuwang.net",a=1e4),{url:"http://api."+r,timeout:a}}]}),angular.module("pda").run(["$templateCache",function(e){e.put("components/navbar/navbar.html",'<nav class="navbar navbar-inverse navbar-fixed-top" ng-controller="TopCtrl"><script type="text/ng-template" id="myModalContent.html"><div class="modal-header"> <h3 class="modal-title">{{items.headerText}}</h3> </div> <div class="modal-body"> <h2>{{items.bodyText}}</h2> </div> <div class="modal-footer"> <button class="btn btn-primary" ng-click="items.ok();cancel();" ng-if="items.actionText"> {{items.actionText}} </button> <button class="btn btn-warning" ng-click="cancel()">{{items.closeText}}</button> </div></script><script type="text/ng-template" id="password.html"><div class="modal-header"> <h3 class="modal-title">{{items.headerText}}</h3> </div> <div class="modal-body"> <form class="row block block-col form-horizontal" role="form" name="passwordForm"> <div class="form-group col-xs-12"> <label for="password" class="col-sm-2 control-label"> <h5> <b>旧密码</b> </h5> </label> <div class="col-sm-10"> <input type="password" required class="input-lg form-control" ng-model="reg.password" id="password" placeholder="请输入您的旧密码" ng-minlength="6" name="oldpassword"> <div class="col-xs-12 block-col label label-danger" ng-show="passwordForm.oldpassword.$dirty && passwordForm.oldpassword.$invalid"> <small ng-show="passwordForm.oldpassword.$error.minlength">旧密码至少6位</small> <small ng-show="passwordForm.oldpassword.$error.required">旧密码必填</small> </div> </div> </div> <div class="form-group col-xs-12"> <label for="newpassword" class="col-sm-2 control-label"> <h5> <b>新密码</b> </h5> </label> <div class="col-sm-10"> <input type="password" required class="input-lg form-control" ng-model="reg.newPassword" id="newPassword" placeholder="请输入您的新密码" ng-minlength="6" name="password"> <div class="col-xs-12 block-col label label-danger" ng-show="passwordForm.password.$dirty && passwordForm.password.$invalid"> <small ng-show="passwordForm.password.$error.minlength">密码至少6位</small> <small ng-show="passwordForm.password.$error.required">密码必填</small> </div> </div> </div> <div class="form-group col-xs-12"> <label for="newpassword" class="col-sm-2 control-label"> <h5> <b>输入新密码</b> </h5> </label> <div class="col-sm-10"> <input type="password" required class="input-lg form-control" ng-model="reg.newRePassword" id="newRePassword" ng-minlength="6" placeholder="请再次输入您的新密码" name="repassword"> <div class="col-xs-12 block-col label label-danger" ng-show="passwordForm.repassword.$dirty && passwordForm.repassword.$invalid"> <small ng-show="passwordForm.repassword.$error.minlength">确认密码至少6位</small> <small ng-show="passwordForm.repassword.$error.required">确认密码必填</small> </div> <div class="col-xs-12 block-col label label-danger" ng-show="passwordForm.repassword.$dirty && passwordForm.repassword.$valid && reg.newRePassword != reg.newPassword"> <small>两次密码不一致</small> </div> </div> </div> </form> </div> <div class="modal-footer"> <button class="btn btn-primary" ng-click="items.ok(reg);cancel()" ng-if="items.actionText"> {{items.actionText}} </button> <button class="btn btn-warning" ng-click="cancel()">{{items.closeText}}</button> </div></script><div class="container-fluid" ng-controller="NavbarCtrl"><div class="navbar-header" style="width:100%;"><a style="padding-right:0;" href="javascript:history.back()" class="glyphicon navbar-brand glyphicon-chevron-left"></a> <a href="/" class="navbar-brand">{{title}}</a><div ng-if="isLogin"><ul class="nav navbar-nav navbar-right"><li class="dropdown" dropdown=""><a href="/" class="dropdown-toggle" dropdown-toggle="">{{userInfo}}<span class="caret"></span></a><ul class="dropdown-menu"><li ng-click="changePwd()"><a href="#">修改密码</a></li><li ng-click="logout()"><a href="#">登出</a></li><div class="mobile_menu" ng-controller="SidebarCtrl"><ul ng-repeat="url in urls"><li ng-repeat="item in url.val"><a ng-href="{{item.val}}" ng-class="{\'active\': item.val==currentUrl}" class="nav-li-child">{{item.name}}</a></li></ul></div></ul></li></ul></div></div></div></nav><div class="nav-mt"></div>'),e.put("components/navbar/navsidebar.html",'<div class="col-xs-2 sidebar" ng-controller="SidebarCtrl"><ul class="nav nav-sidebar"><li role="presentation" ng-click="changeUrl(item.val)"><a ng-href="/" ng-class="{\'active\': currentUrl==\'/\'}" class="nav-li">首页</a></li></ul><ul class="nav nav-sidebar" ng-repeat="url in urls"><li><h4 class="nav-li">{{url.name}}</h4></li><li ng-repeat="item in url.val" ng-click="changeUrl(item.val)"><a ui-sref="{{item.val}}" ng-class="{\'active\': item.val===selectedItem}" class="nav-li-child">{{item.name}}</a></li></ul></div>'),e.put("app/modules/dispatch/dispatch.html",'<div ng-show="wait"><div class="wait"></div><progressbar class="progress-striped active" value="100" type="info"><i>查询数据中，请稍等</i></progressbar></div><form ng-submit="check_code()"><div class="container"><div class="row"><div class="panel panel-primary"><div class="panel-heading"><a ui-sref="index" class="btn btn-info pull-left">&lt;</a><h3 class="panel-title sort-title main-h3">发运扫码</h3><a ng-click="logout()" class="btn btn-info pull-right">退出</a></div><div class="panel-body"><img src="assets/images/logo.png"><p ng-show="error" class="{{error.cls}}">{{error.msg}}</p><div class="input-group input-group-lg"><span class="input-group-addon">配送单号</span> <input ng-model="code_number" id="autofocus" autofocus="" ng-focus="true" type="text" class="form-control input-fix" maxlength="14" placeholder="请扫描或输入配送路线单号"></div><button type="submit" class="btn btn-success btn-lg form-control btn-a">确认</button></div></div></div></div></form>'),e.put("app/modules/dispatch/dispatch_confirm.html",'<div ng-show="wait"><div class="wait"></div><progressbar class="progress-striped active" value="100" type="info"><i>查询数据中，请稍等</i></progressbar></div><form ng-submit="submit_update()"><div class="container"><div class="row"><div class="panel panel-primary"><div class="panel-heading"><a ui-sref="dispatch" class="btn btn-info pull-left">&lt;</a><h3 class="panel-title sort-title main-h3">确认发运</h3><a ng-click="logout()" class="btn btn-info pull-right">退出</a></div><div class="panel-body"><img src="assets/images/logo.png"><div ng-show="error.msg != \'\'" class="{{error.cls}} text-center" id="wrong" role="alert">{{error.msg}}</div><div class="input-group input-group-lg"><span class="input-group-addon" id="basic-addon1">配送号</span> <span class="form-control">{{code_number}}</span></div><div class="input-group input-group-lg"><span class="input-group-addon">订单量</span> <span class="form-control">{{order_count}}</span></div><button type="submit" class="btn btn-success btn-lg form-control btn-a">确认</button></div></div></div></div></form>'),e.put("app/modules/index/index.html",'<div class="container"><div class="row"><div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title main-title main-h3">主菜单</h3><a ng-click="logout()" class="btn btn-info pull-right">退出</a></div><div class="panel-body"><img src="assets/images/logo.png"> <a ui-sref="picking" type="button" class="btn btn-success btn-lg form-control btn-multi">分拣</a> <a ui-sref="dispatch" type="button" class="btn btn-success btn-lg form-control btn-multi">发运</a></div></div></div></div>'),e.put("app/modules/picking/picking.html",'<div ng-show="wait"><div class="wait"></div><progressbar class="progress-striped active" value="100" type="info"><i>查询数据中，请稍等</i></progressbar></div><form ng-submit="check_code()"><div class="container"><div class="row"><div class="panel panel-primary"><div class="panel-heading"><a ui-sref="index" class="btn btn-info pull-left">&lt;</a><h3 class="panel-title sort-title main-h3">分拣扫码</h3><a ng-click="logout()" class="btn btn-info pull-right">退出</a></div><div class="panel-body"><img src="assets/images/logo.png"><div ng-show="error.msg !=\'\'" class="alert alert-danger text-center" id="wrong" role="alert">{{error.msg}}</div><div class="input-group input-group-lg"><span class="input-group-addon" id="basic-addon1">分拣号</span> <input ng-model="code_number" id="autofocus" autofocus="" type="text" class="form-control input-fix" maxlength="14" placeholder="请扫描或输入分拣单号"></div><button type="submit" class="btn btn-success btn-lg form-control btn-a">确认</button></div></div></div></div></form>'),e.put("app/modules/picking/picking_confirm.html",'<div ng-show="wait"><div class="wait"></div><progressbar class="progress-striped active" value="100" type="info"><i>查询数据中，请稍等</i></progressbar></div><form ng-submit="submit_update()"><div class="container"><div class="row"><div class="panel panel-primary"><div class="panel-heading"><a ui-sref="picking" class="btn btn-info pull-left">&lt;</a><h3 class="panel-title sort-title main-h3">确认分拣</h3><a ng-click="logout()" class="btn btn-info pull-right">退出</a></div><div class="panel-body"><img src="assets/images/logo.png"><div ng-show="error.msg != \'\'" class="{{error.cls}} text-center" id="wrong" role="alert">{{error.msg}}</div><div class="input-group input-group-lg"><span class="input-group-addon">分拣号</span> <span class="form-control">{{code_number}}</span></div><div class="input-group input-group-lg"><span class="input-group-addon">订单量</span> <span class="form-control">{{order_count}}</span></div><button type="submit" class="btn btn-success btn-lg form-control btn-a">确认</button></div></div></div></div></form>'),e.put("app/modules/user/login.html",'<div ng-show="wait"><div class="wait"></div><progressbar class="progress-striped active" value="100" type="info"><i>正在登陆中，请稍等</i></progressbar></div><div class="container"><div class="row"><div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title text-center">WMS-PDA手持系统</h3></div><div class="panel-body"><img src="assets/images/logo.png"><div class="col-md-4 col-md-offset-4"><p ng-show="error" class="{{error.cls}}">{{error.msg}}</p><form class="row block block-col" name="loginForm" role="form" novalidate="" ng-submit="login()"><div class="form-group c_loginb col-xs-12"><div class="col-sm-12"><input type="tel" required="" class="input-lg form-control" ng-model="user.mobile" ng-pattern="/^1[3|5|6|7|8|9]\\d{9}$/" ng-minlength="11" ng-maxlength="11" name="mobile" id="tel" placeholder="请输入手机号"><div class="col-xs-12 block-col label label-danger" ng-show="(loginForm.submitted || loginForm.mobile.$dirty) && loginForm.mobile.$invalid"><span ng-show="loginForm.mobile.$error.minlength">请输入正确的手机号</span> <span ng-show="!loginForm.mobile.$error.minlength && loginForm.mobile.$error.pattern">手机号格式不正确</span> <span ng-show="loginForm.mobile.$error.required">手机号必填</span></div></div></div><div class="form-group c_loginb col-xs-12"><div class="col-sm-12"><input type="password" required="" class="input-lg form-control" ng-minlength="6" ng-model="user.password" name="password" id="password" placeholder="请输入密码"><div class="col-xs-12 block-col label label-danger" ng-show="loginForm.submitted && loginForm.password.$invalid"><span ng-show="loginForm.password.$error.minlength">密码至少6位</span> <span ng-show="loginForm.password.$error.required">密码必填</span></div></div></div><a ui-sref="modifypwd" class="pull-right login-pwd">重置密码</a><div class="form-group col-xs-12"><div class="col-sm-12"><button type="submit" class="btn btn-lg btn-success btn-block">登录</button></div></div></form></div></div></div></div></div>'),e.put("app/modules/user/modifypwd.html",'<div class="container"><div class="row"><div class="panel panel-primary"><div class="panel-heading clearfix"><a href="javascript:history.back()" class="btn btn-info pull-left">&lt;</a><h3 class="panel-title pwd-title main-h3">修改密码</h3></div><div class="panel-body"><img src="assets/images/logo.png"><p ng-show="error" class="{{error.cls}}">{{error.msg}}</p><form name="modifypwdForm" novalidate="" ng-submit="modifypwd()"><div class="alert alert-danger hide" id="wrong" role="alert"></div><div class="input-group-with-alert clearfix"><div class="input-group"><span class="input-group-addon lg-addon">用户名</span> <input type="tel" name="mobile" class="form-control" placeholder="请输入手机号" required="" ng-model="user.mobile" ng-pattern="/^1[3|5|6|7|8|9]\\d{9}$/" ng-minlength="11" ng-maxlength="11"></div><div class="col-xs-12 label label-danger" ng-show="(modifypwdForm.submitted || modifypwdForm.mobile.$dirty) && modifypwdForm.mobile.$invalid"><span ng-show="modifypwdForm.mobile.$error.minlength">请输入正确的手机号</span> <span ng-show="!modifypwdForm.mobile.$error.minlength && modifypwdForm.mobile.$error.pattern">手机号格式不正确</span> <span ng-show="modifypwdForm.mobile.$error.required">手机号必填</span></div></div><div class="input-group-with-alert clearfix"><div class="input-group"><span class="input-group-addon lg-addon">原密码</span> <input name="password" type="password" class="form-control" placeholder="请输入原密码" required="" ng-minlength="6" ng-model="user.password"></div><div class="col-xs-12 label label-danger" ng-show="modifypwdForm.submitted && modifypwdForm.password.$invalid"><span ng-show="modifypwdForm.password.$error.minlength">密码至少6位</span> <span ng-show="modifypwdForm.password.$error.required">密码必填</span></div></div><div class="input-group-with-alert clearfix"><div class="input-group"><span class="input-group-addon lg-addon">新密码</span> <input name="newPassword" type="password" class="form-control" placeholder="请输入新密码" required="" ng-minlength="6" ng-model="user.newPassword"></div><div class="col-xs-12 label label-danger" ng-show="modifypwdForm.submitted && modifypwdForm.newPassword.$invalid"><span ng-show="modifypwdForm.newPassword.$error.minlength">密码至少6位</span> <span ng-show="modifypwdForm.newPassword.$error.required">密码必填</span></div></div><div class="input-group-with-alert clearfix"><div class="input-group"><span class="input-group-addon sm-addon">确认新密码</span> <input name="newRePassword" type="password" class="form-control" placeholder="请再一次输入新密码" required="" ng-minlength="6" ng-model="user.newRePassword"></div><div class="col-xs-12 label label-danger" ng-show="modifypwdForm.submitted && modifypwdForm.newRePassword.$invalid"><span ng-show="modifypwdForm.newRePassword.$error.minlength">密码至少6位</span> <span ng-show="modifypwdForm.newRePassword.$error.required">密码必填</span></div></div><button type="submit" class="btn btn-success btn-lg form-control">确认</button></form></div></div></div></div>')}]);