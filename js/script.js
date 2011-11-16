/* Author: 

*/

$(document).ready(function () {
	$.getJSON("packs/_cards.json",
		function(json) {
			var img_src, aud_src, id;
			var allcards = [];

			for(card in json.cards) {
				allcards.push(json.cards[card]);
				allcards.push(json.cards[card]);
			}

			allcards = $.shuffle(allcards);

			$.each(allcards, function(key, val) {
				img_src = val.pictureURL;
				id = val.text.example.audioID;
				aud_src = val.text.example.audioID;
				word = val.text.example.text;

				$('<dt class="card back" data-word="'+ word +'" id="'+id+'"><img src="img/back_of_card.png" alt="" /></dt>').click(function() { flipCard($(this)); }).appendTo("#game");
				$('<dd class="card front" id="'+id+'_flip"><img src="' + img_src +'" alt="" /><audio id="' + id + '_audio" preload="auto"><source src="' + aud_src + '.mp3" type="audio/mp3" /></audio></dt>').appendTo("#game");
			});
		});
});

function flipCard(el) {
	var new_id = el.attr("id") + "_flip";
	var aud_id = el.attr("id") + "_audio";

	el.flip({
		direction: "lr",
		color: "white",
		content: $('#' + new_id),
		onEnd: function() {
			document.getElementById(aud_id).play();
		}
	});

	el.addClass("flipped").unbind("click");
	el.click(function() { revertCard(el); });

	checkForMatch();
}

function checkForMatch() {
	var flipped_cards = $(".flipped");

	if(flipped_cards.length === 2) {
		if($(flipped_cards[0]).data("word") == $(flipped_cards[1]).data("word")) {
			flipped_cards.each(function(key, val) {
				$(this).removeClass("flipped").addClass("matched");
				$(this).unbind("click");

				checkForWin();
			});

		} else {
			setTimeout(function() {
				flipped_cards.each(function(key, val) { $(this).click() });
			}, 1800);
		}
	}
}

function checkForWin() {
	var cards = $("#game dd");

	if(cards.length - 1 === $(".matched").length) {
		setTimeout(function() {
			location.reload(true);
		}, 5000)
	}
}

function revertCard(el) {
	el.revertFlip();
	
	el.removeClass("flipped").unbind("click");
	el.click(function() { flipCard(el); });
}