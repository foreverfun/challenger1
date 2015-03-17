var viewMessage = function(e) {
  e.preventDefault();

  var originalMsgElement = $(this).closest('.msg');
  var targetId = originalMsgElement.attr('data-msgid');

  $.get('/message/'+targetId, function(dataFromServer){
    $('.msgid').text(dataFromServer._id);
    $('.msgdate').text(dataFromServer.msgdate);
    //console.log(dataFromServer.invite.name);
    $('.msgchallenger').text(dataFromServer.invite.name);
    $('.msgchallenger').append(
      '<p><img src="/images4demo/' + 
      dataFromServer.invite.image +  
      '" height="100"/></p>');
    $('.msgchallenged').text(dataFromServer.beinvited.name);
    $('.msgchallenged').append(
      '<p><img src="/images4demo/' + 
      dataFromServer.beinvited.image +  
      '" height="100"/></p>');
    $('.msgplaydate').val(dataFromServer.playdate);
    $('.msgplaytime').val(dataFromServer.playtime);

    // var mtime = dataFromServer.playtime;
    // var hours24 = parseInt(mtime.substring(0,2),10);
    // var hours = ((hours24+11)%12)+1;
    // var amPm = hours24>11?'PM':'AM';
    // var minutes = mtime.substring(2);
    // var dtime = hours + ':' + minutes + amPm;
    // console.log(dtime);
    // $('.msgplaytime').val(dtime);

    $('.msgcourtname').val(dataFromServer.courtname);
    $('.msgcourtaddress').val(dataFromServer.courtlocation)

    //console.log(dataFromServer.content);
    var premsg = "";
    for (var i=0; i<dataFromServer.content.length; i++) {
        premsg = premsg + dataFromServer.content[i] +"<br/>";
    }
    $('.msgaddcontent').remove();
    $('.msgprecontent').append("<div class='msgaddcontent'>" + premsg + "</div>");

    if (dataFromServer.status === "Closed") {
      // $('.msgcontentdiv').hide();
      $('.msgcontentl').hide();
      $('.msgcontent').hide();
    } else {
      $('.msgcontentl').show();
      $('.msgcontent').show();
    }


  });

  $('#detailedmsg-modal').modal('show');
}

var updateMessage = function(e) {
  e.preventDefault();

  $('#detailedmsg-modal').modal('hide');
  
  var msgId = $('.msgid').text();
  var msgDate = $('.msgdate').text();
 
  var playDate = $('.msgplaydate').val();
  var playTime = $('.msgplaytime').val();

  //console.log(msgId);
  var courtName = $('.msgcourtname').val();
  var courtAddress = $('.msgcourtaddress').val();
 
  var todayDate = new Date();
  var todaydate = todayDate.toDateString();
  var content = $('.msgcontent').val(); 

  var messageData = {
    msgid: msgId,
    msgdate: msgDate,
    courtname: courtName,
    courtaddress: courtAddress,
    playdate: playDate,
    playtime: playTime,
    todaydate: todaydate,
    content: content
  };

  console.log(messageData);
  $.post('/msgu', messageData);
}

var closeMessage = function(e) {
  e.preventDefault();

  $('#detailedmsg-modal').modal('hide');
  
  var msgId = $('.msgid').text();
  var msgDate = $('.msgdate').text();
  var status = "Closed";

  var messageData = {
    msgid: msgId,
    msgdate: msgDate,
    status: status
  };

  console.log(messageData);
  $.post('/msgc', messageData);
}

$(document).on('ready', function(){
  // open view detailed message modal
  $(document).on('click', '.viewmsg', viewMessage);
  
  $('.updatemsg').on('click', updateMessage);
  $('.closemsg').on('click', closeMessage);

});