class Uploader {
    constructor() {
        this.formData = new FormData();
    }

    addData(event, filename) {
        var myFile = event.target.files;
        this.filename = filename ;
        this.formData.append(filename, myFile[0]);
        event.target.value = '' ;
    }
    previewImage(place) {
        for (var pair of this.formData.entries()) {
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
    getImages() {
        return this.formData;
    }
    transfertImageToInput(element) {
        const dataTransfer = new DataTransfer();
        for (var pair of this.formData.entries()) {
            dataTransfer.items.add(pair[1])
        }
        document.getElementById(element).files = dataTransfer.files;
    }

    deleteImage(elem) {
        // console.log(this.getImages().getAll(this.filename)) ;
        var imgName = $(elem).next().data("name") ;
        $(elem).parent().remove() ;
        var d = this.formData.getAll(this.filename) ;
        var index = 0 ;
        for(let i = 0; i < d.length; i++) {
            if(d[i].name == imgName) {
                index = i ;
            }
        }
        d.splice(index,1) ;
        this.formData.delete(this.filename) ;
        for(let a = 0; a < d.length; a++) {
            this.formData.set(this.filename, d[a]) ;
        }
        
        
        
        
        
    }
}