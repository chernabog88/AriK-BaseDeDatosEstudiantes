var studentList = [];
const errorMsg = document.getElementById("error-msg");
const sDropDown = document.getElementById("studentsDropDown");
const subjDropDown = document.getElementById("subjectsDropDown");
const gradeInput = document.getElementById("gradeInput");
var currentStudentID = 0;
var selectedStudentID = 0;

const infoName = document.getElementById("info-name");
const infoID = document.getElementById("info-ID");
const infoAge = document.getElementById("info-age");
const infoMat = document.getElementById("info-mat");
const infoEng = document.getElementById("info-eng");
const infoGeo = document.getElementById("info-geo");
const infoLit = document.getElementById("info-lit");
const infoAverage = document.getElementById("info-average");

const matDiv = document.getElementById("mat-div");
const engDiv = document.getElementById("eng-div");
const geoDiv = document.getElementById("geo-div");
const litDiv = document.getElementById("lit-div");

const matAvg = document.getElementById("mat-avg");
const engAvg = document.getElementById("eng-avg");
const geoAvg = document.getElementById("geo-avg");
const litAvg = document.getElementById("lit-avg");

class Student {
    constructor(name, lastName, secLastName, age, studentID, average) {
        this.name = name;
        this.lastName = lastName;
        this.secLastName = secLastName;
        this.age = age;
        this.subjects = [" N/A", " N/A", " N/A", " N/A"];
        this.grades = [0, 0, 0, 0];
        this.studentID = studentID;
        this.average = 0;
    }
}

class StudentGroup {
    constructor() {
        this.groupStudents = [];
    }

    addStudentToGroup(student) {
        this.groupStudents.push(student);
    }

    orderAscending(groupID) {


        if (this.groupStudents.length > 1) {
            let delta = null;
            do {
                delta = false;
                for (let i = 0; i < this.groupStudents.length - 1; i++) {
                    if (this.groupStudents[i].subjects[groupID] < this.groupStudents[i + 1].subjects[groupID]) {
                        let temp = this.groupStudents[i];
                        this.groupStudents[i] = this.groupStudents[i + 1];
                        this.groupStudents[i + 1] = temp;
                        delta = true;
                    }
                }
            }
            while (delta === true);
        }


    }

    orderDescending(groupID) {
        if (this.groupStudents.length > 1) {
            let delta = null;
            do {
                delta = false;
                for (let i = 0; i < this.groupStudents.length - 1; i++) {
                    if (this.groupStudents[i].subjects[groupID] > this.groupStudents[i + 1].subjects[groupID]) {
                        let temp = this.groupStudents[i];
                        this.groupStudents[i] = this.groupStudents[i + 1];
                        this.groupStudents[i + 1] = temp;
                        delta = true;
                    }
                }
            }
            while (delta === true);
        }
    }
}

var matGroup = new StudentGroup;
var engGroup = new StudentGroup;
var geoGroup = new StudentGroup;
var litGroup = new StudentGroup;

function addStudent() {
    let tempName = document.getElementById("name").value;
    let tempLastName = document.getElementById("lName").value;
    let tempSecLastName = document.getElementById("sLName").value;
    let tempAge = document.getElementById("age").value;

    if (tempName !== "" && tempLastName !== "" && tempSecLastName !== "" && tempAge >= 5) {
        studentList.push(new Student(
            tempName,
            tempLastName,
            tempSecLastName,
            tempAge,
            currentStudentID)
        )
        currentStudentID++;
        populateStudentDD(tempLastName + " " + tempSecLastName + " " + tempName);
        /* console.log(studentList[currentStudentID - 1]); */

        selectStudent();

        document.getElementById("name").value = "";
        document.getElementById("sLName").value = "";
        document.getElementById("lName").value = "";

        saveLocalStorage();
    }
    else {
        errorMsg.innerHTML = "Error: Revisar campos.";
    }
}

function populateStudentDD(studentName) {
    let newOption = document.createElement("option");
    newOption.text = studentName;
    sDropDown.add(newOption);
}

function selectStudent() {
    for (let i = 0; i < studentList.length; i++) {
        let tempObjNames = studentList[i].lastName + " " + studentList[i].secLastName + " " + studentList[i].name;
        if (tempObjNames === sDropDown.value) {
            selectedStudentID = studentList[i].studentID;
            updateStudentInfo();
            return;
        }
    }
}

function updateStudentInfo() {
    infoName.innerHTML = studentList[selectedStudentID].lastName + " " + studentList[selectedStudentID].secLastName + " " + studentList[selectedStudentID].name;
    infoID.innerHTML = studentList[selectedStudentID].studentID;
    infoAge.innerHTML = studentList[selectedStudentID].age;
    infoMat.innerHTML = studentList[selectedStudentID].subjects[0];
    infoEng.innerHTML = studentList[selectedStudentID].subjects[1];
    infoGeo.innerHTML = studentList[selectedStudentID].subjects[2];
    infoLit.innerHTML = studentList[selectedStudentID].subjects[3];

    /* GET AVERAGE GRADE */
    let tempGrades = 0;
    let iterations = 0;
    for (i = 0; i < studentList[selectedStudentID].subjects.length; i++) {
        if (typeof (studentList[selectedStudentID].subjects[i]) == "number") {
            tempGrades += studentList[selectedStudentID].subjects[i];
            iterations++;
        }
    }
    if (tempGrades != 0) {
        tempGrades = tempGrades / iterations;
    }
    if (tempGrades == 0) {

        infoAverage.innerHTML = "0";
    }
    else {
        infoAverage.innerHTML = tempGrades;
    }
    studentList[selectedStudentID].average = tempGrades;

    saveLocalStorage();
};

function assignSubject() {
    switch (subjDropDown.value) {
        case "Mate":
            if (studentList[selectedStudentID].subjects[0] === " N/A") {
                studentList[selectedStudentID].subjects[0] = " En curso.";
                matGroup.groupStudents.push(studentList[selectedStudentID]);
                populateGroup(studentList[selectedStudentID], matDiv);
            }
            else {
                errorMsg.innerHTML = "Error: Alumno ya inscrito."
            }
            break;
        case "Eng":
            if (studentList[selectedStudentID].subjects[1] === " N/A") {
                studentList[selectedStudentID].subjects[1] = " En curso.";
                engGroup.groupStudents.push(studentList[selectedStudentID]);
                populateGroup(studentList[selectedStudentID], engDiv);
            }
            else {
                errorMsg.innerHTML = "Error: Alumno ya inscrito."
            }
            break;
        case "Geo":
            if (studentList[selectedStudentID].subjects[2] === " N/A") {
                studentList[selectedStudentID].subjects[2] = " En curso.";
                geoGroup.groupStudents.push(studentList[selectedStudentID]);
                populateGroup(studentList[selectedStudentID], geoDiv);
            }
            else {
                errorMsg.innerHTML = "Error: Alumno ya inscrito."
            }
            break;
        case "Lite":
            if (studentList[selectedStudentID].subjects[3] === " N/A") {
                studentList[selectedStudentID].subjects[3] = " En curso.";
                litGroup.groupStudents.push(studentList[selectedStudentID]);
                populateGroup(studentList[selectedStudentID], litDiv);
            }
            else {
                errorMsg.innerHTML = "Error: Alumno ya inscrito."
            }
            break;
        default:
            break;

    }
    updateStudentInfo();
}

function assignGrade() {
    if (gradeInput.value >= 0 && gradeInput.value <= 10) {
        switch (subjDropDown.value) {
            case "Mate":
                if (studentList[selectedStudentID].subjects[0] === " En curso.") {
                    studentList[selectedStudentID].subjects[0] = Number(gradeInput.value);
                }
                else {
                    errorMsg.innerHTML = "Error: No es posible asignar calificación."
                }
                break;
            case "Eng":
                if (studentList[selectedStudentID].subjects[1] === " En curso.") {
                    studentList[selectedStudentID].subjects[1] = Number(gradeInput.value);
                }
                else {
                    errorMsg.innerHTML = "Error: No es posible asignar calificación."
                }
                break;
            case "Geo":
                if (studentList[selectedStudentID].subjects[2] === " En curso.") {
                    studentList[selectedStudentID].subjects[2] = Number(gradeInput.value);
                }
                else {
                    errorMsg.innerHTML = "Error: No es posible asignar calificación."
                } break;
            case "Lite":
                if (studentList[selectedStudentID].subjects[3] === " En curso.") {
                    studentList[selectedStudentID].subjects[3] = Number(gradeInput.value);
                }
                else {
                    errorMsg.innerHTML = "Error: No es posible asignar calificación."
                } break;
            default:
                break;

        }
    }
    updateStudentInfo();
    groupAvg(matGroup, matAvg, 0);
    groupAvg(engGroup, engAvg, 1);
    groupAvg(geoGroup, geoAvg, 2);
    groupAvg(litGroup, litAvg, 3);
}

function populateGroup(student, groupDiv) {
    let node = document.createElement("li");
    let textNode = document.createTextNode(student.lastName + " " + student.secLastName + " " + student.name);
    node.appendChild(textNode);
    groupDiv.appendChild(node);
}

function rearrangeGroup() {
    let lists = document.querySelectorAll("li");
    for (j = 0; j < lists.length; j++) {
        lists[j].remove();
    }

    for (i = 0; i < matGroup.groupStudents.length; i++) {
        let node = document.createElement("li");
        let textNode = document.createTextNode(matGroup.groupStudents[i].lastName + " " + matGroup.groupStudents[i].secLastName + " " + matGroup.groupStudents[i].name);
        node.appendChild(textNode);
        matDiv.appendChild(node);
    }
    for (i = 0; i < engGroup.groupStudents.length; i++) {
        node = document.createElement("li");
        textNode = document.createTextNode(engGroup.groupStudents[i].lastName + " " + engGroup.groupStudents[i].secLastName + " " + engGroup.groupStudents[i].name);
        node.appendChild(textNode);
        engDiv.appendChild(node);
    }
    for (i = 0; i < geoGroup.groupStudents.length; i++) {
        node = document.createElement("li");
        textNode = document.createTextNode(geoGroup.groupStudents[i].lastName + " " + geoGroup.groupStudents[i].secLastName + " " + geoGroup.groupStudents[i].name);
        node.appendChild(textNode);
        geoDiv.appendChild(node);
    }
    for (i = 0; i < litGroup.groupStudents.length; i++) {
        node = document.createElement("li");
        textNode = document.createTextNode(litGroup.groupStudents[i].lastName + " " + litGroup.groupStudents[i].secLastName + " " + litGroup.groupStudents[i].name);
        node.appendChild(textNode);
        litDiv.appendChild(node);
    }

}

function orderA() {
    matGroup.orderAscending(0);
    engGroup.orderAscending(1);
    geoGroup.orderAscending(2);
    litGroup.orderAscending(3);
    rearrangeGroup();
}

function orderD() {
    matGroup.orderDescending(0);
    engGroup.orderDescending(1);
    geoGroup.orderDescending(2);
    litGroup.orderDescending(3);
    rearrangeGroup();
}

function groupAvg(group, avgP, groupNum) {
    if (group.groupStudents.length > 0) {
        let iterations = 0;
        let tempGrade = 0;
        for (i = 0; i < group.groupStudents.length; i++) {
            if (typeof (group.groupStudents[i].subjects[groupNum] == "number")) {
                console.log(group.groupStudents[i].subjects[groupNum])
                tempGrade += Number(group.groupStudents[i].subjects[groupNum]);
                iterations++;
            }
        }
        tempGrade = tempGrade / iterations;
        avgP.innerHTML = tempGrade;
    }
}

function clearError() {
    errorMsg.innerHTML = ""
}

function saveLocalStorage() {
    let string = JSON.stringify(studentList);
    localStorage.setItem("students", string);
    /*      
            LOCAL STORAGE TEST
            let tempList = JSON.parse(localStorage.getItem("students"));
            console.log(tempList[0]);
            console.log(tempList[1]);
            console.log(tempList[2]); */
}