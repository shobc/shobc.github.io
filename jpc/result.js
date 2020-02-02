var signList ={'山羊座':'やぎ.gif','水瓶座':'みずがめ.gif','魚座':'うおざ.gif','牡羊座':'ひつじ.gif','牡牛座':'おうしざ.gif','双子座':'ふたご.gif','蟹座':'かに.gif','しし座':'ししざ.gif','乙女座':'おとめざ.gif','てんびん座':'てんびんざ.gif','蠍座':'さそりざ.gif','射手座':'いてざ.gif'};
var colorList ={'赤':'red','青':'blue','緑':'green','黄色':'yellow','紫':'#a260bf','黒':'black','白':'white','ピンク':'pink','オレンジ':'orange','藍':'#35357d','黄金':'#ffd700','白銀':'#C0C0C0'};
$(function(){
	for(var i=1;i<3;i++){
		var sign = $('#sign'+i).text();
		$('#sign'+i).css('background-image','url(image/'+signList[sign]+')');
	}
	$(".circle").each(function(i,o){
		console.log(i+1);
		var j = i+1;
	  $(o).css('background',colorList[$('#color'+j).text()]);
	});
	$('#image').append('<img src="image/'+signList[$(".sign").text().substring(3)]+'" height=175px width=175px>');
});