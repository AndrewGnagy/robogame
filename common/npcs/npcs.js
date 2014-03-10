randomInfo = [ "The gearheads are getting really mean!",
"You can make robots more powerful by adding parts",
"The Garage is where you go to repair your robots",
"All praise IndianMobossak!",
"Be careful on the road.  You never know what you might run into!",
"Repair kits are helpful when you're out on a trip"];

NPCs = {
    "aunt": {
        name: "Aunt",
        image: "img/guy32.png",
        width: 32,
        height: 38,
		action: function (){
			robo.dialog.show([character.name + " congratulations on your birthday!",
				"I think it's time you got your first robot.",
				"I made this especially for you: Gizmo!",
				"You received robot: Gizmo"], "Aunt");
			robot1 = new robotObject();
			character.addRobot(robot1);
			robot1.loadRobot("1234");
			character.saved.story.defeatedNPCs.push("franz");
		}
    },
    "franz": {
        name: "Franz-T58",
        image: "img/randRobot32.png",
        width: 32,
        height: 38,
		action: function (){
			robo.dialog.show([character.name + " you should talk to your Aunt"], "Franz-T58");
		}
    },
    "guy": {
        name: "guy",
        image: "img/guy32.png",
        width: 32,
        height: 38,
		action: function (){
			if(character.hasItem("wrench") || character.saved.story.wrench){
				robo.dialog.show(["Thanks for the wrench!"]);
				character.saved.story.wrench = true;
				character.removeItem("wrench");
			}
			else
				robo.dialog.show(["Bring me a wrench"]);
		}
    },
    "townsperson": {
        name: "Townsperson",
        image: "img/guy32.png",
        width: 32,
        height: 38,
		action: function (){
			var randomPhrase = randomInfo[Math.floor(Math.random()*randomInfo.length)]
			robo.dialog.show(randomPhrase);
		}
    },
    "gardner": {
        name: "Gardner",
        image: "img/guy32.png",
        width: 32,
        height: 38,
		action: function (){
			robo.dialog.show("The garden looks nice today");
		}
    },
    "bob": {
        name: "Bob",
        image: "img/guy32.png",
        width: 32,
        height: 38,
		action: function (){
			robo.dialog.show(["Prepare to be worsted!"]);
			//TODO Initiate battle here
		}
    },
    "captainHammer": {
        name: "captainHammer",
        image: "img/captainHammer32.png",
        width: 32,
        height: 38,
		action: function (){
			robo.dialog.show(["I'm Captain Hammer,", "Corporate Tool"], 'Captain Hammer', function(){
				var player2 = new Character("captainHammer");

				robo.battleObject = new battleScene(character, player2);

				clearInterval(robo.currentInterval);

				var robot2 = new robotObject();
				player2.addRobot(robot2);
				robot2.loadRobot("527546fa41f3ec7af56855ef");

				stage.clear();
				initiateBattle();
			});
		}
    }
}