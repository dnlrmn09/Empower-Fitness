<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "efa_user_db");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
$otp = $data["otp"];

if (empty($otp)) {
    echo json_encode(["error" => "OTP is required!"]);
    exit;
}

// Check OTP in the database
$stmt = $conn->prepare("SELECT email FROM users WHERE otp = ? AND is_verified = 0");
$stmt->bind_param("s", $otp);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Mark email as verified
    $update_stmt = $conn->prepare("UPDATE users SET is_verified = 1 WHERE email = ?");
    $update_stmt->bind_param("s", $user["email"]);
    $update_stmt->execute();
    
    echo json_encode(["success" => "Email verified successfully!"]);
} else {
    echo json_encode(["error" => "Invalid OTP."]);
}

$stmt->close();
$conn->close();
?>
