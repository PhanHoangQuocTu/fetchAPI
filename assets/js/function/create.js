var coursesApi = 'http://localhost:3000/courses';
var createBtn = document.querySelector('#create');

function start() {
    handleCreateForm();
}

//start app
start();

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(coursesApi, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function handleCreateForm() {
    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var imageFile = document.querySelector('input[name="image"]').files[0].name;
        
        var formData = {
            name: name,
            description: description,
            imageId: imageFile
        }
        createCourse(formData, function () {

        });
    }
}

