    var loadFile = function (event) {
        var imgProd = document.getElementById('imgProd');
        imgProd.src = URL.createObjectURL(event.target.files[0]);
        imgProd.onload = function () {
            URL.revokeObjectURL(imgProd.src) // free memory
        }
    };
