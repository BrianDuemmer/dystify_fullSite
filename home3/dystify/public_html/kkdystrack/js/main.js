import {Helpers} from "./helpers.js";
import {TreeRunner} from "./treerunner.js";
import {Ui as ui} from "./ui.js";

let runner = new TreeRunner();

let json;
let tickRate = 10;
let timesJsonWasIndexed = 0;

ui.switchTheme();

fetch(runner.jsonDir)
	.then(response => response.json())
	.then(data => {
		console.log(data);
		OnLoad(data);
	});

document.querySelector(".theme-switch").onclick = e => ui.switchTheme();

function OnLoad(data) {
	runner.run(data);
}
