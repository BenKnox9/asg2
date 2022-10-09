

async function editFunction() {
    const pName = document.querySelector("#pName").value;
    const eName = document.querySelector("#eName").value;
    const oName = "other" // document.querySelector("#oName").value;
    const sName = document.querySelector("#sName").value;
    const order = document.querySelector("#Order").value;
    const family = document.querySelector("#Family").value;
    const length = document.querySelector("#Length").value;
    const lUnit = "cm"
    const weight = document.querySelector("#Weight").value;
    const wUnit = "g"
    const status = document.querySelector("#status").value;
    const credit = document.querySelector("#Credit").value;
    var image = document.querySelector("#Image").value;


    const theImage = image.split("\\");
    var imageFinal = theImage[theImage.length - 1];
    if (image === '' && imageSource.value === '') imageFinal = "default.jpg";
    if (imageSource.value !== '') imageFinal = imageSource.value;

    const arrayThing = oName.split("\n");
    var textarea = document.getElementById("oNames");
    textarea.textContent = arrayThing.join("\n");

    const thing = document.URL.split("/");
    const ID = thing[thing.length - 2];

    const birdData = {
        'id': ID,
        'primary_name': pName,
        'english_name': eName,
        'scientific_name': sName,
        'order': order,
        'family': family,
        'other_names': arrayThing,
        'status': status,
        'credit': credit,
        'source': imageFinal,
        'lvalue': length,
        'lunits': lUnit,
        'wvalue': weight,
        'wunits': wUnit,
    }
    const response = await fetch('/birds/:id/edit', {
        method: 'POST',
        body: JSON.stringify(birdData),
        headers: {
            'Content-Type': 'application/json'
        }

    })

}
function submitHandler(event) {
    event.preventDefault();
    editFunction();
}
const editForm = document.querySelector("#editButton")
editForm.addEventListener('click', submitHandler);


const img = document.getElementById('Image');
img.addEventListener('change', (event) => {
    const [file] = img.files
    if (file) {
        photoPreview.src = URL.createObjectURL(file)
        imageSource.value = file.name;
    }

})
