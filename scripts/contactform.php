<?php
header('Content-Type: application/json');
$resp = new stdClass();

if(isset($_POST['pname'])){
	$name = $_POST['pname'];
}
if(isset($_POST['pemail'])){
	$email = $_POST['pemail'];
}
if(isset($_POST['ptext'])){
	$text = "Name:".$name."\r\n" ."Text:".$_POST['ptext'];
} 

$to      = 'danfiza@danyalfiza.com';
$subject = 'Sent From Contact Me @ DanyalFiza.com';
$message = $text;
$headers = 'From:'.$email . "\r\n" .
    'Reply-To: '.$email. "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);

echo json_encode( $resp );
?>