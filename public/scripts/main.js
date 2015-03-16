var viewPlayer = function(e) {
  e.preventDefault();


  var originalPlayerElement = $(this).closest('.player');
  var targetId = originalPlayerElement.attr('data-playerid');
  
  // with player id, get data from database
  // display on the view a player dialog box
  $.get('/player/' + targetId, function(dataFromServer){
    //console.log(dataFromServer);
    $('.playerpic').attr('src', "/images4demo/"+dataFromServer.image);
    //$('.playerpic').text(dataFromServer.image);
    $('.player-username').text(dataFromServer.username);
    $('.player-name').text(dataFromServer.name);
    $('.player-age').text(dataFromServer.age);
    $('.player-gender').text(dataFromServer.gender);
    $('.player-ntrp').text(dataFromServer.ntrp);
    $('.player-location').text(dataFromServer.location);
  });

  // show view a player dialog box
  $('#viewplayer-modal').modal('show');  
  
};

// open filter players modal
var showFilterPlayersModal = function() {
    //console.log("user", user);
    // get user's ntrp
    // set default to 0.5 up & down 
    $('#filterplayers-modal').modal('show');
}

var filterPlayers = function(e) {
  e.preventDefault();

  $('#filterplayers-modal').modal('hide');

  // get data from the filter players form
  var gender = $('.filter-gender').val();
  var ntrp = []; 
  $("input:checkbox[name='ntrp[]']:checked").each(function(){
    ntrp.push($(this).val());  
  });
  //console.log(ntrp);
  var location = $('.filter-location').val();
  // and form an object 
  var filterrules = {
    gender: gender,
    ntrp: ntrp,
    location: location
  }
  // console.log(filterrules);
  // send to server
  $.post('/filterplayers', filterrules, function(dataFromServer){
    console.log(dataFromServer);
    console.log(dataFromServer.players);
    for (var i=0; i<dataFromServer.players.length; i++) {
      console.log(dataFromServer.players[i]);
    };

    // remove the current players
    $('.players').remove();
    // parse data and display on the screen
    
    var players = "<div class='players'>";
    for (var i=0; i<dataFromServer.players.length; i++) {
      players = players + 
        "<div class='player' data-playerid='" +  dataFromServer.players[i]._id + "'>" +
        "<strong>" + 
        dataFromServer.players[i].username + " | " + 
        dataFromServer.players[i].name + " " + 
        "<a class='viewplayer' href='#'>View</a> - " +
        "<a class='compilemsg' href='#'>Send</a>" + 
        "</div>";
    }
    players = players + "</div>"

    $('.playersection').append(players);

  });
}

var showCompiledMessageModal = function() {
  var playerId = getPlayerId($(this));

  $('.msg-beinvitedid').val(playerId);
  $("#compilemsg-modal").modal('show');
}

var sendMessage = function(e) {
  e.preventDefault();

  $("#compilemsg-modal").modal('hide');
  
  //var invite = $('.msg-inviteid').val();
  var beInvited = $('.msg-beinvitedid').val();
  var courtName = $('.msg-courtname').val();
  var courtAddress = $('.msg-courtaddress').val();
  var playDateTime = $('.msg-playdatetime').val();
  var todayDate = new Date();
  var todaydate = todayDate.toDateString(); 
  var content = $('.msg-content').val();
  console.log(todaydate);
  
  var messageData = {
    playerid: beInvited,
    courtname: courtName,
    courtaddress: courtAddress,
    playdatetime: playDateTime,
    todaydate: todaydate,
    content: content
  };

  $.post('/msg', messageData, function(dataFromServer){
    console.log("success");
  });
}


$(document).on('ready', function(){
  // open view a player modal
  $(document).on('click', '.viewplayer', viewPlayer);

  // open filter players modal
  $('.filterplayers').on('click', showFilterPlayersModal);

  $('.runfilterplayers').on('click', filterPlayers);

  $('.compilemsg').on('click', showCompiledMessageModal);

  $('.sendmsg').on('click', sendMessage);

});