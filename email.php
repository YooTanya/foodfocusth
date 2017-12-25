<?php
if(isset($_POST['email'])){
    $to      = 'victoria.pong@gmail.com';
    $subject = 'New Subscriber for Food Focus Newsletter'; 
    $message = 'New subscriber for Food Focus Newsletter \n Email: '.$_POST['email']; 
    $headers = "From: FoodFocus System <victoria.pong@gmail.com>\r\n"; 
    $headers = "Reply-To: victoria.pong@gmail.com \r\n"; 
    $headers = "Content-type: text/html; charset=iso-8859-1\r\n";
    'X-Mailer: PHP/' . phpversion();
    if(mail($to, $subject, $message, $headers)) {
        echo json_encode(['success'=>true]);
    } else {
        echo json_encode(['success'=>false]);
    }
    exit;
 }else{
    echo json_encode(['success'=>false]);
    exit;
 }
?>