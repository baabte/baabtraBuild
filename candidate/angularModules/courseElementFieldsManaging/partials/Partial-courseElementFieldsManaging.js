angular.module('baabtra').controller('CourseelementfieldsmanagingCtrl',['$scope','$rootScope','commonService', 'courseElementFieldsManaging', '$alert','$modal',function ($scope, $rootScope, commonService, courseElementFieldsManaging, $alert, $modal){


  /*login detils start*/
  if(!$rootScope.userinfo){
    commonService.GetUserCredentials($scope);
    $rootScope.hide_when_root_empty=false;
  }
  
  if(angular.equals($rootScope.loggedIn,false)){
    $state.go('login');
  }

  $scope.coursePreviewObject={};
  $scope.rm_id=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
  $scope.roleId=$rootScope.userinfo.ActiveUserData.roleMappingObj.fkRoleId;
  /*login detils ends*/

  $scope.element = {};
  $scope.element.canAdd = true;
  $scope.element.canBeAnAnswer = false;
  /*commented by akshath */
  //var courseElementFields = courseElementFieldsManaging.fnGetCourseElementFields();
  var courseElementFields = courseElementFieldsManaging.fnGetCourseElementFieldsTemp();
  
  courseElementFields.then(function(response){
  	$scope.courseElementFields = angular.fromJson(JSON.parse(response.data));
  });

$scope.palette = [{"id": "1","name": "Text input fields"},
				  {"id": "2","name": "Checkbox fields"},
				  {"id": "3","name": "Select input fields"},
				  {"id": "4","name": "Other fields"},
				  {"id": "5","name": "Course element fields"}];

  $scope.toggleCanAdd =function(canAdd){
    $scope.element.canAdd = !canAdd;
  };

  $scope.saveCourseElementFields = function(){//for save course element
  	$scope.element.updatedDate = Date();
  	$scope.element.urmId = $scope.rm_id;
  	$scope.element.activeFlag = 1;

  	if (!angular.equals($scope.element._id,undefined)) {
  		$scope.element.crmId = $scope.element.crmId.$oid;
  		$scope.element._id = $scope.element._id.$oid?$scope.element._id.$oid:$scope.element._id;
  	}
  	else{
  		$scope.element.crmId = $scope.rm_id;
  		$scope.element.createdDate = Date();
  	}
    console.log($scope.element);
  	var saveCourseElement = courseElementFieldsManaging.fnSaveCourseElementFields($scope.element);//calling service fn for save course element
  	
  	saveCourseElement.then(function(response){
  		var result = angular.fromJson(JSON.parse(response.data));
  		$alert({title: 'Done!', content: result.msg, placement: 'top-right', type: 'success', show: true, animation:'am-fade-and-slide-right', duration:5});
  		$scope.courseElementFields = result.data;
  		$scope.element = {};
  	});

  };

  $scope.editCourseElement = function(courseElement){
  	$scope.element = courseElement;
    $scope.$apply();
  };

  var lasteDeletedId = 0;
  $scope.fnDeleteCourseElementFields = function(elementId){
  	var manageType = {};
  	manageType.activeFlag = 0;
  	lasteDeletedId = elementId;
  	var deleteElement = courseElementFieldsManaging.fnDeleteCourseElementFields(elementId, manageType, $scope.rm_id);
  	deleteElement.then(function(response){
  		$scope.element = {};
  		var udoElement = $alert({scope: $scope,container:'body',keyboard:true,animation:'am-fade-and-slide-top',template:'views/ui/angular-strap/alert.tpl.html',title:'Undo',content:'The course element has been deleted', placement: 'top-right', type: 'warning'});
  		var result = angular.fromJson(JSON.parse(response.data));
  		$scope.courseElementFields = result;

  	});

  };

  $scope.undo = function(){
  	var manageType = {};
  	manageType.activeFlag = 1;
  	var undoDelete = courseElementFieldsManaging.fnDeleteCourseElementFields(lasteDeletedId, manageType, $scope.rm_id);
  	
  	undoDelete.then(function(response){
  		var result = angular.fromJson(JSON.parse(response.data));
  		$scope.courseElementFields = result;
  	});
  };

  $scope.IconName=["fa-adjust circle half","fa-anchor","fa-archive box","fa-arrows","fa-arrows-h","fa-arrows-v","fa-asterisk star","fa-at gmail","fa-automobile","fa-ban","fa-bank","fa-barcode","fa-bars","fa-beer","fa-bell","fa-bell-o","fa-bell-slash","fa-bell-slash-o","fa-bicycle","fa-binoculars","fa-birthday-cake","fa-bolt","fa-bomb","fa-book","fa-bookmark","fa-bookmark-o","fa-briefcase","fa-bug patta","fa-building","fa-building-o","fa-bullhorn","fa-bullseye i","fa-bus","fa-cab","fa-calculator","fa-calendar","fa-calendar-o","fa-camera","fa-camera-retro","fa-car","fa-caret-square-o-down","fa-caret-square-o-left","fa-caret-square-o-right","fa-caret-square-o-up","fa-cc","fa-certificate","fa-check","fa-check-circle","fa-check-circle-o","fa-check-square","fa-check-square-o","fa-child","fa-circle","fa-circle-o","fa-circle-o-notch","fa-circle-thin","fa-clock-o","fa-close","fa-cloud","fa-cloud-download","fa-cloud-upload","fa-code","fa-code-fork","fa-coffee","fa-cog","fa-cogs","fa-comment","fa-comment-o","fa-comments","fa-comments-o","fa-compass","fa-copyright","fa-credit-card","fa-crop","fa-crosshairs","fa-cube","fa-cubes","fa-cutlery","fa-dashboard","fa-database","fa-desktop","fa-dot-circle-o","fa-download","fa-edit","fa-ellipsis-h","fa-ellipsis-v","fa-envelope","fa-envelope-o","fa-envelope-square","fa-eraser","fa-exchange","fa-exclamation","fa-exclamation-circle","fa-exclamation-triangle","fa-external-link","fa-external-link-square","fa-eye i","fa-eye-slash i","fa-eyedropper i","fa-fax","fa-female","fa-fighter-jet","fa-file-archive-o","fa-file-audio-o","fa-file-code-o","fa-file-excel-o","fa-file-image-o","fa-file-movie-o","fa-file-pdf-o","fa-file-photo-o","fa-file-picture-o","fa-file-powerpoint-o","fa-file-sound-o","fa-file-video-o","fa-file-word-o","fa-file-zip-o","fa-film","fa-filter","fa-fire","fa-fire-extinguisher","fa-flag","fa-flag-checkered","fa-flag-o","fa-flash","fa-flask","fa-folder","fa-folder-o","fa-folder-open","fa-folder-open-o","fa-frown-o","fa-futbol-o","fa-gamepad","fa-gavel","fa-gear","fa-gears","fa-gift","fa-glass","fa-globe","fa-graduation-cap","fa-group","fa-hdd-o","fa-headphones","fa-heart","fa-heart-o","fa-history","fa-home","fa-image","fa-inbox","fa-info","fa-info-circle","fa-institution","fa-key","fa-keyboard-o","fa-language","fa-laptop","fa-leaf","fa-legal","fa-lemon-o","fa-level-down","fa-level-up","fa-life-bouy","fa-life-buoy","fa-life-ring","fa-life-saver","fa-lightbulb-o","fa-location-arrow","fa-lock","fa-magic","fa-magnet","fa-mail-forward","fa-mail-reply","fa-mail-reply-all","fa-male","fa-map-marker","fa-meh-o","fa-microphone","fa-microphone-slash","fa-minus","fa-minus-circle","fa-minus-square","fa-minus-square-o","fa-mobile","fa-mobile-phone","fa-money","fa-moon-o","fa-mortar-board","fa-music","fa-navicon","fa-newspaper-o","fa-paint-brush","fa-paper-plane","fa-paper-plane-o","fa-paw","fa-pencil","fa-pencil-square","fa-pencil-square-o","fa-phone","fa-phone-square","fa-photo","fa-picture-o","fa-plane","fa-plug","fa-plus","fa-plus-circle","fa-plus-square","fa-plus-square-o","fa-power-off","fa-print","fa-puzzle-piece","fa-qrcode","fa-question","fa-question-circle","fa-quote-left","fa-quote-right","fa-random","fa-recycle","fa-refresh","fa-remove","fa-reorder","fa-reply","fa-reply-all","fa-retweet","fa-road","fa-rocket","fa-rss","fa-rss-square","fa-search","fa-search-minus","fa-search-plus","fa-send","fa-send-o","fa-share","fa-share-alt","fa-share-alt-square","fa-share-square","fa-share-square-o","fa-shield","fa-shopping-cart","fa-sign-in","fa-sign-out","fa-signal","fa-sitemap","fa-sliders","fa-smile-o","fa-soccer-ball-o","fa-sort","fa-sort-alpha-asc","fa-sort-alpha-desc","fa-sort-amount-asc","fa-sort-amount-desc","fa-sort-asc","fa-sort-desc","fa-sort-down","fa-sort-numeric-asc","fa-sort-numeric-desc","fa-sort-up","fa-space-shuttle","fa-spinner","fa-spoon","fa-square","fa-square-o","fa-star","fa-star-half","fa-star-half-empty","fa-star-half-full","fa-star-half-o","fa-star-o","fa-suitcase","fa-sun-o","fa-support","fa-tablet","fa-tachometer","fa-tag","fa-tags","fa-tasks","fa-taxi","fa-terminal","fa-thumb-tack","fa-thumbs-down","fa-thumbs-o-down","fa-thumbs-o-up","fa-thumbs-up","fa-ticket","fa-times","fa-times-circle","fa-times-circle-o","fa-tint","fa-toggle-down","fa-toggle-left","fa-toggle-off","fa-toggle-on","fa-toggle-right","fa-toggle-up","fa-trash","fa-trash-o","fa-tree","fa-trophy","fa-truck","fa-tty","fa-umbrella","fa-university","fa-unlock","fa-unlock-alt","fa-unsorted","fa-upload","fa-user","fa-users","fa-video-camera","fa-volume-down","fa-volume-off","fa-volume-up","fa-warning","fa-wheelchair","fa-wifi","fa-wrench","fa-file","fa-adn","fa-android","fa-angellist","fa-apple","fa-behance","fa-behance-square","fa-bitbucket","fa-bitbucket-square","fa-bitcoin","fa-btc","fa-cc-amex","fa-cc-discover","fa-cc-mastercard","fa-cc-paypal","fa-cc-stripe","fa-cc-visa","fa-codepen","fa-css3","fa-delicious","fa-deviantart","fa-digg","fa-dribbble","fa-dropbox","fa-drupal","fa-empire","fa-facebook","fa-facebook-square","fa-flickr","fa-foursquare","fa-ge","fa-git","fa-git-square","fa-github","fa-github-alt","fa-github-square","fa-gittip","fa-google","fa-google-plus","fa-google-plus-square","fa-google-wallet","fa-hacker-news","fa-html5","fa-instagram","fa-ioxhost","fa-joomla","fa-jsfiddle","fa-lastfm","fa-lastfm-square","fa-linkedin","fa-linkedin-square","fa-linux","fa-maxcdn","fa-meanpath","fa-openid","fa-pagelines","fa-paypal","fa-pied-piper","fa-pied-piper-alt","fa-pinterest","fa-pinterest-square","fa-qq","fa-ra","fa-rebel","fa-reddit","fa-reddit-square","fa-renren","fa-skype","fa-slack","fa-slideshare","fa-soundcloud","fa-spotify","fa-stack-exchange","fa-stack-overflow","fa-steam","fa-steam-square","fa-stumbleupon","fa-stumbleupon-circle","fa-tencent-weibo","fa-trello","fa-tumblr","fa-tumblr-square","fa-twitch","fa-twitter","fa-twitter-square","fa-vimeo-square","fa-vine","fa-vk","fa-wechat","fa-weibo","fa-weixin","fa-windows","fa-wordpress","fa-xing","fa-xing-square","fa-yahoo","fa-yelp","fa-youtube","fa-youtube-play","fa-youtube-square","fa-ambulance","fa-h-square","fa-hospital-o","fa-medkit","fa-stethoscope","fa-user-md","fa-arrows-alt","fa-backward","fa-compress","fa-eject","fa-expand","fa-fast-backward","fa-fast-forward","fa-forward","fa-pause","fa-play","fa-play-circle","fa-play-circle-o","fa-step-backward","fa-step-forward","fa-stop","fa-angle-double-down","fa-angle-double-left","fa-angle-double-right","fa-angle-double-up","fa-angle-down","fa-angle-left","fa-angle-right","fa-angle-up","fa-arrow-circle-down","fa-arrow-circle-left","fa-arrow-circle-o-down","fa-arrow-circle-o-left","fa-arrow-circle-o-right","fa-arrow-circle-o-up","fa-arrow-circle-right","fa-arrow-circle-up","fa-arrow-down","fa-arrow-left","fa-arrow-right","fa-arrow-up","fa-caret-down","fa-caret-left","fa-caret-right","fa-caret-up","fa-chevron-circle-down","fa-chevron-circle-left","fa-chevron-circle-right","fa-chevron-circle-up","fa-chevron-down","fa-chevron-left","fa-chevron-right","fa-chevron-up","fa-hand-o-down","fa-hand-o-left","fa-hand-o-right","fa-hand-o-up","fa-long-arrow-down","fa-long-arrow-left","fa-long-arrow-right","fa-long-arrow-up","fa-align-center","fa-align-justify","fa-align-left","fa-align-right","fa-bold","fa-chain","fa-chain-broken","fa-clipboard","fa-columns","fa-copy","fa-cut","fa-dedent","fa-file-o","fa-file-text","fa-file-text-o","fa-files-o","fa-floppy-o","fa-font","fa-header","fa-indent","fa-italic","fa-link","fa-list","fa-list-alt","fa-list-ol","fa-list-ul","fa-outdent","fa-paperclip","fa-paragraph","fa-paste","fa-repeat","fa-rotate-left","fa-rotate-right","fa-save","fa-scissors","fa-strikethrough","fa-subscript","fa-superscript","fa-table","fa-text-height","fa-text-width","fa-th","fa-th-large","fa-th-list","fa-underline","fa-undo","fa-unlink","fa-area-chart","fa-bar-chart","fa-bar-chart-o","fa-line-chart","fa-pie-chart"];

  $scope.GetIcon = function(){//functon for show icons for menus
  	$modal({ scope: $scope,
               template: 'angularModules/company/partials/iconPage.html',
               placement:'center',
               show: true});
    };

}]);