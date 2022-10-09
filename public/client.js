async function createFunction() {

    const pName = document.querySelector("#pName").value;
    const eName = document.querySelector("#eName").value;
    var oName = "other names";// document.querySelector("#oName").value;
    const sName = document.querySelector("#sName").value;
    const order = document.querySelector("#Order").value;
    const family = document.querySelector("#Family").value;
    const length = document.querySelector("#Length").value;
    const lUnit = "cm"
    const weight = document.querySelector("#Weight").value;
    const wUnit = "g"
    const status = document.querySelector("#status").value;
    const credit = document.querySelector("#Credit").value;
    var image = document.querySelector("#imageSource").value;
    if (image === '') image = "default.jpg";
    /*
    if (oName === null) {
        oName = "";
    } else {
        oName = oName.split("\n");
    }
    */
    const birdData = {
        '_id': null,
        'primary_name': pName,
        'english_name': eName,
        'scientific_name': sName,
        'order': order,
        'family': family,
        'other_names': oName,
        'status': status,
        'credit': credit,
        'source': image,
        'lvalue': length,
        'lunits': lUnit,
        'wvalue': weight,
        'wunits': wUnit,
    }
    const response = await fetch('./birds/create', {
        method: 'POST',
        body: JSON.stringify(birdData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(await response.text());

}



function clickHandler(event) {
    event.preventDefault();
    createFunction();
    console.log('button was clicked');
}

const form = document.querySelector("#submitButton")
form.addEventListener('click', clickHandler);


const imageSource = document.getElementById('imageSource');
const Image = document.getElementById('Image');

/*
Image.addEventListener('change', (event) => {
    console.log("image changed");
    const file = event.target.files[0];
    console.log(file);
    imageSource.value = file.name;
    document.getElementById("photoPreview").src = file.name;

})
*/
Image.onchange = evt => {
    const [file] = Image.files
    if (file) {
        photoPreview.src = URL.createObjectURL(file);
        console.log(file.name);
        imageSource.value = file.name;
    }
}





