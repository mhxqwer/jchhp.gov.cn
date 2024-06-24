//头部固定频道js
$(document).ready(function(){
        $(".header-nav li").each(function(){
            if($.trim($(this).text())==channelName){
                $(this).addClass("hover");
            }
        })
    })

  $(document).ready(function() {
                $(window).scroll(function(){
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop>300) {
                        $('.header-div').addClass('hover');
                    }else{
                        $('.header-div').removeClass('hover');
                    }
                    
                });

        });

	// tab 切换
	window.$bindArrow = function (obj) {
		var $tabs = $(obj.tabs)
		var $tabsPanel = $(obj.tabsPanel)
		var $index = obj.initPos || 0
		$tabs.bind(
		{
			keydown: function(ev){
				var LEFT_ARROW = 37;
				var UP_ARROW = 38;
				var RIGHT_ARROW = 39;
				var DOWN_ARROW = 40;

				var k = ev.which || ev.keyCode;

				if (k >= LEFT_ARROW && k <= DOWN_ARROW){
					if (k == LEFT_ARROW || k == UP_ARROW){
						if ($index > 0) {
							$index--;
						}
						else {
							$index = $tabs.length - 1;
						}
					}
					else if (k == RIGHT_ARROW || k == DOWN_ARROW){
						if ($index < ($tabs.length - 1)){
							$index++;
						}
						else {
							$index = 0;
						}
					}
					// $($tabs.get($index)).click();
					setFocus($index)
					ev.preventDefault();
				}
			},
			// click: function(ev){
			// 	$index = $.inArray(this, $tabs.get())
			// 	setFocus($index)
			// }
		})

		//初始化
		init()

		function setChildNode($index) {
			$tabs.find(obj.childNode).attr(
			{
				tabindex: '-1',
				'aria-selected': 'false'
			})

			$($tabs.get($index)).find(obj.childNode).attr(
			{
				tabindex: '0',
				'aria-selected': 'true'
			})
		}

		function init() {
			var initCount =  0;
			if (obj.childNode) {
				setChildNode(initCount)
			}
			$tabs.attr(
			{
				tabindex: '-1',
				'aria-selected': 'false'
			}).removeClass(obj.active)

			$($tabs.get($index)).attr(
			{
				tabindex: '0',
				'aria-selected': 'true'
			}).addClass(obj.active)
		}

		function initTree(p, cb) {
			
			for (var i = 0; i < p.children.length; i++) {
				// 遍历第一级子元素
				var child = p.children[i];
				if(cb){
					cb(child);
				}
				// 递归
				initTree(child);
			}
		}
		
		function setFocus($index) {
			$tabs.attr(
			{
				tabindex: '-1',
				'aria-selected': 'false'
			}).removeClass(obj.active)

			$($tabs.get($index)).attr(
			{
				tabindex: '0',
				'aria-selected': 'true'
			}).addClass(obj.active).focus()
			// 控制区块显隐方式
			if(obj.type === 'display'){
				$tabsPanel.hide()

				$($tabsPanel.get($index)).show()
			}else if(obj.type === 'animate'){
				// do something

				// $tabsPanel.each(function(){
				// 	initTree(this, function(ele){
				// 		$(ele).attr({
				// 			tabindex: '-1',
				// 		});
				// 	})
				// });

				// initTree($($tabsPanel.get($index)), function(ele){
				// 	$(ele).attr({
				// 		tabindex: '0',
				// 	});
				// })
				$tabsPanel.attr(
				{
					tabindex: '-1',
				});
				$($tabsPanel.get($index)).attr(
				{
					tabindex: '0',
				});
			}
			if (obj.childNode) {
				setChildNode($index)
			}
		}
	}

	// select 切换
	window.$bindSelect = function(obj) {  
		var $selectedItem = $(obj.selectedItem)
		var $menus = $(obj.menus)
		var $index = 0     
		$selectedItem.attr(
			{
				tabindex: '0',
				role: 'menu'
			})
		$menus.attr(
			{
				role: 'menuitem'
			})
		$selectedItem.bind(
			{
				keydown: function(ev, inx) {
					var SPACE = 32
					var ESC = 27  
					var ENTER = 13        
					var k = ev.which || ev.keyCode;
					if (k == SPACE || k == ENTER) {
						if(ev.preventDefault){
							ev.preventDefault();
						}else{
							window.event.returnValue = false;
						}
						setFocus(ev)
					}
					if (k == ESC) {
						setClose(ev)
					}

				}
			})

		function setClose(ev) {
			var target = $(ev.target)
			var selectedItem = target.closest(obj.selectedItem)
			var panel = selectedItem.find(obj.menus)
			panel.hide()
			selectedItem.focus()
		}

		function setFocus(ev) {
			var panel = $(ev.target).find(obj.menus)
			$menus.hide()
			panel.show()
		}
	}
//百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?71fb825662ba4f152c32c8e30f325d7a";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
         // $(document).ready(function() {
          //      $(window).scroll(function(){
                 //   var scrollTop = $(window).scrollTop();
                 //   if (scrollTop>500) {
                      //  $('.search-div').addClass('hover');
                  //  }else{
                 //       $('.search-div').removeClass('hover');
                 //   }
                    
              //  });

      //  });