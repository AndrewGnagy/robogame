NPCs = {
    "guy": {
        name: "guy",
        image: "img/guy32.png",
        width: 32,
        height: 38,
		action: function (){
				if(character.hasItem("wrench") || character.saved.story.wrench){
					dialog.show(["Thanks for the wrench!"]);
					character.saved.story.wrench = true;
					character.removeItem("wrench");
				}
				else
					dialog.show(["Bring me a wrench"]);
			}
    },
    "bob": {
        name: "Bob",
        image: "img/guy32.png",
        width: 32,
        height: 38,
		action: function (){
				dialog.show(["Prepare to be worsted!"]);
				//TODO Initiate battle here
			}
    },
    "captainHammer": {
        name: "captainHammer",
        image: "img/captainHammer32.png",
        width: 32,
        height: 38,
		action: function (){
				dialog.show(["I'm Captain Hammer,", "Corporate Tool"]);
			}
    }
}