<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

<<<<<<<< HEAD:Database/editprofile.php
require 'db_connection.php';
========
$servername = "localhost";
    $username = "root"; // Change if needed
    $password = "";
    $database = "efa_user_db"; // Change if different
    
    $conn = new mysqli($servername, $username, $password, $database);

//require 'db_connection.php'; // Include database connection
>>>>>>>> b639260fab66314c6e8ae420afefbac061fdf345:editprofile.php

$data = json_decode(file_get_contents("php://input"), true);

// Check if all required fields are provided
if (!isset($data['name'], $data['nickname'], $data['sex'], $data['age'], $data['birthdate'], $data['height'], $data['weight'])) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit();
}

// Sanitize and assign data
$name = trim($data['name']);
$nickname = trim($data['nickname']);
$sex = trim($data['sex']);
$age = intval($data['age']);
$birthdate = trim($data['birthdate']);
$height = floatval($data['height']);
$weight = floatval($data['weight']);

// Validate input
if (
    empty($name) || empty($nickname) || empty($sex) || empty($age) ||
    empty($birthdate) || !is_numeric($height) || !is_numeric($weight)
) {
    echo json_encode(["success" => false, "message" => "Invalid or missing input"]);
    exit();
}

// Insert into database
$sql = "INSERT INTO user_profile (name, nickname, sex, age, birthdate, height, weight) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql); 
$stmt->bind_param("sssisdd", $name, $nickname, $sex, $age, $birthdate, $height, $weight);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "User profile created successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to create profile"]);
}

$stmt->close();
$conn->close();
?>
