var curStep = 0;
var curLength = 0;
var curPics = [];
var curID = '';
var curGeo = '';

$(window).load(function () {
	$('#preloader').fadeOut();
});

$(document).ready(function () {
	$(".main").onepage_scroll();

	$('#navHome').click(function(){
		$(".main").moveTo(1);
	});

	$('#navPortfolio').click(function(){
		$(".main").moveTo(2);
	});

	$('#navContact').click(function(){
		$(".main").moveTo(3);
	});

	$('#showWorkClose').click(function (){
		$('#showWorkWrapper').fadeOut();
		$('#showWorkHeader').html('');
		$('#showWorkItems').html('');
	});

	$('.portfolioItems').click(function(event) {
		var id = $(this).attr('id');
		$('#showWorkContent').hide();
		$('#ajaxLoader').fadeIn();
		$.getJSON('js/info.json', function (data){
			if(data[id]) {
				var that = data[id];
				curLength = data[id].pics.length;
				curPics = data[id].pics;
				curID = id;
				$('#showWorkHeader').html(that.text);
				$('#showWorkItems').html('');
				$('#showWorkPic').html('<img src="img/work/'+id+'/'+data[id].pics[0]+'" />');
				for (var i = 0; i < data[id].pics.length; i++) {
					var onclk = "changePicture('"+id+"', '"+data[id].pics[i]+"', "+i+")";
					$('#showWorkItems').append('<img src="img/work/'+id+'/'+data[id].pics[i]+'" onclick="'+onclk+'" />');
				};
				$('#showWorkWrapper').fadeIn(1000);
				setTimeout(function(){
					$('#ajaxLoader').hide();					
					$('#showWorkContent').fadeIn();
				}, 2000);				
			}
			if (data[id].geo != 'none') {
				curGeo = data[id].geo;
				$('#showMap').html(curGeo);
				$('#showOnMap').fadeIn();
			}
		});
	});
});

function changePicture(id, pic, step){
	curStep = step;
	$('#showWorkPic').html('<img src="img/work/'+id+'/'+pic+'" />');
}

$(document).on('click', '#leftArrow', function(event) {
	--curStep;
	if (curStep <= 0) curStep = curLength - 1;
	$('#showWorkPic').html('<img src="img/work/'+curID+'/'+curPics[curStep]+'" />');
});

$(document).on('click', '#rightArrow', function(event) {
	++curStep;
	if (curStep >= curLength - 1) curStep = 0;
	$('#showWorkPic').html('<img src="img/work/'+curID+'/'+curPics[curStep]+'" />');
});

$(document).on('click', '#showOnMap', function(event) {
	$('#showMap').fadeIn();
});

