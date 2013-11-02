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
				battleObject = new battleScene(player1, player2);
				battleObject.main();
			}
    }
}