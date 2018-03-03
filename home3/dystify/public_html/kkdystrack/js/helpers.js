export const Helpers = {};

Helpers.fancyTimeFormat = function(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

Helpers.aliasToName = {
	"song_id": null,
	"rating_pct": null,
	"rating_num": null,
	"franchise_name": null,
	"song_name": "Song name",
	"ost_name": "OST",
	"song_length": "Length",
	"cost": "Cost",
	"last_play": "Last played",
	"times_played": "Times played"
}

Helpers.rowToJson = {};

Helpers.jsonWasUsed = false;

function match(item, obj) {

}

export function treeWalk(tree, res) {
  for (const [k, v] of Object.entries(tree)) {
      console.log(res[k]);
      if (typeof v == "object")
        treeWalk(v)
  }
}
