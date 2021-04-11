const Discord = require(`discord.js`);
require(`dotenv`).config()
const client = new Discord.Client();

client.once(`ready`, () => {
  console.log(`Ready!`) // Writes ready in the console when the bot has started
});

// Deck generation
function generateDeck(numberofdecks) {
  for (let num = 0; num < numberofdecks; num++) {
    for (let i = 0; i < 2; i++) {
      for (let c = 0; c < 5; c++) { // The loop that generates colors, will loop 5 times
        for (let n = 0; n < 13; n++) { // The loop that generates numbers, will loop 13 times
          if (n > 9) {
            switch (c) {
              case 0:
                if (n === 10) {
                  card = {
                    color: "red",
                    value: "reverse"
                  }
                  deck.push(card);
                } else if (n === 11) {
                  card = {
                    color: "red",
                    value: "skip"
                  }
                  deck.push(card);
                } else if (n === 12) {
                  card = {
                    color: "red",
                    value: "draw2"
                  }
                  deck.push(card);
                }
                break;
              case 1:
                if (n === 10) {
                  card = {
                    color: "green",
                    value: "reverse"
                  }
                  deck.push(card);
                } else if (n === 11) {
                  card = {
                    color: "green",
                    value: "skip"
                  }
                  deck.push(card);
                } else if (n === 12) {
                  card = {
                    color: "green",
                    value: "draw2"
                  }
                  deck.push(card);
                }
                break;
              case 2:
                if (n === 10) {
                  card = {
                    color: "blue",
                    value: "reverse"
                  }
                  deck.push(card);
                } else if (n === 11) {
                  card = {
                    color: "blue",
                    value: "skip"
                  }
                  deck.push(card);
                } else if (n === 12) {
                  card = {
                    color: "blue",
                    value: "draw2"
                  }
                  deck.push(card);
                }
                break;
              case 3:
                if (n === 10) {
                  card = {
                    color: "yellow",
                    value: "reverse"
                  }
                  deck.push(card);
                } else if (n === 11) {
                  card = {
                    color: "yellow",
                    value: "skip"
                  }
                  deck.push(card);
                } else if (n === 12) {
                  card = {
                    color: "yellow",
                    value: "draw2"
                  }
                  deck.push(card);
                }
                break;
              case 4:
                break;
              default:
                console.log(`Something went wrong in the card generation, color was ${c} and number was ${n}`)
            }
          } else if (n > 0) {
            if (c === 0) {
              card = {
                color: "red",
                value: n
              }
              deck.push(card);
            } else if (c === 1) {
              card = {
                color: "green",
                value: n
              }
              deck.push(card);
            } else if (c === 2) {
              card = {
                color: "blue",
                value: n
              }
              deck.push(card);
            } else if (c === 3) {
              card = {
                color: "yellow",
                value: n
              }
              deck.push(card);
            } else {
              for (var wildcardgen = 0; wildcardgen < 2; wildcardgen++) {
                if (n === 1) {
                  card = {
                    color: "wild",
                    value: "draw4"
                  }
                  deck.push(card);
                }
                if (n === 2) {
                  card = {
                    color: "wild",
                    value: "changecolor"
                  }
                  deck.push(card);
                }
              }
            }
          }
        }
      }
    }
    for (var c2 = 0; c2 < 5; c2++) {
      if (c2 === 0) {
        card = {
          color: "red",
          value: 0
        }
        deck.push(card);
      } else if (c2 === 1) {
        card = {
          color: "green",
          value: 0
        }
        deck.push(card);
      } else if (c2 === 2) {
        card = {
          color: "blue",
          value: 0
        }
        deck.push(card);
      } else if (c2 === 3) {
        card = {
          color: "yellow",
          value: 0
        }
        deck.push(card);
      }
    }
  }
}

function shufflenewdeck(){
  generateDeck(1)
  console.log("shuffled deck (sort of)")
}



client.login(process.env.TOKEN); //Logs into Discord and lets users interact with the bot

client.on(`message`, async message => { //When a user sends a message
  // Variables, arrays and objects
  const prefix = "1";
  var numberofdecks = 1; // The array we will be using to randomize cards
  var card;
  var today = new Date();
  var games = {}; //The object that stores every game
  let guildid;
  let deck = [];
  let currentcard = [];
  let playedcards = [];
  let gamestarted = false;
  let positionofcard = 0;
  let turn = 0;
  let currentplayerid;
  let stopplay;
  let nextplayerid;

  if (message.author.bot) return; // Stops if the message is from a bot
  if (!message.content.startsWith(prefix)) return; // Stops if the message does not start with the set prefix

  const args = message.content.slice(prefix.length).trim().split(/ +/g); // Splits the message up into args to handle commands easier
  const cmd = args.shift().toLowerCase(); // Shifts all the args to lowercase to make taking input easier

  if(cmd === "help"){
    let helpembed = new Discord.MessageEmbed()
        .setColor(`#ec1c25`)
        .setTitle(`Help about commands`)
        .setAuthor(`Made by Bruckis`, `https://images-ext-1.discordapp.net/external/xXLSVJM6_HvBZ9xla6EIPLdosfanGudNLPw10p4BAUk/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/391929236950351884/9be94849d0be47fe83e50c33c370dd7c.png`, `https://github.com/Bruckis`, )
        .setDescription(`Here are all the commands the bot has and how to use them`)
        .addFields(
            {name: "Info", value: "This command provides some rules for the bot as well as basic information about the bot and it's creator, Bruckis"},
            {name: "Startgame {decks} {startings cards}", value: "The main command of the bot. Is used to start the game. {decks} defines the number of decks you want to use (usually you just need 1 because there is a deck reshuffler), but if you want chaos and the possibility of having 25 wildcards in your hand, you can make it so. {starting cards} refers to the number of cards each players starts with. Keep in mind that too many cards will make the bot load slower, so please let it run for a few seconds after someone joins to start the game."},
            {name: "Play {color} {value} {chosencolor}", value: "How you play cards. {color} is the color of the card you wants to play, and {value} is the number or figure of the card. {chosencolor} is only used with wildcards, and is the color you decide the next player will have to play."},
            {name: "Draw", value: "Pretty simple. If you are unable to play a card, or you just don't want to, you use this command to draw a card."},
            {name: "Endgame", value:"ONLY FOR ADMINISTRATORS!\n if a game is bugged or you want to stop a game for whatever reason, you can do so with this command. You need administrator permissions to do this."}

        )
        .setTimestamp()
        .setFooter("Thanks for reading and I hope you enjoy your games :)")
        message.channel.send(helpembed);
  }

  if (cmd === "info") {
    infoembed = new Discord.MessageEmbed()
        .setColor(`#ec1c25`)
        .setTitle(`Information`)
        .setAuthor(`Made by Bruckis`, `https://images-ext-1.discordapp.net/external/xXLSVJM6_HvBZ9xla6EIPLdosfanGudNLPw10p4BAUk/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/391929236950351884/9be94849d0be47fe83e50c33c370dd7c.png`, `https://github.com/Bruckis`, )
        .setThumbnail(`https://cdn.discordapp.com/attachments/632895798559899663/809737369783238707/proxy-image.png`)
        .addField("This is a bot where you and up to 9 other friends can compete in a game of UNO", `Just start me up using startgame and I will do the rest!`)
        .addField("Rules:", "1. No stacking of draw cards\n2. You draw one card if you are unable to play\n3. You do not have to say uno when you have one card left(because I was too lazy to add it)\n4. You can win on any card(also because I was too lazy to add a filter for that)")
        .setFooter(`This is actually sort of finished. Executed by ${message.member.user.tag} at ${today.getHours()}:${today.getMinutes()}`)
    return message.channel.send(infoembed);
  }

  // DONE
  if (cmd === "startgame") {
    if (Number.isFinite(args[0])) numberofdecks = 1;
    else numberofdecks = args[0];
    if (Number.isFinite(args[1])) startingcards = 7;
    else startingcards = args[1];
    let member = message.author;
    let playersingame = 1;


    guildid = message.guild.id;
    isstopped = false;
    if (games[message.guild.id] !== undefined) { // Checks if the server's ID is included in the array. Only runs if it is not
      message.channel.send("There is already a game in this server. Please end it before starting a new one.")
      return;
    } else {
      games[message.guild.id] = {
        name: message.guild.name,
        isreversed: false
      }; // Adds server id to the games array to stop more than one game running at a time
      games[message.guild.id].players = {};
      let startgameembed = new Discord.MessageEmbed() // Makes a new embed with the following items
          .setColor(`#ec1c25`)
          .setTitle(`New game of UNO was started! React with <:UNOREACT:825375265546960966> on this message to join! You have 5 minutes, or you can start the game by reacting with ✅`)
          .setAuthor(`Game started by ${message.member.user.username}`)
          .setDescription(`There are currently ${Object.keys(games[message.guild.id]["players"]).length} players in the game`)
          .setTimestamp()


      let msg = await message.channel.send(startgameembed);

      msg.react('825375265546960966');
      msg.react('✅');

      const filter = (reaction, user) => !user.bot;
      const collector = msg.createReactionCollector(filter, {
        time: 300000,
        max: 10
      });


      collector.on('collect', (reaction, user) => {


        switch (reaction.emoji.name) {
          case 'UNOREACT':
            console.log(games[message.guild.id].players[user.id])
            if (isstopped === false && games[message.guild.id].players[user.id] == undefined) {
              games[message.guild.id].players[user.id] = []
              userinfo = {
                id: user.id,
                name: client.users.cache.get(user.id).username,
                joinposition: playersingame - 1
              }
              playersingame++;
              games[message.guild.id].players[user.id].push(userinfo);

              startgameembed = new Discord.MessageEmbed() // Makes a new embed with the following items
                  .setColor(`#ec1c25`)
                  .setTitle(`New game of UNO was started! React with <:UNOREACT:825375265546960966> on this message to join! You have 5 minutes, or you can start the game by reacting with ✅`)
                  .setAuthor(`Game started by ${message.member.user.username}`)
                  .setDescription(`There are currently ${Object.keys(games[message.guild.id]["players"]).length} player(s) in the game`)
                  .setTimestamp()
              msg.edit({
                embed: startgameembed
              })
              message.channel.send(`<@${user.id}> joined the game! That makes ${Object.keys(games[message.guild.id]["players"]).length} out of 10!`)
            }
            else{
              if(games[message.guild.id].players[user.id] != undefined){
                let channel = client.users.cache.get(games[message.guild.id].players[user.id][0].id);
                console.log("player reacted when they should not")
                console.log(games[message.guild.id].players[user.id][0].id)
                channel.send("You have already joined a game in this server. Please stop spamming the reaction")
              }
            }
            break;
          case '✅':
            if(Object.keys(games[message.guild.id].players).length >= 3){
              if (member.id === user.id && gamestarted != true) {
                gamestarted = true;
                generateDeck(numberofdecks);
                for (let foreachplayer in games[guildid].players) {
                  for (let givecards = 0; givecards < startingcards; givecards++) {
                    let randint = Math.floor(Math.random() * deck.length + 1)
                    games[guildid].players[foreachplayer].push(deck[randint])
                    deck.splice(randint, 1);
                  }
                }
                for (let foreachplayer in games[guildid].players) {
                  let channel = client.users.cache.get(games[guildid].players[foreachplayer][0].id);
                  let cards = []
                  for (let foreachcard in games[guildid].players[foreachplayer]) {
                    if (Object.keys(games[guildid].players[foreachplayer][foreachcard]).includes('color')) {
                      cards.push(`${games[guildid].players[foreachplayer][foreachcard].color} ${games[guildid].players[foreachplayer][foreachcard].value}`)
                    }
                  }
                  let hand = new Discord.MessageEmbed()
                      .setColor(`#ec1c25`)
                      .setTitle(`Game started in ${message.guild.name}!`)
                      .addFields(
                          {name: "This is your hand:", value: cards.join("\n ")}
                      )
                      .setTimestamp()
                  channel.send(hand);
                }
                var notwildcard = false
                let randint
                wildcardloop:
                    while (notwildcard == false) {
                      randint = Math.floor(Math.random() * deck.length + 1)
                      if (Number.isFinite(deck[randint].value)) {
                        notwildcard = true;
                        break wildcardloop;

                      }
                    }
                currentcard.push(deck[randint]);
                deck.splice(randint, 1);

                let game = new Discord.MessageEmbed() // Makes a new embed with the following items
                    .setColor(`#ec1c25`)
                    .setAuthor(`Game started by ${message.member.user.username}`)
                    .setTimestamp()
                    .setDescription(`The game has begun! The current card is a ${currentcard[0].color} ${currentcard[0].value} and it is <@${Object.keys(games[guildid].players)[turn]}>'s turn`)
                message.channel.send(game);
                isstopped = true;
              }

            }
            else{
              message.channel.send(`${Object.keys(games[message.guild.id].players).length} players is not enough to start a game. You need at least 3 players.`)
            }

            break;



        }


      });
      collector.on('end', collected => {
        if (isstopped == false && Object.keys(games[message.guild.id].players).length >= 3) {
          generateDeck(numberofdecks);
          for (let foreachplayer in games[guildid].players) {
            for (let givecards = 0; givecards < startingcards; givecards++) {
              let randint = Math.floor(Math.random() * deck.length + 1)
              games[guildid].players[foreachplayer].push(deck[randint])
              deck.splice(randint, 1);
            }
          }
          for (let foreachplayer in games[guildid].players) {
            let channel = client.users.cache.get(games[guildid].players[foreachplayer][0].id);
            let cards = []
            for (let foreachcard in games[guildid].players[foreachplayer]) {
              if (Object.keys(games[guildid].players[foreachplayer][foreachcard]).includes('color')) {
                cards.push(`${games[guildid].players[foreachplayer][foreachcard].color} ${games[guildid].players[foreachplayer][foreachcard].value}`)
              }
            }
            let hand = new Discord.MessageEmbed()
                .setColor(`#ec1c25`)
                .setTitle(`Game started in ${message.guild.name}!`)
                .addFields(
                    {name: "This is your hand:", value: cards.join("\n ")}
                )
                .setTimestamp()
            channel.send(hand);
          }
          var notwildcard = false
          let randint
          wildcardloop:
              while (notwildcard == false) {
                randint = Math.floor(Math.random() * deck.length + 1)
                if (Number.isFinite(deck[randint].value)) {
                  notwildcard = true;
                  break wildcardloop;

                }
              }
          currentcard.push(deck[randint]);
          deck.splice(randint, 1);

          let game = new Discord.MessageEmbed() // Makes a new embed with the following items
              .setColor(`#ec1c25`)
              .setAuthor(`Game started by ${message.member.user.username}`)
              .setTimestamp()
              .setDescription(`The game has begun! The current card is a ${currentcard[0].color} ${currentcard[0].value} and it is <@${Object.keys(games[guildid].players)[turn]}>'s turn`)
          message.channel.send(game);
        }
        else{
          let notenoughplayers = new Discord.MessageEmbed() // Makes a new embed with the following items
              .setColor(`#ec1c25`)
              .setAuthor(`There are not enough players to start the game`)
              .setTimestamp()
              .setDescription(`${Object.keys(games[message.guild.id].players).length} is not enough players to start the game. You need to be at least 3 players.`)
          message.channel.send(notenoughplayers);
          delete games[message.guild.id];
          currentcard.splice(0, 1)
          message.channel.send(`Game ended!`)
        }
        gamestarted = true;
        isstopped = true;
      });
    }

  }

  if (cmd === "play") {
    if (!games[message.guild.id] || gamestarted == false) {
      message.channel.send("There is currently no game currently playing in this server! You can start one by using startgame");
    }
    else {
      // Turn checker
      for(let findcurrentplayer in games[message.guild.id].players){
        for(let keys in games[message.guild.id].players[findcurrentplayer]){
          if(games[message.guild.id].players[findcurrentplayer][keys].joinposition === turn){
            currentplayerid = games[message.guild.id].players[findcurrentplayer][keys].id;
          }
        }
      }
      for (let keys2 in games[message.guild.id].players[message.member.id]){
        if(games[message.guild.id].players[message.member.id][keys2].id != undefined){
        }
        if(games[message.guild.id].players[message.member.id][keys2].id !== currentplayerid && games[message.guild.id].players[message.member.id][keys2].id !== undefined){
          await message.channel.send(`It's not your turn! It is <@${currentplayerid}>'s turn.`)
          return;
        }
      }
        // Check if the chosen color is valid
        let playedcolor;
          switch (args[0]) {
          case "red":
            playedcolor = "red";
            break;
          case "green":
            playedcolor = "green";
            break;
          case "blue":
            playedcolor = "blue";
            break;
          case "yellow":
            playedcolor = "yellow";
            break;
          case "wildcard":
            playedcolor = "wild";
            break;
          case "black":
            playedcolor = "wild";
            break;
          case "wild":
            playedcolor = "wild";
            break;
          default:
            message.channel.send(`<@${message.member.id}> You need to pick a valid color for the card you're playing! Please try again with a color chosen.`)
            return;

            break;

        }

        // Check if the chosen value is valid
        if(parseInt(args[1]) < 0 || parseInt(args[1]) > 9){
          await message.channel.send(`<@${message.member.id}> You need to pick a valid value for the card you're playing! Please try again with a number chosen.`);
          return;
        }
        let playedvalue = parseInt(args[1]);
        if(isNaN(playedvalue)){
          switch (args[1]){
            case "reverse":
              playedvalue = "reverse";
              break;
            case "skip":
              playedvalue = "skip";
              break;
            case "draw2":
              playedvalue = "draw2";
              break;
            case "draw4":
              playedvalue = "draw4";
              break;
            case "changecolor":
              playedvalue = "changecolor";
              break;
            default:
              await message.channel.send(`<@${message.member.id}> You need to pick a valid value for the card you're playing! Please try again with a number chosen.`);
              return;
              break;


          }
        }

        // Check if the potential chosen color is valid
        let chosencolor;
        if(playedcolor === "wild"){
          switch (args[2]) {
            case "red":
              chosencolor = "red";
              break;
            case "green":
              chosencolor = "green";
              break;
            case "blue":
              chosencolor = "blue";
              break;
            case "yellow":
              chosencolor = "yellow";
              break;
            default:
              message.channel.send(`<@${message.member.id}> You need to pick a valid color if you're going to play a wildcard! Please try again with a valid color.`)
              return;
              break;

          }
        }

        if(currentcard[0].color == playedcolor || currentcard[0].value == playedvalue || playedcolor == "wild"){

          let hascardinhand = false
          for(let foreachcard in games[message.guild.id].players[message.member.id]){
            if(games[message.guild.id].players[message.member.id][foreachcard].color == playedcolor && games[message.guild.id].players[message.member.id][foreachcard].value == playedvalue){
              hascardinhand = true;
              positionofcard = foreachcard;
            }
          }

          if(hascardinhand == true){
            await currentcard.splice(0, 1)
            await currentcard.push(games[message.guild.id].players[message.member.id][positionofcard]);
            await games[message.guild.id].players[message.member.id].splice(positionofcard, 1);
            console.log(currentcard);
            if(Object.keys(games[message.guild.id].players[message.member.id]).length - 1 == 0){
              console.log("WINNER!")
              let winembed = new Discord.MessageEmbed()
                  .setColor(`#ec1c25`)
                  .setTitle(`We have a winner!`)
                  .setDescription(`<@${message.member.id}> played all their cards and won! Here, have a trophy!`)
                  .setImage('http://pngimg.com/uploads/golden_cup/golden_cup_PNG94601.png')
              await message.channel.send(winembed)
              await delete games[message.guild.id];
              await currentcard.splice(0, 1)
              return;
            }
            else{
              let channel = client.users.cache.get(games[message.guild.id].players[message.member.id][0].id);
              let cards = []
              for (let foreachcard in games[message.guild.id].players[message.member.id]) {
                if (Object.keys(games[message.guild.id].players[message.member.id][foreachcard]).includes('color')) {
                  cards.push(`${games[message.guild.id].players[message.member.id][foreachcard].color} ${games[message.guild.id].players[message.member.id][foreachcard].value}`)
                }
              }
              let hand = new Discord.MessageEmbed()
                  .setColor(`#ec1c25`)
                  .setTitle(`You played a card in ${message.guild.name}!`)
                  .addFields({name: "This is your hand:", value: cards.join("\n ")})
                  .setTimestamp()
              await channel.send(hand);
            }
            if(playedvalue === "changecolor"){
              if(games[message.guild.id].isreversed == false){
              if(turn == Object.keys(games[message.guild.id].players).length - 1) turn = 0;
              else turn++;
            }
            else if(games[message.guild.id].isreversed == true){
              if(turn == 0) turn = Object.keys(games[message.guild.id].players).length - 1;
              else turn--;
            }
              currentcard[0].color = chosencolor;
              game = new Discord.MessageEmbed() // Makes a new embed with the following items
                  .setColor(`#ec1c25`)
                  .setTimestamp()
                  .setTitle(`A wildcard has been played!`)
                  .setDescription(`<@${currentplayerid}> changed the color to ${chosencolor}! \nThe current card is a ${currentcard[0].color} ${currentcard[0].value} and it is <@${Object.keys(games[message.guild.id].players)[turn]}>'s turn`)
                  .setTimestamp()
                  .setFooter(`${message.member.user.username} now has ${Object.keys(games[message.guild.id].players[message.member.id]).length - 1} card(s) in their hand`)
              await message.channel.send(game);
            }
            else if(playedvalue === "draw4"){
              if(games[message.guild.id].isreversed == false){
                for(let findnextplayer in games[message.guild.id].players){
                  for(let keys in games[message.guild.id].players[findnextplayer]){
                    if(turn == Object.keys(games[message.guild.id].players).length - 1){
                      if(games[message.guild.id].players[findnextplayer][keys].joinposition == 0){
                        nextplayerid = games[message.guild.id].players[findnextplayer][keys].id;
                      }
                    }
                    else if(games[message.guild.id].players[findnextplayer][keys].joinposition === turn + 1){
                      nextplayerid = games[message.guild.id].players[findnextplayer][keys].id;
                    }
                  }
                }
                if(turn == Object.keys(games[message.guild.id].players).length - 1) turn = 1;
                else if(turn == Object.keys(games[message.guild.id].players).length - 2) turn = 0;
                else turn = turn + 2;
                for(let i = 0; i < 4; i++){
                  randint = Math.floor(Math.random() * deck.length + 1)
                  games[message.guild.id].players[nextplayerid].push(deck[randint])
                }

              }
              else if(games[message.guild.id].isreversed == true){
                for(let findnextplayer in games[message.guild.id].players){
                  for(let keys in games[message.guild.id].players[findnextplayer]){
                    if(turn == 0){
                      if(games[message.guild.id].players[findnextplayer][keys].joinposition == Object.keys(games[message.guild.id].players).length - 1){
                        nextplayerid = games[message.guild.id].players[findnextplayer][keys].id;
                      }
                    }
                    else if(games[message.guild.id].players[findnextplayer][keys].joinposition === turn - 1){
                      nextplayerid = games[message.guild.id].players[findnextplayer][keys].id;
                    }
                  }
                }
                if(turn == 1) turn = Object.keys(games[message.guild.id].players).length - 1;
                else if(turn == 0) turn = Object.keys(games[message.guild.id].players).length - 2;
                else turn = turn - 2;
                for(let i = 0; i < 4; i++){
                  randint = Math.floor(Math.random() * deck.length + 1)
                  games[message.guild.id].players[nextplayerid].push(deck[randint])
                }
              }
              currentcard[0].color = chosencolor;
              game = new Discord.MessageEmbed() // Makes a new embed with the following items
                  .setColor(`#ec1c25`)
                  .setTimestamp()
                  .setTitle(`A wildcard has been played!`)
                  .setDescription(`<@${currentplayerid}> made <@${nextplayerid}> draw 4 cards and changed the color to ${chosencolor}! \nThe current card is a ${currentcard[0].color} ${currentcard[0].value} and it is <@${Object.keys(games[message.guild.id].players)[turn]}>'s turn`)
                  .setTimestamp()
                  .setFooter(`${message.member.user.username} now has ${Object.keys(games[message.guild.id].players[message.member.id]).length - 1} card(s) in their hand`)
              await message.channel.send(game);
            }
            else if(playedvalue === "reverse"){
              if(games[message.guild.id].isreversed == false) games[message.guild.id].isreversed = true;
              else if((games[message.guild.id].isreversed == true)) games[message.guild.id].isreversed = false
              if(games[message.guild.id].isreversed == false) {
                if (turn == Object.keys(games[message.guild.id].players).length - 1) turn = 0;
                else turn++
              }
              else if(games[message.guild.id].isreversed == true){
                if(turn == 0) turn = Object.keys(games[message.guild.id].players).length - 1;
                else turn--
              }
                game = new Discord.MessageEmbed() // Makes a new embed with the following items
                    .setColor(`#ec1c25`)
                    .setTimestamp()
                    .setTitle(`A reverse card has been played!`)
                    .setDescription(`The play order has been reversed! The current card is a ${currentcard[0].color} ${currentcard[0].value} and it is <@${Object.keys(games[message.guild.id].players)[turn]}>'s turn`)
                    .setTimestamp()
                    .setFooter(`${message.member.user.username} now has ${Object.keys(games[message.guild.id].players[message.member.id]).length - 1} card(s) in their hand`)
                await message.channel.send(game);
            } // DONE
            else if(playedvalue === "draw2"){
              if(games[message.guild.id].isreversed == false){
                for(let findnextplayer in games[message.guild.id].players){
                  for(let keys in games[message.guild.id].players[findnextplayer]){
                    if(turn == Object.keys(games[message.guild.id].players).length - 1){
                      if(games[message.guild.id].players[findnextplayer][keys].joinposition == 0){
                        nextplayerid = games[message.guild.id].players[findnextplayer][keys].id;
                      }
                    }
                    else if(games[message.guild.id].players[findnextplayer][keys].joinposition === turn + 1){
                        nextplayerid = games[message.guild.id].players[findnextplayer][keys].id;
                    }
                  }
                }
                if(turn == Object.keys(games[message.guild.id].players).length - 1) turn = 1;
                else if(turn == Object.keys(games[message.guild.id].players).length - 2) turn = 0;
                else turn = turn + 2;
                for(let i = 0; i < 2; i++){
                  randint = Math.floor(Math.random() * deck.length + 1)
                  games[message.guild.id].players[nextplayerid].push(deck[randint])
                }

              }
              else if(games[message.guild.id].isreversed == true){
                for(let findnextplayer in games[message.guild.id].players){
                  for(let keys in games[message.guild.id].players[findnextplayer]){
                    if(turn == 0){
                      if(games[message.guild.id].players[findnextplayer][keys].joinposition == Object.keys(games[message.guild.id].players).length - 1){
                        nextplayerid = games[message.guild.id].players[findnextplayer][keys].id;
                      }
                    }
                    else if(games[message.guild.id].players[findnextplayer][keys].joinposition === turn - 1){
                      nextplayerid = games[message.guild.id].players[findnextplayer][keys].id;
                    }
                  }
                }
                if(turn == 1) turn = Object.keys(games[message.guild.id].players).length - 1;
                else if(turn == 0) turn = Object.keys(games[message.guild.id].players).length - 2;
                else turn = turn - 2;
                for(let i = 0; i < 2; i++){
                  randint = Math.floor(Math.random() * deck.length + 1)
                  games[message.guild.id].players[nextplayerid].push(deck[randint])
                }
              }
              game = new Discord.MessageEmbed() // Makes a new embed with the following items
                  .setColor(`#ec1c25`)
                  .setTimestamp()
                  .setTitle(`A draw 2 card has been played!`)
                  .setDescription(`<@${currentplayerid}> made <@${nextplayerid}> draw 2 cards! \nThe current card is a ${currentcard[0].color} ${currentcard[0].value} and it is <@${Object.keys(games[message.guild.id].players)[turn]}>'s turn`)
                  .setTimestamp()
                  .setFooter(`${message.member.user.username} now has ${Object.keys(games[message.guild.id].players[message.member.id]).length - 1} card(s) in their hand`)
              await message.channel.send(game);
            } // DONE
            else if(playedvalue === "skip"){
              if(games[message.guild.id].isreversed == false){
                for(let findnextplayer in games[message.guild.id].players){
                  for(let keys in games[message.guild.id].players[findnextplayer]){
                    if(turn == Object.keys(games[message.guild.id].players).length - 1){
                      if(games[message.guild.id].players[findnextplayer][keys].joinposition == 0){
                        nextplayerid = games[message.guild.id].players[findnextplayer][keys].id;
                      }
                    }
                    else if(games[message.guild.id].players[findnextplayer][keys].joinposition === turn + 1){
                      nextplayerid = games[message.guild.id].players[findnextplayer][keys].id;
                    }
                  }
                }
                if(turn == Object.keys(games[message.guild.id].players).length - 1) turn = 1;
                else if(turn == Object.keys(games[message.guild.id].players).length - 2) turn = 0;
                else turn = turn + 2;
              }
              else if(games[message.guild.id].isreversed == true){
                for(let findnextplayer in games[message.guild.id].players){
                  for(let keys in games[message.guild.id].players[findnextplayer]){
                    if(turn == 0){
                      if(games[message.guild.id].players[findnextplayer][keys].joinposition == Object.keys(games[message.guild.id].players).length - 1){
                        nextplayerid = games[message.guild.id].players[findnextplayer][keys].id;
                      }
                    }
                    else if(games[message.guild.id].players[findnextplayer][keys].joinposition === turn - 1){
                      nextplayerid = games[message.guild.id].players[findnextplayer][keys].id;
                    }
                  }
                }
                if(turn == 1) turn = Object.keys(games[message.guild.id].players).length - 1;
                else if(turn == 0) turn = Object.keys(games[message.guild.id].players).length - 2;
                else turn = turn - 2;
              }
              game = new Discord.MessageEmbed() // Makes a new embed with the following items
                  .setColor(`#ec1c25`)
                  .setTimestamp()
                  .setTitle(`A skip card has been played!`)
                  .setDescription(`<@${currentplayerid}> skipped <@${nextplayerid}>!\nThe current card is a ${currentcard[0].color} ${currentcard[0].value} and it is <@${Object.keys(games[message.guild.id].players)[turn]}>'s turn`)
                  .setTimestamp()
                  .setFooter(`${message.member.user.username} now has ${Object.keys(games[message.guild.id].players[message.member.id]).length - 1} card(s) in their hand`)
              await message.channel.send(game);
            } // DONE
            else{ // if a normal card is played
              if(games[message.guild.id].isreversed == false){
                console.log(Object.keys(games[message.guild.id].players).length)
                if(turn == Object.keys(games[message.guild.id].players).length - 1) turn = 0;
                else turn++;
              }
              else if(games[message.guild.id].isreversed == true){
                if(turn == 0) turn = Object.keys(games[message.guild.id].players).length - 1;
                else turn--
              }
              game = new Discord.MessageEmbed() // Makes a new embed with the following items
                  .setColor(`#ec1c25`)
                  .setTimestamp()
                  .setTitle(`A normal card has been played!`)
                  .setDescription(`The current card is a ${currentcard[0].color} ${currentcard[0].value} and it is <@${Object.keys(games[message.guild.id].players)[turn]}>'s turn`)

                  .setTimestamp()
                  .setFooter(`${message.member.user.username} now has ${Object.keys(games[message.guild.id].players[message.member.id]).length - 1} card(s) in their hand`)
              await message.channel.send(game);
            }

          }

          if(deck.length < 5){
            shufflenewdeck();
          }

          else{
            message.channel.send(`<@${message.member.id}> You do not have that card in your hand. Please play a card you do have in your hand.`)
            return;
          }

        }
        else{
          if(currentcard[0].color !== playedcolor){
            message.channel.send(`You can't play that card because the colors does not match. Please play a ${currentcard[0].color} card.`)
            return;
          }
        }
    }
  }

  if (cmd === "draw"){
    if (!games[message.guild.id] || gamestarted == false) {
      message.channel.send("There is currently no game currently playing in this server! You can start one by using startgame");
    }
    else{
      // Turn checker
      for(let findcurrentplayer in games[message.guild.id].players){
        for(let keys in games[message.guild.id].players[findcurrentplayer]){
          if(games[message.guild.id].players[findcurrentplayer][keys].joinposition === turn){
            currentplayerid = games[message.guild.id].players[findcurrentplayer][keys].id;
          }
        }
      }
      for (let keys2 in games[message.guild.id].players[message.member.id]){
        if(games[message.guild.id].players[message.member.id][keys2].id != undefined){
        }
        if(games[message.guild.id].players[message.member.id][keys2].id !== currentplayerid && games[message.guild.id].players[message.member.id][keys2].id !== undefined){
          await message.channel.send(`It's not your turn! It is <@${currentplayerid}>'s turn.`)
          return;
        }
      }
      // Draw a card and send hand to user
      randint = Math.floor(Math.random() * deck.length + 1)
      games[message.guild.id].players[message.member.id].push(deck[randint])
      let channel = client.users.cache.get(games[message.guild.id].players[message.member.id][0].id);
      let cards = []
      for (let foreachcard in games[message.guild.id].players[message.member.id]) {
        if (Object.keys(games[message.guild.id].players[message.member.id][foreachcard]).includes('color')) {
          cards.push(`${games[message.guild.id].players[message.member.id][foreachcard].color} ${games[message.guild.id].players[message.member.id][foreachcard].value}`)
        }
      }
      let hand = new Discord.MessageEmbed()
          .setColor(`#ec1c25`)
          .setTitle(`You drew a card in ${message.guild.name}!`)
          .setDescription(`The card you drew is a ${deck[randint].color} ${deck[randint].value}`)
          .addFields(
              {name: "This is your hand:", value: cards.join("\n ")}
          )
          .setTimestamp()
      channel.send(hand);
      deck.splice(randint, 1);


      if(games[message.guild.id].isreversed == false){
        if(turn == Object.keys(games[message.guild.id].players).length - 1) turn = 0;
        else turn++
        game = new Discord.MessageEmbed() // Makes a new embed with the following items
            .setColor(`#ec1c25`)
            .setTimestamp()
            .setTitle(`${message.member.user.username} drew a card!`)
            .setDescription(`The current card is a ${currentcard[0].color} ${currentcard[0].value} and it is <@${Object.keys(games[message.guild.id].players)[turn]}>'s turn`)
            .setFooter(`${message.member.user.username} now has ${Object.keys(games[message.guild.id].players[message.member.id]).length - 1} card(s) in their hand`)
        await message.channel.send(game);

      }
      else if(games[message.guild.id].isreversed == true){
        if(turn == 0) turn = Object.keys(games[message.guild.id].players).length - 1;
        else turn--
        game = new Discord.MessageEmbed() // Makes a new embed with the following items
            .setColor(`#ec1c25`)
            .setTimestamp()
            .setTitle(`${message.member.user.username} drew a card!`)
            .setDescription(`The current card is a ${currentcard[0].color} ${currentcard[0].value} and it is <@${Object.keys(games[message.guild.id].players)[turn]}>'s turn`)
            .setFooter(`${message.member.user.username} now has ${Object.keys(games[message.guild.id].players[message.member.id]).length - 1} card(s) in their hand`)
        await message.channel.send(game);
      }
      if(deck.length < 5){
        shufflenewdeck();
      }
    }
    }

  if (cmd === "endgame"){
    if(message.member.hasPermission("ADMINISTRATOR")){
      await delete games[message.guild.id];
      await currentcard.splice(0, 1)
      isstopped = true;
      await message.channel.send(`Game ended!`)
    }
    else{
      await message.channel.send(`You need administrator permissions to be able to end games`)
    }
  }
});