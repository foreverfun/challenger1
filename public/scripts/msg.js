var viewMessage = function(e) {
  e.preventDefault();

  var originalMsgElement = $(this).closest('.msg');
  var targetId = originalMsgElement.attr('data-msgid');

  $.get('/message/'+targetId, function(dataFromServer){
    $('.msgchallenger').text(dataFromServer.invite.name);
    $('.msgchallenged').text(dataFromServer.beinvited.name);
    $('.msgplaydatetime').val(dataFromServer.playdatetime);
    $('.msgcourtname').val(dataFromServer.courtname);
    $('.msgcourtaddress').val(dataFromServer.courtlocation)

    //console.log(dataFromServer.content);
    
    var premsg='';
    for (var i=0; i< dataFromServer.content.length; i++) {
      premsg = premsg + dataFromServer.content[i];
    }
    $('.msgprecontent').text(premsg);

  });

  $('#detailedmsg-modal').modal('show');
}


$(document).on('ready', function(){
  // open view detailed message modal
  $(document).on('click', '.viewmsg', viewMessage);
});