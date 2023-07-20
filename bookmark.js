//~ Get Elements
var siteName = document.getElementById('siteName')
var siteUrl = document.getElementById('siteUrl')
var urlName = document.getElementById('urlName')
var sumbitBtn = document.getElementById('mainBtn')
var visitDelete = document.getElementById('visitDelete')
var nameError = document.getElementById('nameError')
var urlError = document.getElementById('urlError')



// Variables
var dataArr ;
var box;




//! Functions
(function () {
    if (localStorage.getItem("name&url") == null) {
        dataArr = [];
    }
    else {
        dataArr = JSON.parse(localStorage.getItem("name&url"));
        console.log(dataArr);
        display(dataArr)
    }
})();



function showVisitdelete() {
    visitDelete.classList.remove('d-none')
    visitDelete.classList.add('d-flex')
    addUrl()
}


function addUrl() {
    if (siteNameregex() && siteUrlregex() ) {
        clearError()
        var dataObj = {
            sName: siteName.value,
            sUrl: siteUrl.value
        };
        dataArr.push(dataObj)
        localStorage.setItem("name&url", JSON.stringify(dataArr))
        display(dataArr)
        clearData()
    }
}

function display(arr) {
    box = "";
    for (var i = 0; i < arr.length; i++) {
        box += `
        <h2 id="urlName" class="">${arr[i].sName}</h2>
        <a  href="${arr[i].sUrl}" class="btn btn-primary" target="_blank" onclick='visitUrl(${arr[i].sUrl})'>visit</a>
        <button  class="btn btn-danger btndelete" onclick="deleteUrl(${i})">Delete</button> 
        `;
    }
    visitDelete.innerHTML = box

}

function clearData() {
    siteName.value = "";
    siteUrl.value = "";
}


function deleteUrl(index) {
    dataArr.splice(index, 1);
    localStorage.setItem("name&url", JSON.stringify(dataArr));
    display(dataArr);
}


function siteNameregex() {
    var regex = /^(?!\s*$).+/;
    if (regex.test(siteName.value)) {
        return true
    }
    else {
        nameError.classList.remove('d-none')
        nameError.classList.add('d-flex')
        nameError.innerHTML = "Name is required"
        nameError.classList.add('justify-content-center')
        return false;
    }
}


function siteUrlregex() {
    var regex = /^(?!\s*$).+/;
    if (regex.test(siteUrl.value)) {
        return true
    }
    else {
        urlError.classList.remove('d-none')
        urlError.classList.add('d-flex')
        urlError.innerHTML = "Url Field is required"
        urlError.classList.add('justify-content-center')
        return false;
    }
}

function clearError() {
    nameError.classList.remove('d-flex')
    nameError.classList.add('d-none')
    urlError.classList.remove('d-flex')
    urlError.classList.add('d-none')
}

function siteNameisexist(name) {
    for (var i = 0; i < dataArr.length; i++) {
        if (dataArr[i].sName == name) {
            nameError.classList.remove('d-none')
            nameError.classList.add('d-flex')
            nameError.innerHTML = "this url already exist"
            nameError.classList.add('justify-content-center')
            return false;
        }
        else return true;
    }
}



// Events
sumbitBtn.addEventListener('click', showVisitdelete)
document.body.addEventListener('keyup',function(e) {
    if (e.key=='Enter'){
        showVisitdelete()
    }
})
