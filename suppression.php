<?php
try {
    $conn = new PDO("mysql:host=localhost;dbname=imageuploader", "root", "");
} catch (PDOException $e) {
    echo $e;
    die();
}
$idParent = $_POST["idparent"];
$idElement = $_POST["idelement"];

$stmt = $conn->query("SELECT * FROM images WHERE id='$idParent'") ;
$res = $stmt->fetchAll(PDO::FETCH_OBJ);
$result = [];
if (count($res) > 0) {
    $images = $res[0]->images_content;
    $result = json_decode($images);
}

// var_dump($result) ;
unlink("$result[$idElement]") ;

array_splice($result,$idElement,1) ;

// var_dump($newArray) ;
// die() ;
$newArrayEncode = json_encode($result) ;

$stmt = $conn->query("UPDATE images SET images_content='$newArrayEncode' WHERE id='$idParent'") ;
echo "okey" ;


