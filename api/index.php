<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
// echo "testing";
// phpinfo();

include('server.php');
$objectDB = new Connection;
$con = $objectDB->connect();

$user = file_get_contents('php://input');
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $sql = "SELECT * FROM users";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        // print_r($path);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $con->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $con->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($users);
        break;

    case "POST":
        $user = json_decode(file_get_contents('php://input'), true);
        $sql = "INSERT INTO users( name,email,mobile,created_at) VALUES (:name, :email, :mobile, :created_at)";
        $stmt = $con->prepare($sql);
        $stmt->bindParam(':name', $user['name']);
        $stmt->bindParam(':email', $user['email']);
        $stmt->bindParam(':mobile', $user['mobile']);
        $created_at = date('Y-m-d H:i:s');
        $stmt->bindParam(':created_at', $created_at);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => "Record Added Successfully."];
        } else {
            $response = ['status' => 0, 'message' => "Failed to add the record"];
        }

        break;

    case "PUT":
        $user = json_decode(file_get_contents('php://input'), true);
        $sql = "UPDATE users SET name=:name,email=:email,mobile=:mobile,updated_at=:updated_at WHERE id=:id";
        $stmt = $con->prepare($sql);
        $stmt->bindParam(':id', $user['id']);
        $stmt->bindParam(':name', $user['name']);
        $stmt->bindParam(':email', $user['email']);
        $stmt->bindParam(':mobile', $user['mobile']);
        $updated_at = date('Y-m-d H:i:s');
        $stmt->bindParam(':updated_at', $updated_at);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => "Record Updated Successfully."];
        } else {
            $response = ['status' => 0, 'message' => "Failed to update the record"];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM users WHERE id= :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $con->prepare($sql);
        $stmt->bindParam(':id', $path[3]);
        $stmt->execute();
        $users = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => "Record Deleted Successfully."];
        } else {
            $response = ['status' => 0, 'message' => "Failed to update the record"];
        }
        echo json_encode($response);
        break;
}
