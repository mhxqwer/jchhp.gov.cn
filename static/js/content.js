function doZoom(size1, size2, size3, size4) {
	document.getElementById('zoomcon').style.fontSize = size4 + 'px';
	$("#zoomcon div").css({
		"font-size": size4 + 'px'
	});
	$("#zoomcon p").css({
		"font-size": size4 + 'px'
	});
	$("#zoomcon span").css({
		"font-size": size4 + 'px'
	});
	$("#zoomcon font").css({
		"font-size": size4 + 'px'
	});
	$("#zoomcon ul").css({
		"font-size": size4 + 'px'
	});
	$("#zoomcon li").css({
		"font-size": size4 + 'px'
	});
	$("#zoomcon a").css({
		"font-size": size4 + 'px'
	});

}

function bzdt(a) {
	var htm = $.trim($('#' + a + '_v').html());
	if (htm != '') {
		$('#' + a + '_v').css('display', 'block')
		$('#' + a).css('display', 'block')
	}
}
$(function() {
	bzdt('rel');
});
$('#share-1').share();
$('#share-2').share({
	sites: ['qzone', 'qq', 'weibo', 'wechat']
});
$('#share-3').share();
$('#share-4').share();


//相关文章
	if ($(".article_documents ul li").length > 0) {
		$(".article_documents").fadeIn("fast");
	}


//mp4格式视频兼容方法：
function convertMedia(){
		if (!document.getElementById("zoomcon")) return ;
		var mediaDom = document.getElementById("zoomcon").getElementsByTagName("embed") ;
		var videoDom = document.createElement("video") ;
		if (typeof(videoDom.canPlayType) != "undefined" && mediaDom && mediaDom.length > 0){
			for(var i = 0 ; i < mediaDom.length ; i++) {
				var el = mediaDom[i] ;
				var newMediaDom = document.createElement("video") ;
				newMediaDom.setAttribute("controls" , "controls") ;
				newMediaDom.setAttribute("preload" , "preload") ;
				newMediaDom.setAttribute("src" , el.getAttribute("flashvars").replace(/^vcastr_file=/ , "")) ;
				newMediaDom.setAttribute("width" , "98%") ; // el.width
				newMediaDom.setAttribute("height" , "auto") ; // el.height
				var parentDom = el.parentNode ;
				el.style.display="none" ;
				parentDom.appendChild(newMediaDom) ;
				//parentDom.removeChild(el) ;
			}
			var len = mediaDom.length ;
			for(var i = 1 ; mediaDom.length > 0 ; i++ ) {
				
				var parentDom = mediaDom[0].parentNode ;
				parentDom.removeChild(mediaDom[0]) ;
				
				if (i >= len){
					break ;
				}
			}
		}
	}
convertMedia() ;



$(function(){
	window.onload = function() {
	var imgs = document.querySelectorAll('img');
	imgs.forEach(function(img) {
		var src = img.src;
		if (src.startsWith('http://')) {
			img.src = src.replace(/^http:\/\//, 'https://');
		}
	});
};

})