<?php
session_start();
require('db_connection.php');
//LOGIN AUTHENTICATION
$method = $_SERVER['REQUEST_METHOD'];
switch ($method){
    case "POST":
        $data = json_decode(file_get_contents("php://input"));
        if (isset($data->username) && ($data->password)){
            $username = mysqli_real_escape_string($db_conn, trim($data->username));
            $password = mysqli_real_escape_string($db_conn, trim($data->password));
            $sql = mysqli_query($db_conn,"SELECT * FROM user WHERE username = '$username' AND passkey = '$password'")or die("Error Connection".mysqli_error($db_conn));
            if ($login_user = mysqli_num_rows($sql)>0){
                while($row = mysqli_fetch_assoc($sql)){
                    $viewjson["id"] = $row['id'];
                    $viewjson["username"] = $row['username'];
                }
                $response = array("success" => true, "message" => "Login successful");
            }else{
                $response = array("success" => false, "message" => "Invalid credentials");
            }
        }
        echo json_encode($response);
        break;
}

?>