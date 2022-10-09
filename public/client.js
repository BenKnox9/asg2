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


}

function submitHandler(event) {
    event.preventDefault();
    createFunction();
}

const form = document.querySelector("#submitButton")
form.addEventListener('click', submitHandler);


const imageSource = document.getElementById('imageSource');
const Image = document.getElementById('Image');


const img = document.getElementById('Image');
img.addEventListener('change', (event) => {
    const [file] = img.files
    if (file) {
        photoPreview.src = URL.createObjectURL(file)
        imageSource.value = file.name;
    }
})




