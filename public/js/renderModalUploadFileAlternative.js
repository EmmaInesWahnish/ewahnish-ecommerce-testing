
import renderLoginForm from './renderLoginForm.js';
const renderModalUploadFile = () => {

    let session = "";

    const homeRoute = '/api/sessions';

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    fetch(homeRoute, requestOptions)
        .then(result => result.json())
        .then(json => session = json)
        .finally(() => {
            if (session.user) {
                document.getElementById('uModal').style.display = 'block';

                let closeModal = document.getElementById('uClose');

                const here = document.getElementById('here');

                let loadFile = (e) => {
                    let image = document.getElementById('output');
                    image.src = URL.createObjectURL(e.target.files[0]);
                    console.log(image.src)

                }

                here.innerHTML = `<div id="root">
                            <p><input type="file"  accept="image/*" name="image" id="file" style="display: none;"></p>
                            <p><label for="file" style="cursor: pointer;">Upload Image</label></p>
                            <p><img id="output" width="200" /></p>
                          </div>`;

                let myFile = document.getElementById('file')

                myFile.addEventListener('change', loadFile)

                closeModal.addEventListener('click', function () {
                    document.getElementById('uModal').style.display = 'none';
                })

            }
            else {
                renderLoginForm();
            }
        })
        .catch(err => console.log(err))

}

export default renderModalUploadFile;