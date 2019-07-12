//this file holds all of the functions for the website.  This way I don't have to keep copyig and pasting


/////////////////////////////////////////////////
//most common functions across signIn and admin Pages

//functions to find/check for the student's information
var checkForDoubles = function(arr, name){//checks to see if more than one person w/ same firstname
    let counter = 0;
    for(let i=0; i<arr.length; i++){
        if(arr[i] && isEqualTo(name, arr[i].firstName)){//make sure arr[i] is defined
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
                if(arr[i] && isEqualTo(name, arr[i].firstName) && isEqualTo(lN, arr[i].lastName)){//make sure arr[i] is defined
                    return arr[i];
                }
            }
        } else if(!lN && checkForDoubles(arr, name)){//no last name included and more than one person w/ same name
            alert("There are more than one person with the name "+ name+" so please enter your last name. Thank you");
            return null;
        }else{//no last name given and no doubles therefore can just look for the person
            for(let i=0; i<arr.length; i++){
                if(arr[i] && isEqualTo(name, arr[i].firstName)){//make sure arr[i] is defined
                    return arr[i];
                }
            }
        }
        //alertMessage = "We couldn't find your name. Please check for spelling errors or create a new user, thank you";
        return 0;//return 0 to differentiate between no user and double users
    }               
    
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

var each = function(arr, func){
    for(var i=0; i<arr.length; i++){
        func(arr[i], i, arr);
    }
}

var findNullValIndex = function(arr){
    let i = -1;
    each(arr, function(val, index){
        if(val === null || val === undefined){
            i = index;
            return index;
        }
    });
    return i;
}

function clearInputField(inputField){
    document.getElementById(inputField).value = "";
}

function numFix(val, toFix){
    return Number(val.toFixed(toFix));
}

/////////////////////////////////////////////
//function specific to newUser.html

var checkForDoubleUsers = function(arr, fN, mI, lN){
    let toReturn = false;
    each(arr, function(obj, index){
        if(obj){
            let p = obj;
            //if there's a user w/ exact same name assume that it's an accidental copy
            if(isEqualTo(p.firstName, fN) && isEqualTo(p.lastName, lN) && isEqualTo(p.midInit, mI)){
                toReturn = true;
                return true;
            }
        }
    });
    return toReturn;
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