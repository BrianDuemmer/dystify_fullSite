import {Helpers, treeWalk} from "./helpers.js";
import {Ui} from "./ui.js";
import {Runner} from "./runner.js";

export class TreeRunner extends Runner {
	constructor() {
		super();
		this.jsonDir = "data/json_dump_new.json";
	}

	run(json) {
		let osts = json.osts;

		let aliasToName = Helpers.aliasToName;

		let songTable = document.querySelector("#song-table");
		let header;

		if (!Helpers.jsonWasUsed) {
			let thead = document.createElement("thead");
			header = document.createElement("tr");
			header.classList.add("table-header");
			thead.appendChild(header);
			songTable.appendChild(thead);

			for (var col of json.cols) {
				if (aliasToName[col]) {
					var td = document.createElement("th");
					td.classList.add("table-header");
					td.textContent = aliasToName[col];
					header.appendChild(td);
				}
			}

			//Helpers.jsonWasUsed = true;
		}
		else {
			header = document.querySelector("#table-header");
		}

		let treeNav = document.querySelector("#tree-nav");

		function onTreeOstClick(elem, ost) {
			$("*").removeClass("ost-selected");
			elem.classList.add("ost-selected");

			if (ost)
				runOst(ost);
			else
				runOst(osts[elem.textContent]);
		}

		for (const [name, ost] of Object.entries(osts)) {
			let li = document.createElement("li");

			if (ost.songs) {
				li.textContent = ost.ost_name;
				li.classList.add("tree-ost-item");
				li.onclick = () => onTreeOstClick(li);
			}

			if (ost.volumes) {
				li.textContent = ost.ost_name;
				li.classList.add("tree-volume-item");

				let i = 0;
				for (const [name, volume] of Object.entries(ost.volumes)) {
					let subUl = document.createElement("ul");
					let subLi = document.createElement("li");
					subLi.classList.add("tree-ost-item");
					subLi.textContent = volume.name;

					subLi.onclick = () => onTreeOstClick(subLi, volume);

					subUl.appendChild(subLi);
					li.appendChild(subUl);

					i++;
				}
			}

			treeNav.appendChild(li);
		}

		function runOst(ost) {
      $(songTable).find('tbody').remove();
			let tbody = document.createElement("tbody");

			for (const song of ost.songs) {
        let ostContainer = document.createElement("tr");
				tbody.appendChild(ostContainer);
        ostContainer.classList.add("song");

				songTable.appendChild(tbody);
				let songRow = tbody.appendChild(ostContainer);

				for (const [key, value] of Object.entries(song)) {
					let name = aliasToName[key];
          let td = document.createElement("td");
          td.classList.add("song");

					if (name == "Cost") {
						if (value < 0) {
							td.classList.add("cooldown");
							td.textContent = "On cooldown: " + Helpers.fancyTimeFormat(Math.abs(value));
							songRow.appendChild(td);
						}
						else {
							td.textContent = value;
							songRow.appendChild(td);
						}

						continue;
					}

					if (name == "Length") {
						td.textContent = Helpers.fancyTimeFormat(value);
						songRow.appendChild(td);

						continue;
					}

					if (name) {
						td.textContent = value;
						songRow.appendChild(td);
					}
				}
			}

			addTableEvent();
		}

		function addTableEvent() {
			$("#song-table tr").click(function() {
				if ($(this).hasClass("table-header")) return;

				$(this).addClass('selected').siblings().removeClass('selected');

				if (Ui.confirmButton)
						Ui.confirmButton.remove();

				Ui.confirmButton = $("<button></button>").addClass("confirm").appendTo(this);

				Ui.confirmButton.click(() => {

				});

				var value = $(this).find('td:first').html();
			});
		}
	}
}
