export const Ui = {};

// Dark/Light UI
Ui.isLightUI = true;

Ui.switchTheme = () => {
	$("#theme").remove();
	
	if (Ui.isLightUI)
		$('head').append( $('<link rel="stylesheet" type="text/css" id="theme"/>').attr('href', 'css/light.css') );
	else
		$('head').append( $('<link rel="stylesheet" type="text/css" id="theme"/>').attr('href', 'css/dark.css') );
	
	Ui.isLightUI = !Ui.isLightUI;
}

Ui.confirmButton = null;