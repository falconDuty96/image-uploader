class Uploader {
    constructor() {
        this.formData = new FormData();
    }

    addData(event, filename) {
        var myFile = event.target.files;
        this.filename = filename;
        this.formData.append(filename, myFile[0]);
        event.target.value = '';
    }
    previewImage(place) {
        for (var pair of this.formData.entries()) {
            console.log(pair)
            if (pair[1] != '') {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $(place).append(`
                <div class="conteneur">
                    <div class="close-x">x</div>
                    <img data-name='${pair[1].name}' style='margin-right: 10px;width: 250px; height: 250px; object-fit: cover;' src='${e.target.result}'>
                </div>
            `)
                }
                $(place).empty()
                reader.readAsDataURL(pair[1]);
            }

        }

    }
    getImages() {
        return this.formData;
    }
    transfertImageToInput(element) {
        const dataTransfer = new DataTransfer();
        for (var pair of this.formData.entries()) {
            console.log(pair)
            if (typeof(pair[1]) != "string") {
                dataTransfer.items.add(pair[1])
            }

        }

        // console.log(dataTransfer.files)
        document.getElementById(element).files = dataTransfer.files;
    }

    deleteImage(elem) {
        var imgName = $(elem).next().data("name");
        $(elem).parent().remove();
        var d = this.formData.getAll(this.filename);
        var index = 0;
        // console.log(d) ;
        
        for (let i = 0; i < d.length; i++) {
            
            if (d[i].name == imgName && d[i] != "") {
                index = i;
            }
        }
        // console.log(index) ;
        d.splice(index, 1);

        // d[index] = "" ;
        
        this.formData.delete(this.filename);
        for(let a = 0; a < d.length; a++) {
            this.formData.append(this.filename, d[a]) ;
        }


        // this.formData.set(this.filename, d);




    }
}