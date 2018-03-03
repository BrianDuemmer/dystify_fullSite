<?php	
	require_once $_SERVER['DOCUMENT_ROOT'] . '/kkdystrack/php/inc/viewer.php';
	
	/** 
	 * something along the lines of:
	 * $USER, $RUPEES rupees $pfp <a>Sign out...</a>
	 * */
	function formatLoggedInBox($vw) {
		echo "<div class='login_container'>
				<img class='login_pfp_thumbnail' src='$vw->pfpAddress' alt='$vw->username'/>
				<div class='login_popup'>
					<img class='login_pfp_expanded' src='$vw->pfpAddress' alt='$vw->username'/>
					<h6 class='login_username'>$vw->username</h6>
					<p>rupees: $vw->rupees</p>
					<a href='/kkdystrack/php/logout.php' class='btn'><span>Sign out...</span></a>
				</div>
			</div>";
	}
	
	
	
	/**
	 * something along the lines of:
	 * <a>Sign in with YouTube</a> to request songs
	 * */
	function formatLoggedOutBox() {
		echo "<div class='login_container'><a href='/kkdystrack/php/login_callback.php' class='btn'><span>Sign in</span></a></div>";
	}
	
	
	
	
// 	if(!$_SESSION) { session_start(); }
 	
	
	// Session's already loaded
// 	if(isset($_SESSION['session_id'])) {
// 		formatLoggedInBox();
		
// 	} // session's not loaded yet
// 	else {
		$id = $_COOKIE['session_id'];
		$vw = Viewer::withSessionID($id);
// 		print_r($vw);
		$viewerExists = $vw->userID && $vw->userID != '';
		
		if($viewerExists) { // cookie is good, so we can load the session from there
			$_SESSION['session_id'] = $id;
			$_SESSION['user_id'] = $vw->userID;
			formatLoggedInBox($vw);
// 			print_r($_SESSION);
		} // not logged in, prompt for login
		else {
			formatLoggedOutBox();
		}
// 	}
	
	// echo '<br/><pre>'; print_r($_SESSION); echo '</pre>';
?>