/**
 * Created by jonrasmussen on 5/4/17.
 */
$(document).ready(function () {
    let pixelTeam = {
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
    };

    game.setRoster(pixelTeam);

    /** Load Current Roster **/
    game.displayRoster();

    $('.add-player').click(function () {
        let group = $(this).attr('data-group');
        $('#' + group + '-players').append(game.addPlayer());
    });

    $('#clear-all').click(game.clearPlayers);

    $('#start-game').click(function () {
        let players = {
            male: [],
            female: []
        };

        $('#male-players .player-name').each(function () {
            let name = $(this).val();
            if (name !== '') {
                players.male.push(name);
            }
        });

        $('#female-players .player-name').each(function () {
            let name = $(this).val();
            if (name !== '') {
                players.female.push(name);
            }
        });

        game.start();
    });

    $('#next').click(function () {
        game.nextAtBat()
    });

    $('#edit').click(function () {
        // $('#player-entry').show();
        // $('#game-on').hide();
        game.prevAtBat();
    });

    $('#restart-game').click(function () {
        $(this).hide();
        game.restart();
    });
});

let game = {
    started: false,
    roster: {
        male: [],
        female: []
    },
    atBat: "male",
    male: 0,
    female: 0,

    start: function () {
        $('#player-entry').hide();
        $('#game-on').show();

        if (!game.started) {
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

    addPlayer: function (name) {
        let input = $('<input>')
            .addClass('player-name')
            .attr({
                type: 'text',
                placeholder: 'Name'
            });

        if (name) {
            $(input).val(name);
        }

        let item = $('<li>').append(input);

        let del = $('<button>')
            .addClass('btn btn-danger btn-xs delete')
            .text('Delete')
            .click(function () {
                $(item).remove();
                game.updateRoster();
            });

        $(item).append(del);

        return item;
    },

    clearPlayers: function () {
        $('#male-players, #female-players').html('');
    },

    nextAtBat: function () {
        let playerName = game.roster[game.atBat][game[game.atBat]];
        $('#at-bat').text(playerName);
        $('.at-bat').removeClass('at-bat');
        let playerId = playerName.toLowerCase().replace(/[\s.]/g, '')
        $('#player-name-' + playerId).addClass('at-bat');
        if (game[game.atBat] >= game.roster[game.atBat].length - 1) {
            game[game.atBat] = 0;
        } else {
            game[game.atBat]++;
        }
        if (game.atBat === 'male') {
            game.atBat = 'female';
        } else {
            game.atBat = 'male';
        }
    },

    prevAtBat: function () {
        let gender = game.atBat;
        let index = game[gender]--;
        if (index < 0) {
            index = game.roster[gender].length - 1;
        }
        let playerName = game.roster[gender][index];
        $('#at-bat').text(playerName);
        $('.at-bat').removeClass('at-bat');
        let playerId = playerName.toLowerCase().replace(/[\s.]/g, '')
        $('#player-name-' + playerId).addClass('at-bat');
        if (gender === 'male') {
            game.atBat = 'female';
        } else {
            game.atBat = 'male';
        }
        // if (game[game.atBat] < 0) {
        //     game[game.atBat] = game[game.atBat].length - 1;
        // } else {
            game[game.atBat]--;
        // }

        console.log("male index: ", game.male);
        console.log("male index: ", game.male);
    },

    setRoster: function (roster) {
        this.roster = roster;
    },

    displayRoster: function () {
        this.roster.male.map(function (player) {
            $('#male-players').append(game.addPlayer(player));
        });
        this.roster.female.map(function (player) {
            $('#female-players').append(game.addPlayer(player));
        });
        $('#male-player-list').html(game.roster.male.map(function (x) {
            return '<span class="player-list-name" id="player-name-' + x.toLowerCase().replace(/[\s.]/g, '') + '">' + x + '</span>';
        }));
        $('#female-player-list').html(game.roster.female.map(function (x) {
            return '<span class="player-list-name" id="player-name-' + x.toLowerCase().replace(/[\s.]/g, '') + '">' + x + '</span>';
        }));
    },

    updateRoster: function () {
        let output = {
            male: [],
            female: []
        };
        $('#male-players .player-name').each(function () {
            let name = $(this).val();
            if ('' !== name) {
                output.male.push(name);

            }
        });
        $('#female-players .player-name').each(function () {
            let name = $(this).val();
            if ('' !== name) {
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