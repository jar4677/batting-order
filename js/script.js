/**
 * Created by jonrasmussen on 5/4/17.
 */
$(document).ready(function(){
    /** Load Current Roster **/
    game.roster.male.map(function(player){
        $('#male-players').append(addPlayer(player));
    });
    game.roster.female.map(function(player){
        $('#female-players').append(addPlayer(player));
    });

    $('.add-player').click(function(){
        var group = $(this).attr('data-group');
        $('#' + group + '-players').append(addPlayer());
    });

    $('#clear-all').click(clearPlayers);

    $('#start-game').click(function(){
        var players = {
            male: [],
            female: []
        };

        $('#male-players .player-name').each(function(){
            var name = $(this).val();
            if(name !== ''){
                players.male.push(name);
            }
        });

        $('#female-players .player-name').each(function(){
            var name = $(this).val();
            if(name !== ''){
                players.female.push(name);
            }
        });

        game.start();
    });

    $('#next').click(function(){
        game.nextAtBat()
    });

    $('#edit').click(function () {
        $('#player-entry').show();
        $('#game-on').hide();
    });

    $('#restart-game').click(function () {
        $(this).hide();
        game.restart();
    });
});

function addPlayer(name){
    var input = $('<input>')
        .addClass('player-name')
        .attr({
            type: 'text',
            placeholder: 'Name'
        });

    if(name){
        $(input).val(name);
    }

    var item = $('<li>').append(input);

    var del = $('<button>')
        .addClass('btn btn-danger btn-xs delete')
        .text('Delete')
        .click(function(){
            $(item).remove();
        });

    $(item).append(del);

    return item;
}

function clearPlayers(){
    $('#male-players, #female-players').html('');
}

var game = {
    started: false,
    roster: {
        male: [
            'Jon R.',
            'Ryan',
            'Dan',
            'John H.',
            'Jan',
            'Matt',
            'Chris'
        ],
        female: [
            'Monica',
            'Samantha',
            'Kahla',
            'Erin',
            'Tanya',
            'Audrey'
        ]
    },
    atBat: {},
    male: 0,
    female: 0,
    mTotal: 0,
    fTotal:0,

    start: function () {
        $('#player-entry').hide();
        $('#game-on').show();

        if(!game.started){
            $('#restart-game').show();
            game.started = true;
            game.male = 0;
            game.female = 0;
            game.atBat = 'male';
            game.nextAtBat();
        } else {
            game.updateRoster();
        }
    },

    nextAtBat: function(){
        var playerName = game.roster[game.atBat][game[game.atBat]];
        $('#at-bat').text(playerName);
        // console.log('player: '+ playerName);
        // console.log('gender: '+ game.atBat);
        // console.log('index: '+ game[game.atBat]);
        // console.log('total gender: '+ game.roster[game.atBat].length);
        if(game[game.atBat] >= game.roster[game.atBat].length - 1){
            game[game.atBat] = 0;
        } else {
            game[game.atBat]++;
        }
        if(game.atBat === 'male'){
            game.atBat = 'female';
        } else {
            game.atBat = 'male';
        }
    },

    updateRoster: function(){
        var output = {
            male: [],
            female: []
        };
        $('#male-players .player-name').each(function(){
            var name = $(this).val();
            if ('' !== name){
                output.male.push(name);
            }
        });
        $('#female-players .player-name').each(function(){
            var name = $(this).val();
            if ('' !== name){
                output.female.push(name);
            }
        });
        game.roster = output;
    },

    restart: function () {
        this.started = false;
        this.start();
    }
};

// function Team(players) {
//     this.roster = this.buildRoster(players);
// }
//
// Team.prototype.buildRoster = function (players) {
//     let roster = {
//         male: [],
//         female: []
//     };
//
//     players.map(function (player) {
//         roster[player.gender].push(player);
//     });
//
//     return roster;
// };
//
// Team.prototype.startGame = function () {
//
// };
//
// function Player(name, gender) {
//     this.name = name;
//     this.gender = gender;
//     this.order = 0;
// }
//
// Player.prototype.setOrder = function (order) {
//     this.order = order;
// };
//
// let players = [];
//
// players.push(new Player('Jon R.', 'male'));
// players.push(new Player('Monica', 'female'));
//
// let pixelHitters = new Team(players);