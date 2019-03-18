//Amr
function ContactInfo(name,phone,mail,gender){
    this.name=name;
    this.phone=phone;
    this.mail=mail;
    this.gender=gender;
}
function getInfoFromScreen() {
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var mail = document.getElementById("mail").value;
    var gender = document.getElementById("gender").value;
    
    var newContact=ContactInfo(name,phone,mail,gender);
    return newContact;
}

// save new contact in array
function addContact() {
    var newContact=getInfo();
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
}






//Fares
