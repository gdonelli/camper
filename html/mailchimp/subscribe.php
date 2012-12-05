<?php
	require_once 'MCAPI.class.php';
	require_once 'config.inc.php'; //contains apikey

	$api = new MCAPI($apikey);

	$email		= $_POST["email"];
	$first_name	= $_POST["first_name"];
	$last_name	= $_POST["last_name"];
	$gender		= $_POST["gender"];
	$facebookID	= $_POST["id"];
	$link		= $_POST["link"];
	$locale		= $_POST["locale"];
	
	$double_optin	= $_POST["double_optin"];
	
	$send_welcome	= true;
	
	$merge_vars = array( 'FNAME'		=> $first_name,
						 'LNAME'		=> $last_name,
						 'GENDER'		=> $gender,
						 'FB_ID'		=> $facebookID,
						 'FB_URL'		=> $link
						 );

	// SEND EMAIL TO STATS
	
	$statEmailTitle = ( $facebookID ? "FB" : "@@" ) . " " . $email;
	
	$message = "email:      ". $email				. "\r\n";
	$message .= "first_name: ". $first_name			. "\r\n";
	$message .= "last_name:  ". $last_name			. "\r\n";
	$message .= "gender:     ". $gender				. "\r\n";
	$message .= "facebookID: ". $facebookID			. "\r\n";
	$message .= "link:       ". $link				. "\r\n";
	
	$headers = "From: stats@shoeboxify.com" . "\r\n" . "\r\n" ;
	
	$statsEmailSuccess = mail( "stats@shoeboxify.com", $statEmailTitle , $message, $headers );
	 
	
	// MAILCHIMP
	$validEmail = filter_var($email, FILTER_VALIDATE_EMAIL);
	if ($validEmail)
	{
		// By default this sends a confirmation email - you will not see new members
		// until the link contained in it is clicked!
		$retval = $api->listSubscribe(	$listId,			// list id
										$email,				// email_address
										$merge_vars,		// merge_vars
										"html",				// email_type
										$double_optin,		// double_optin 
										false,				// update_existing -> false will throw an error
										false,				// replace_interests
										"true" // $send_welcome		// send_welcome
										);
	}
	
	$result = null;

	$displayTitle = "Thank you for signing up";
	$displayMessage = "";
	
	$alreadySubscribed = ($api->errorCode && $api->errorCode == 214);
	
	if (!$validEmail)
	{
		$result = array(success		 	=> false,
						errorCode	 	=> 181,
		 				errorMessage 	=> "Invalid email",
		 				statsEmailSuccess => $statsEmailSuccess		);
	}
	else if ( $api->errorCode && !$alreadySubscribed )
	{
		$result = array(success		 	=> false,
						errorCode	 	=> $api->errorCode,
		 				errorMessage 	=> $api->errorMessage,
		 				statsEmailSuccess => $statsEmailSuccess		);
	}
	else
	{	
	
		if ($alreadySubscribed)
		{
			$displayMessage = SuccessDisplayMessage($first_name, $email);
		}
		else if ($double_optin == "true")
		{
			$displayTitle = "Check your email";
			$displayMessage .= "<p>We just sent a message to</p><p>". $email ."</p><p>Please confirm you would like to hear from Shoeboxify</p>";
		}
		else 
		{
			$displayMessage = SuccessDisplayMessage($first_name, $email);
		}
		
		$result = array(success			=> true,
						first_name		=> $first_name,
						displayTitle    => $displayTitle,
						displayMessage	=> $displayMessage,
						double_optin	=> $double_optin,
						alreadySubscribed => $alreadySubscribed,
						errorCode		=> $api->errorCode,
						errorMessage	=> $api->errorMessage,
						statsEmailSuccess => $statsEmailSuccess		);
	}
	
	echo json_encode($result);
?>


<?php 

/******* AUXILIARY FUNCTIONS *******/

function SuccessDisplayMessage($aName, $anEmail)
{
	$resultMessage = "<p>";

	if ($aName)
		$resultMessage .= $aName.", we ";
	else
		$resultMessage .= "We ";

	$resultMessage .= "will send a message to ". $anEmail .", when we have news about Shoeboxify.</p>";
	
	$resultMessage .= "<p>To talk to us, use <a onclick='FeedbackAction(this)'>feedback@shoeboxify.com</a></p>";

	return $resultMessage;
}

?>