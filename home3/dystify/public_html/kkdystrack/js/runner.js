import {Helpers} from "./helpers.js";
import {Ui} from "./ui.js";

export class Runner {
	constructor() {}
	run() {}
}

export class LegacyRunner extends Runner {
	constructor() {
		super();
		this.jsonDir = "data/json_dump.json";
	}

	run(json) {
		let aliasToName = Helpers.aliasToName;

		let songTable = document.querySelector("#song-table");
		let header;

		if (!Helpers.jsonWasUsed) {
			header = document.createElement("tr");
			header.classList.add("table-header");
			header.classList.add("header-fixed");
			songTable.appendChild(header);

			for (var col of json.cols) {
				if (aliasToName[col]) {
					var td = document.createElement("td");
					td.classList.add("table-header");
					td.textContent = aliasToName[col];
					header.appendChild(td);
				}
			}

			Helpers.jsonWasUsed = true;
		}
		else {
			header = document.querySelector("#table-header");
		}

		for (const song of json.data) {
			var songRow = songTable.appendChild(document.createElement("tr"));
			Helpers.rowToJson[songRow] = song;

			for (const [key, value] of Object.entries(song)) {
				if (aliasToName[key] == "Cost") {
					if (value < 0) {
						var td = document.createElement("td");
						td.classList.add("cooldown");
						td.textContent = "On cooldown: " + Helpers.fancyTimeFormat(Math.abs(value));
						songRow.appendChild(td);
					}
					else {
						var td = document.createElement("td");
						td.textContent = Helpers.fancyTimeFormat(Math.abs(value));
						songRow.appendChild(td);
					}

					continue;
				}

				if (aliasToName[key]) {
					var td = document.createElement("td");
					td.textContent = value;
					songRow.appendChild(td);
				}
			}
		}

		$("<div id=\"tree-wrapper\"></div>").appendTo(songTable);

			$("#song-table tr").click(function() {
				if ($(this).hasClass("table-header")) return;

				$(this).addClass('selected').siblings().removeClass('selected');

				if (Ui.confirmButton)
					  Ui.confirmButton.remove();

				Ui.confirmButton = $("<button></button>").addClass("confirm").appendTo(this);

				Ui.confirmButton.click(() => {});

				var value = $(this).find('td:first').html();
		});
	}
}
