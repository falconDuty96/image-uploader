class Uploader {
    constructor() {
        this.formData = new FormData();
    }

    addData(event, filename) {
        var myFile = event.target.files;
        this.formData.append(filename, myFile[0]);
    }
    previewImage(place) {
        for (var pair of this.formData.entries()) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $(place).append(`<img src='${e.target.result}'>`)
            }
            $(place).empty()
            reader.readAsDataURL(pair[1]);
        }
    }
    getImages() {
        return this.formData;
    }
    transfertImageToInput(element) {
        const dataTransfer = new DataTransfer();
        for (var pair of this.getImages().entries()) {
            dataTransfer.items.add(pair[1])
        }
        document.getElementById(element).files = dataTransfer.files;
    }
}