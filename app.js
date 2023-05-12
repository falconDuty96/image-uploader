// Create a new instance of Uploader
const myF = new Uploader();


// Add queue to the list
function adding(event) {
    // event.stopImmediatePropagation() ;
    myF.addData(event, "file[]");
}


// Preview image to the selected Place
$("#file").on("change",function () {
    myF.previewImage("#fileReader");
})

// Transport the list to the input file
$("#form").on("submit",function (e) {
    // e.preventDefault() ;

    myF.transfertImageToInput("file");
}) ;

$(document).on("click",".close-x",function() {
    if($(this).data("idelement") !== "") {
        console.log("ato oh")
        var idElement = $(this).data("idelement") ;
        var idParent = $(this).data("idparent") ;
        $.ajax({
            url: "http://localhost/image-uploader/suppression.php" ,
            type: "post" ,
            data: {
                "idparent": idParent ,
                "idelement": idElement ,
            }
        })
        .done(function(data) {
            console.log(data) ;
        })
    }
    myF.deleteImage($(this))
})