//this file holds all of the functions for the website.  This way I don't have to keep copyig and pasting


/////////////////////////////////////////////////
//most common functions across signIn and admin Pages

//functions to find/check for the student's information
var checkForDoubles = function(arr, name){//checks to see if more than one person w/ same firstname
    let counter = 0;
    for(let i=0; i<arr.length; i++){
        if(isEqualTo(name, arr[i].firstName)){
            counter++;
        }
    }
    if(counter > 1){ //if more than one person w/ same name - return true
        return true;
    } else{//if not thats fine
        return false;
    }
}

var findPerson = function(arr, name, lN){//finds student's object
    if(arr){
        if(lN){//if last name is provided, also check for last names
            for(let i=0; i<arr.length; i++){
                if(isEqualTo(name, arr[i].firstName) && isEqualTo(lN, arr[i].lastName)){
                    return arr[i];
                }
            }
        } else if(!lN && checkForDoubles(arr, name)){//no last name included and more than one person w/ same name
            alert("There are more than one person with the name "+ name+" so please enter your last name. Thank you");
            return null;
        }else{//no last name given and no doubles therefore can just look for the person
            for(let i=0; i<arr.length; i++){
                if(isEqualTo(name, arr[i].firstName)){
                    return arr[i];
                }
            }
        }
        alertMessage = "We couldn't find your name. Please check for spelling errors or create a new user, thank you";
    }else{
        console.log("error: array not defined");
    }                    
    return null;
}

var isEqualTo = function(val1, val2){ // this can be used to compare lowercased strings
    if(val1.toLowerCase() === val2.toLowerCase()){
        return true;
    } else{
        return false;
    }
}

var retrieveVal = function(id){//get the values from input bars
    return document.getElementById(id).value;
}

/////////////////////////////////////////////
//function specific to admin.html

var checkUser = function(arr, name, pass){
    if(arr){
        for(let i=0; i<arr.length; i++){
            if(isEqualTo(name, arr[i].firstName) && Number(pass) === arr[i].number){

                if(arr[i].admin){
                    return true;
                }else{
                    alert("Sorry, you are not an administrator. Go to regular sign in, thank you.");
                    return false;
                }
                
            }
        }
        alert("Either your username or password is incorrect. Please check for spelling or go to regular sign in.");
        return false;
    }
}

/////////////////////////////////////////////////
//Function specific to making a new admin (adminPage.html)
var checkPositions = function(posArr, pos){
    for(let i=0; i<posArr.length; i++){
        if(isEqualTo(posArr[i], pos)){
            return true;
        }
    }
    return false;
}

/////////////////////////////////////////////////
//functions for local storage

var retrieveLocalStorage = function(key){//get array from the local storage
    return JSON.parse(localStorage.getItem(key));
}

var updateLocalStorage = function(key, val){
    //if local storage has the key - remove that item from local storage (so not saving multiple copies)
    if(localStorage.getItem(key)){
        localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(val));
}