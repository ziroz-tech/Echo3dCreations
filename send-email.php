<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $to = "art.2.light4@example.com";
    $subject = "New message from your website";
    $body = "Name: $name\nEmail: $email\nMessage: $message";

    if (mail($to, $subject, $body)) {
        echo "メールが送信されました。";
    } else {
        echo "メールの送信に失敗しました。";
    }
}
?>