var jpcList = { '令和':2018, '平成':31, '昭和':64,'大正':15};
var jpc;
var datetime ={1:31,2:28,3:31,4:30,5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31};
var dt = new Date();
$(function(){
    $("#jpc").change(function(){
       jpc = $("#jpc").val();
       var y = dt.getFullYear();
       var max = jpcList[jpc];
       setOption('year');
       setOption('month');
       setOption('day');
       $("#month").prop('disabled',true);
       $("#day").prop('disabled',true);
       if(jpc==='令和') max = y-jpcList[jpc];
       $("#year").prop('disabled',false);
       for(var i=1;i<=max;i++){
           $("#year").append("<option value='"+i+"'>"+i+"</option>");
       }
   });
   $("#year").change(function(){
       var i=1;
       var max=12;
       $("#month").prop('disabled',false);
       $("#day").prop('disabled',true);
       switch (jpc) {
           case '令和':
               if($("#year").val()==1) i=5;
               else if($('#year').val()==dt.getFullYear()-jpcList[jpc]) max=dt.getMonth()+1;//
               break;
           case '平成':
               if($("#year").val()==31) max=4;
               break;
           case '昭和':
               if($("#year").val()==64) max=1;
                else if($("#year").val()==1) i = 12;
               break;
           case '大正':
                if($("#year").val()==1) i=7;
                break;
       }
       setOption('month');
       setOption('day');
      for(i;i<=max;i++){
          $("#month").append("<option value='"+i+"'>"+i+"</option>");
      }
   });
   $("#month").change(function(){
       setOption('day');
       $("#day").prop('disabled',false);
       var i=1;
       var max = datetime[$("#month").val()];
       if(isLeapYear(parseInt($("#year").val())+parseInt(jpcList[jpc]))&&$("#month").val()==2){
           console.log('うる年');
           max = 29;
       }
       switch (jpc) {
           case '令和':
               if($('#year').val()==dt.getFullYear()-jpcList[jpc]) max=dt.getDate();//
               break;
           case '平成':
               if($("#year").val()==1&&$("#month").val()==1) i=8;
               break;
           case '昭和':
               if($("#year").val()==64)max=7;
               else if($("#year").val()==1&&$("#month").val()==12) i = 26;
               break;
           case '大正':
                if($("#year").val()==15&&$("#month").val()==12) max=25;
                else if($("#year").val()==1&&$("#month").val()==7) i = 30;
                break;
       }
       for(i;i<=max;i++){
          $("#day").append("<option value='"+i+"'>"+i+"</option>");
       }
   });
});
function setOption(id){
   $("#"+id).empty();
   $("#"+id).append("<option value='' hidden disabled selected></option>");
}
function isLeapYear(year) {
    return (year%4 == 0) && (year%100 != 0) || (year%400 == 0);
}