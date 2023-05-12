<?php

    try {
        $conn = new PDO("mysql:host=localhost;dbname=imageuploader","root","") ;
    }
    catch(PDOException $e) {
        echo $e ;
        die() ;
    }

    // var_dump($_FILES) ;
    // $target_file = "uploads/" . basename($_FILES["file"]["name"]);
    $images = [] ;
    for($i = 0; $i < count($_FILES["file"]["name"]); $i++) {
        $target_file = "uploads/" . basename($_FILES["file"]["name"][$i]) ;
       
        move_uploaded_file($_FILES["file"]["tmp_name"][$i], "uploads/" . basename($_FILES["file"]["name"][$i])) ;
        array_push($images,"uploads/" . basename($_FILES["file"]["name"][$i])) ;
    }

    $conn->query("INSERT INTO images(images_content) VALUES('".json_encode($images)."')") ;

    header("Location: index.php") ;
    
   