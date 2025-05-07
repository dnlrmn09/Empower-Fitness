<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Headers: Content-Type");

// $conn = new mysqli("localhost", "root", "", "efa_user_db");

// if ($conn->connect_error) {
//     die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
// }

// $data = json_decode(file_get_contents("php://input"), true);

// if (!empty($data["email"]) && !empty($data["password"])) {
//     $email = $data["email"];
//     $password = password_hash($data["password"], PASSWORD_DEFAULT); // Hash password

//     $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
//     $stmt->bind_param("ss", $email, $password);

//     if ($stmt->execute()) {
//         echo json_encode(["success" => "User registered successfully!"]);
//     } else {
//         echo json_encode(["error" => "Email already exists!"]);
//     }
//     $stmt->close();
// } else {
//     echo json_encode(["error" => "All fields are required!"]);
// }

// $conn->close();


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

// Database connection
$conn = new mysqli("localhost", "root", "", "efa_user_db");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data["email"]) && !empty($data["password"])) {
    $email = $data["email"];
    $password = password_hash($data["password"], PASSWORD_DEFAULT); // Secure password
    $otp = rand(1000, 9999); // Generate a 6-digit OTP

    // Check if email already exists
    $checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $result = $checkStmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["error" => "Email already exists!"]);
        exit;
    }
    $checkStmt->close();

    // Insert user into database with OTP
    $stmt = $conn->prepare("INSERT INTO users (email, password, otp, is_verified) VALUES (?, ?, ?, 0)");
    $stmt->bind_param("ssi", $email, $password, $otp);

    if ($stmt->execute()) {
        
        // Send OTP Email
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'danielaromanacastaneda@gmail.com'; // Your Gmail
            $mail->Password = 'ewdi jlsr kpvc nyxb'; // Use App Password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Use TLS
            $mail->Port = 587; // Correct port for TLS

            $mail->setFrom('danielaromanacastaneda@gmail.com', 'EEEFFFAAA');
            $mail->addAddress($email); // Recipient email
            $mail->Subject = "Email Verification - OTP Code";
            $mail->Body = "Your OTP code is: $otp. Use this to verify your email.";

            $mail->SMTPDebug = SMTP::DEBUG_SERVER; // Enable debugging
            $mail->Debugoutput = 'html';

            if ($mail->send()) {
                echo json_encode(["success" => "User registered! OTP sent to email."]);
            } else {
                echo json_encode(["error" => "User registered, but OTP email failed to send: " . $mail->ErrorInfo]);
            }
        } catch (Exception $e) {
            echo json_encode(["error" => "Mailer Error: " . $mail->ErrorInfo]);
        }
    } else {
        echo json_encode(["error" => "Registration failed."]);
    }
    $stmt->close();
} else {
    echo json_encode(["error" => "All fields are required!"]);
}

$conn->close();
































?>
