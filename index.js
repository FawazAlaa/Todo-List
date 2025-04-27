
var mytitle=document.querySelector("#title"); //hna mish .value 3slhan awl mrun el code 7igeeb value b null
var mydescription=document.querySelector("#description");




var addbtn=document.querySelector("#add");
var todolist=[];
var newIndex=0;
var editIndex=-17; //ay rakm ne3mal beh el bedaya

if (localStorage.getItem("todolist")!=null)
    {
        todolist = JSON.parse(localStorage.getItem("todolist"));
        newIndex=todolist[todolist.length-1].id+1;
        displaydata();
    }

addbtn.addEventListener('click',function(Eventinfo){
    // cartona+=`<div id="lists"> 
    //           <input type="text" value="${mytitle.value}">

    var titleValue = mytitle.value.trim();
    var descriptionValue = mydescription.value.trim();

    var titleRegex = /^[A-Z][a-z0-9 A-Z]{3,8}$/;    // Title Must Start with captial letter and must be any characters between 3 and 8
    var descriptionRegex = /^.{0,20}$/; // Description: any characters up to 20

    if (!titleRegex.test(titleValue)) {
        alert("Title Must Start with captial letter and must be any characters or numbers between 3 and 8!");
        return; 
    }

    if (!descriptionRegex.test(descriptionValue)) {
        alert("Description must be 20 characters max!");
        return;
    }
    if (editIndex === -17) { 
        // ADD new todo
        var todo = {
            title: titleValue,
            des: descriptionValue,
            checkvalue: false, //3lshan el class w el check
            id: newIndex //3lshan el unique id
        };
    newIndex++;
    todolist.push(todo);
    }
    else {

        todolist[editIndex].title = titleValue;
        todolist[editIndex].des = descriptionValue;
        editIndex = -17; 
        addbtn.innerText = "Add"; 
    }
    

    setLocalStorage();

    console.log(todolist);

    displaydata();

})


function displaydata(searchTerm = "") {
    var cartona = ``;
    for (var i = 0; i < todolist.length; i++) {
        var title = todolist[i].title.toLowerCase();
        var description = todolist[i].des.toLowerCase();

        if (title.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase())) {
            cartona += `
            <div id="lists"> 
                <h3 id="text" class="${todolist[i].checkvalue ? 'checked' : ''}">
                    ${todolist[i].title}
                </h3>
                <h4 id="text" class="${todolist[i].checkvalue ? 'checked' : ''}">
                    ${todolist[i].des}
                </h4>
                <div id="button_container">
                <button onclick="checkdata(${i})">Check</button> 
                <button onclick="editdata(${i})">Edit</button> 
                <button onclick="removedata(${i})">Delete</button>
                </div>
            </div>`;
        }
    }
    document.getElementById("mydata").innerHTML = cartona;
}
 function checkdata(i){
        // checkvalue:false/
todolist[i].checkvalue= !todolist[i].checkvalue;
displaydata();

//ageeb el element da w a3del el css
}

function editdata(i) {
    editIndex = i; // remember which item we are editing
    mytitle.value = todolist[i].title;
    mydescription.value = todolist[i].des;
    addbtn.innerText = "Update";
}

function updatedata(){
    addbtn.innerText="Add"
    //mograd rogo3 lel awl
}

function removedata(i){
    var agree=prompt('Sure u want to remove y/n ');
    if(agree=='y'){
        todolist.splice(i,1);
        newIndex--;

        console.log(todolist);

        if(todolist.length==0)
        {
            localStorage.removeItem("todolist");
            newIndex=0;
        }
        else
        {
            setLocalStorage();
        }
        displaydata(); //mohema gedannnnnnnnnn>>>>>>>>>>>>
    }
}
var searchInput = document.getElementById("search");

searchInput.addEventListener("input", function () {
    displaydata(this.value);
});

function setLocalStorage(){
    localStorage.setItem("todolist",JSON.stringify(todolist));
}



