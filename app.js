// Create a new instance of Uploader
const myF = new Uploader();

// Add queue to the list
function adding(event) {
    myF.addData(event, "file[]");
}


// Preview image to the selected Place
$("#file").on("change",function () {
    myF.previewImage("#fileReader");
})

// Transport the list to the input file
$("#form").on("submit",function (e) {
    myF.transfertImageToInput("file");
})