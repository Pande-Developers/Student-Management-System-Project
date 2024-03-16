var count = 0;
var students = []; 
var global_id;
function addStudent(){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 
    var nameValue = document.getElementById('name').value;
    var emailValue = document.getElementById('email').value;
    var ageValue = document.getElementById('age').value;
    var gradeValue = document.getElementById('grade').value;
    var educationValue = document.getElementById('education').value;
    var contactValue = document.getElementById('contact').value;

    if(document.querySelector("#submit").innerText == "Save Student"){
        console.log("this will edit and not add");
        console.log(global_id);
        let index;

        for (let i = 0; i < students.length; i++) {
            if (students[i]['ID'] == global_id) {
                index=i;
                break;
            }
        }

        let studentobj = students[index];

        studentobj['name'] = nameValue;
        studentobj['email'] = emailValue;
        studentobj['age'] = ageValue;
        studentobj['grade'] = gradeValue;
        studentobj['contact'] = contactValue;
        studentobj['education'] = educationValue;

        students[index] = studentobj;

        showTable();
        document.querySelector("#submit").innerHTML = "Add Student";

            document.getElementById('name').value="";
            document.getElementById('email').value="";
            document.getElementById('age').value="";
            document.getElementById('grade').value="";
            document.getElementById('contact').value="";
            document.getElementById('education').value="";
    return;

    }
    if(nameValue=='' || emailValue=='' || emailValue==null || ageValue=='' || gradeValue =='' || educationValue=="" || contactValue==""){
        alert("All fields are required!")
        return;
    }

    if(!emailValue.match(mailformat))
    {
        alert("You have entered an invalid email address !");
        return;
    }

    if(gradeValue<0 || gradeValue>10)
    {
        alert("Invalid Grade Value ! ");
        return;
    }

    if(ageValue<0)
    {
        alert("Invalid Age ! ");
        return;
    }

    if(contactValue.length<7 || contactValue.length>15)
    {
        alert("Invalid contact number ! ");
        return;
    }

    count++;

    students.push({
        ID:count,
        name:nameValue,
        email:emailValue,
        age:ageValue,
        grade:gradeValue,
        contact:contactValue,
        education:educationValue
    });


    document.getElementById('name').value="";
    document.getElementById('email').value="";
    document.getElementById('age').value="";
    document.getElementById('grade').value="";
    document.getElementById('contact').value="";
    document.getElementById('education').value="";
    console.log(students);
    showTable();
}

function showTable(){
    var table = document.getElementById('tbody');
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    table.value="";
    students.forEach((student)=>{

        var row = document.createElement("tr");
        var keys=Object.keys(student);

        var id = document.createElement('td');
        var name = document.createElement('td');
        var email = document.createElement('td');
        var age = document.createElement('td');
        var grade = document.createElement('td');
        var contact = document.createElement('td');
        var education = document.createElement('td');

        keys.forEach((key)=>{
            if(key=='ID'){
                id.innerHTML = student[key];
            }
            else if(key=='name'){
                name.innerHTML = student[key];
            }
            else if(key=='email'){
                email.innerHTML = student[key];
            }
            else if(key=='age'){
                age.innerHTML = student[key];
            }
            else if(key=='grade'){  
                grade.innerHTML = student[key];
            }
            else if(key=='contact'){  
                contact.innerHTML = student[key];
            }
            else
            education.innerHTML = `<div class='education'><div>${student[key]}</div> <div class="icons"><a onClick="edit(${student['ID']})" class='fa'>&#xf044;</a> <a onClick="del(${student['ID']})" class='fa'>&#xf1f8;</a> </div></div> `;

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(age);
            row.appendChild(grade);
            row.appendChild(contact);
            row.appendChild(education);       
        })

        table.appendChild(row);
    })
}

function search(){
  var input, filter, table, tr, td, i, txtValue,txtValue1,txtValue2;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("tbody");
  tr = table.getElementsByTagName("tr");


  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    td1 = tr[i].getElementsByTagName("td")[2];
    td2 = tr[i].getElementsByTagName("td")[5];
    if (td || td1 || td2) {
      txtValue = td.textContent || td.innerText;
      txtValue1 = td1.textContent || td1.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function edit(id) {
    let student;
    console.log(id);
    for (let i = 0; i < students.length; i++) {
        if (students[i]['ID'] == id) {
            student = students[i];
            break;
        }
    }

    document.querySelector("#name").value = student['name'];
    document.querySelector("#email").value = student['email'];
    document.querySelector("#grade").value = student['grade'];
    document.querySelector("#age").value = student['age'];
    document.querySelector("#contact").value = student['contact'];
    document.querySelector("#education").value = student['education'];

    document.getElementById("submit").innerText = "Save Student";

    global_id=id;
}

function del(id){
    students.forEach((student,index) => {
        if(student['ID']==id){
            students.splice(index,1);
            showTable();
        }
    })
}
