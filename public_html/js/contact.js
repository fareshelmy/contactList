//Amr
$("#saveButton").click(addContact);
$(document).ready(refreshList);
$("#delete").click(removeContact);

var elementId = 1;
var currentcontact = "";
function Contact(name, phone, mail, gender) {
    this.name = name;
    this.phone = phone;
    this.mail = mail;
    this.gender = gender;
}
function getInfoFromScreen() {
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var mail = document.getElementById("mail").value;
    var gender = document.getElementById("gender").value;
    var newContact = new Contact(name, phone, mail, gender);
    return newContact;
}

// save new contact in array
function addContact() {
    var newContact = getInfoFromScreen();
    var contacts;
    if (window.localStorage.getItem("contacts") != null) {
        contacts = JSON.parse(localStorage.getItem("contacts"));
        contacts.push(newContact);
        window.localStorage.setItem("contacts", JSON.stringify(contacts));
    } else {
        contacts = [];
        contacts.push(newContact);
        window.localStorage.setItem("contacts", JSON.stringify(contacts));
    }
    refreshList();
    clearFields();
}

function refreshList() {
    var divs = document.getElementById("contactList");

    while (divs.hasChildNodes()) {
        divs.removeChild(divs.firstChild);
    }
    var notes = JSON.parse(localStorage.getItem("contacts"));
    for (var i in notes) {
        addContactToView(notes[i]);
    }
}

function addContactToView(contact) {
    var genderPhoto;
    if (contact.gender == "male") {
        genderPhoto = "css/images/male.jpg"
    } else {
        genderPhoto = "css/images/female.jpg"
    }
    var element = "<li id=" + elementId + " class=\"ui-li-has-alt ui-li-has-thumb ui-first-child\">\n\
        <a href=\"#details\" class=\"ui-btn\">\n\
            <img src=" + genderPhoto + ">\n\
            <h2>" + contact.name + "</h2>\n\
            <p>" + contact.phone + "</p></a>\n\
            <a href=\"#\" class=\"ui-btn ui-btn-inline ui-icon-phone ui-btn-icon-right\">\n\
    </a>\n\
    </li>"


    $("#contactList").append(element);
    $("#" + elementId).on('click', function (e) {
        e.preventDefault();
        fillDetails(contact, genderPhoto);
        currentcontact = contact;
        window.location = "#details";
    });

    elementId++;
}

function fillDetails(contact, genderPhoto) {
    $("#profileImage").attr("src", genderPhoto);
    $("#editButton").click(function () {
        fillEditDetails(contact);
    });
}


function getAllContacts() {
    var contacts = new Array;
    var todos_str = localStorage.getItem('contacts');
    if (todos_str !== null) {
        contacts = JSON.parse(todos_str); //convert string to java script object 
    }
    return contacts;
}

function removeContact() {

    var contacts = getToDoList();
    var index;
    for (var i = 0; i < contacts.length; i++) {
        if (currentcontact.name == contacts[i].name && currentcontact.phone == contacts[i].phone) {
            index = i;
            break;
        }
    }
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    refreshList();
}

//Fares
function fillEditDetails(contact) {
    document.getElementById("name").value = contact.name;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("mail").value = contact.mail;
    document.getElementById("gender").value = contact.gender;
    window.location = "#edit";
}

function clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("mail").value = "";
}