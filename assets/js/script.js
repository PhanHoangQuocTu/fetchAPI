

var coursesApi = 'http://localhost:3000/courses';

function start() {
    getCourses(renderCourses);
    handleUpdateForm();
}

//start app
start();

document.querySelector('.close').onclick = function(){
    document.querySelector('.modal').style.display = 'none';
}

//function
function getCourses(callback) {
    fetch(coursesApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function handleUpdateForm(){
    var updateBtn = document.querySelector('#updateBtn');
    updateBtn.onclick = function(){
        var idUpdate = document.querySelector('#labelId').textContent;
        var nameUpdate = document.querySelector('input[name="nameUpdate"]').value;
        var descriptionUpdate = document.querySelector('input[name="descriptionUpdate"]').value;
        var imageFile = document.querySelector('input[name="image"]').files[0].name;
        var formData = {
            name: nameUpdate,
            description: descriptionUpdate,
            imageId: imageFile
        }
        handleUpdateCourse(idUpdate ,formData, function(){
            getCourses(renderCourses);
        });
    }
}

function handleUpdateCourse(id, data, callback){
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(coursesApi + '/' + id, options)
        .then(function(response){
            return response.json();
        })
        .then(callback);  

        getCourses(renderCourses);
}

function handleDeleteCourse(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(coursesApi + '/' + id, options)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            //getCourses(renderCourses);
            var courseItem = document.querySelector('.course-item-' + id);
            if(courseItem){
                courseItem.remove();
                
            }
            getCourses(renderCourses);
        });
}

function getInfoUpdate(id){
    document.querySelector('#labelId').innerHTML = id;
    document.querySelector('.modal').style.display = 'block';
}

function renderCourses(courses) {
    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function (course) {
        return `
            <div class="card col-3 mr-4 mt-4" style="width: 18rem;">
                <div class="card-body">
                    <img class="card-img-top" src="./assets/img/${course.imageId}" height="65%" alt="Card image cap">
                    <h5 class="card-title">${course.name}</h5>
                    <p class="card-text">${course.description}</p>
                    <button onclick="handleDeleteCourse(${course.id})">Delete</button>
                    <button onclick="getInfoUpdate(${course.id})">Update</button> 
                </div>
            </div>    
        `;
    })
    listCoursesBlock.innerHTML = htmls.join("");
}


