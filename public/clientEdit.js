

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
    if (image === '') image = "default.jpg";

    const url = document.URL.split("/");
    const ID = url[url.length - 2];

    const arrayThing = oName.split("\n");

    var textarea = document.getElementById("oNames");
    textarea.textContent = arrayThing.join("\n");


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
        'source': image,
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
    // console.log(await response.text());
}
function clickHandler(event) {
    event.preventDefault();
    editFunction();
    console.log('edit button was clicked');
    // window.location.href = "./";
}
const editForm = document.querySelector("#editButton")
editForm.addEventListener('click', clickHandler);

Image.onchange = evt => {
    const [file] = Image.files
    if (file) {
        photoPreview.src = URL.createObjectURL(file);
        console.log(file.name);
        imageSource.value = file.name;
    }
}