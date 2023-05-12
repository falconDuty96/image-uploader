<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Uploader</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="lib/Uploader.css">
    <style>

    </style>
</head>

<body>

    <form autocomplete="off" action="traitement.php" method="post" id="form" enctype="multipart/form-data">
        <input type="file" name="file[]" id="file" onchange="adding(event)">
        <input type="submit" value="Envoyer">
    </form>

    <div id="fileReader" style="display: flex;flex-direction: row;flex-wrap: wrap;">

    </div>

    <?php

    try {
        $conn = new PDO("mysql:host=localhost;dbname=imageuploader", "root", "");
    } catch (PDOException $e) {
        echo $e;
        die();
    }
    $stmt = $conn->query("SELECT * FROM images WHERE 1");
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    $result = [];
    if (count($res) > 0) {
        $images = $res[0]->images_content;
        $result = json_decode($images);
    }

    // var_dump($result) ;



    ?>
    <div id="fileReader" style="display: flex;flex-direction: row;flex-wrap: wrap;">
        <?php for($i = 0; $i < count($result); $i++) : ?>
            <div class="conteneur">
            <div class="close-x" data-idelement="<?php echo $i ;?>" data-idparent="1">x</div>
            <img data-name="<?php echo $result[$i] ;?>" style='margin-right: 10px;width: 250px; height: 250px; object-fit: cover;' src="http://localhost/image-uploader/<?php echo $result[$i] ;?>">
        </div>
        <?php endfor ; ?>    
    
    </div>
    


    <script src="jquery.min.js"></script>
    <script src="lib/Uploader.js"></script>
    <script src="app.js"></script>
</body>

</html>