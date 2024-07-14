/// <reference types="../@types/jquery" />

let rowData = document.getElementById("rowData");
let instructionsDetails = document.getElementById("instructionsDetails");
let SearchInputs = document.getElementById("SearchInputs");




// loading
$(function() {
        searchByName("").then(function() {
            $('.loader').fadeOut(1000, function() {
                $('.loading').fadeOut(1000, function() {
                    $('body').css('overflow', 'visible')
                });
            })
        });

    })
    // open sideBar
function openNav() {
    $(".side-nav").animate({
        left: 0
    }, 500)

    $(".icon").removeClass("fa-align-justify");
    $(".icon").addClass("fa-x");

    // $(".links li").animate({
    //     top:0
    // },500)
    
    let count = 500;
    for (let i = 0; i < 5; i++) {
        count += 100;
        $(".links li").eq(i).animate({
            top: 0
        }, count)
    }
}

//close sideBar
function closeNav() {
    let navwidth = $(".side-nav .left-side").outerWidth()
    $(".side-nav").animate({
        left: -navwidth
    }, 500)

    $(".icon").addClass("fa-align-justify");
    $(".icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}
//func of icon open or close
$(".side-nav i.icon").on('click', function() {
    if ($(".side-nav").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }

})
$("#navSearch").on('click', function() {
    getDataBysearch();
    closeNav();
})
$("#navCategory").on('click', function() {
    GetCatgeories();
    closeNav();
})
$("#navArea").on('click', function() {
    GetArea();
    closeNav();
})
$("#navIngrad").on('click', function() {
    GetIngrediants();
    closeNav();
})
$("#navContact").on('click', function() {;
    Contact();
    closeNav();
})

closeNav()


async function searchByName(meal) {
    closeNav();
    rowData.innerHTML = "";
    instructionsDetails.innerHTML = "";

    $(".innerLoad").fadeIn(300);
    $(".loader").fadeIn(300);
    var data = [];
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
    response = await response.json()
    data = response.meals;
    displayMeals(data);


    $(".innerLoad").fadeOut(300);
    $(".loader").fadeOut(300);

}
async function searchByLetter(meal) {
    closeNav();
    rowData.innerHTML = "";
    instructionsDetails.innerHTML = "";

    $(".innerLoad").fadeIn(300);
    $(".loader").fadeIn(300);
    var data = [];
    if (meal == "") {
        meal = "e";
    }
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${meal}`);
    response = await response.json()
    data = response.meals;
    displayMeals(data);


    $(".innerLoad").fadeOut(300);
    $(".loader").fadeOut(300);

}

function displayMeals(data) {
    var cols = ``;
    for (var i = 0; i < data.length; i++) {
        cols += `
        <div class="col-md-5 col-lg-3   gy-4">
        <div class="meal" onclick="getMealsDetails(${data[i].idMeal})">
            <img  src="${data[i].strMealThumb}" alt="">
            <div class="layer">
                <h2>${data[i].strMeal}</h2>
            </div>
        </div>

    </div>
        `;

    }
    rowData.innerHTML = cols;
}
async function getMealsDetails(id) {
    closeNav();
    rowData.innerHTML = "";
    SearchInputs.innerHTML = "";
    $(".innerLoad").fadeIn(300);
    $(".loader").fadeIn(300);

    var data = [];
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    response = await response.json();
    data = response.meals[0];
    displayDetailsMeals(data);

    $(".innerLoad").fadeOut(500);
    $(".loader").fadeOut(500);


}

function displayDetailsMeals(meal) {
    let ingredients = ``;

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="list-unstyled">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",");
    if (!tags) tags = [];

    let myTags = ``;
    for (let i = 0; i < tags.length; i++) {
        myTags += `
        <span>${tags[i]}</span>
        `
    }
    let myDetails = `

    <div class="col-md-12 col-lg-4 px-3 leftinstructions">
                    <div class="imgInstructions">
                        <img src="${meal.strMealThumb}" class="w-100 rounded-2 overflow-hidden" alt="">
                    </div>
                    <h2>${meal.strMeal}</h2>
                </div>
                <div class=" col-md-12 col-lg-8 px-3 rightinstructions">
                    <h2 class="instructionsHead">Instructions</h2>
                    <p>${meal.strInstructions}</p>

                    <div class="dashed-line"></div>

                    <div class="instructionsDetails">
                        <h3><span>Area : </span>${meal.strArea}</h3>
                        <h3><span>Category : </span>${meal.strCategory}</h3>
                        <h3 class="recipes">Recipes : </h3>
                        <div>
                            <ul class="d-flex flex-wrap ps-0">
                               ${ingredients} 
                            </ul>
                        </div>

                        <h3 class="tags d-flex flex-wrap">Tags : ${myTags}</h3>


                        <div class="buttns mt-5">
                            <a target="_blank" href="${meal.strSource}" class="btn mybtn mx-1">Source</a>
                            <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                        </div>


                    </div>




                </div> `

                instructionsDetails.innerHTML = myDetails;

}
function getDataBysearch(){
    SearchInputs.innerHTML = `
    <div class="col-md-5 me-3">
    <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white no-shadow" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-5">
    <input  maxlength="1" onkeyup="searchByLetter(this.value)" class="form-control bg-transparent text-white no-shadow" type="text" placeholder="Search By First letter">
    </div>`
    rowData.innerHTML = '';
    instructionsDetails.innerHTML = '';


}

function displayCategory(data) {
    var cols = ``;
    for (var i = 0; i < data.length; i++) {
        cols += `
        <div class="col-md-6 col-lg-3  gy-4">
        <div class="meal" onclick="GetCategoriesMeals('${data[i].strCategory}')">
            <img  src="${data[i].strCategoryThumb}" alt="">
            <div class="layer">
                <h2>${data[i].strCategory}</h2>
                <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>

            </div>
        </div>

    </div>
        `;

    }
    rowData.innerHTML = cols;
}
async function GetCatgeories() {
    closeNav();
    rowData.innerHTML = "";
    instructionsDetails.innerHTML = "";
    SearchInputs.innerHTML = "";


    $(".innerLoad").fadeIn(300);
    $(".loader").fadeIn(300);

    var data = [];
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    response = await response.json()
    data = response.categories;
    displayCategory(data);


    $(".innerLoad").fadeOut(300);
    $(".loader").fadeOut(300);

}
async function GetCategoriesMeals(CatMeal) {
    closeNav();
    rowData.innerHTML = "";
    instructionsDetails.innerHTML = "";
    SearchInputs.innerHTML = "";


    $(".innerLoad").fadeIn(300);
    $(".loader").fadeIn(300);

    var data = [];
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${CatMeal}`);
    response = await response.json()
    data = response.meals.slice(0,20);
    displayMeals(data);


    $(".innerLoad").fadeOut(300);
    $(".loader").fadeOut(300);

}
async function GetArea() {
    closeNav();
    rowData.innerHTML = "";
    instructionsDetails.innerHTML = "";
    SearchInputs.innerHTML = "";


    $(".innerLoad").fadeIn(300);
    $(".loader").fadeIn(300);

    var data = [];
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    response = await response.json()
    data = response.meals;
    displayArea(data);


    $(".innerLoad").fadeOut(300);
    $(".loader").fadeOut(300);

}
function displayArea(data){
    var cols = ``;
    for (var i = 0; i < data.length; i++) {
        cols += `
        <div onclick="GetAreaMeals('${data[i].strArea}')"  class="myArea col-3  d-flex justify-content-center align-items-center flex-column pb-4">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                    </div>
        `;

    }
    rowData.innerHTML = cols;
}
async function GetAreaMeals(AreaMeal) {
    closeNav();
    rowData.innerHTML = "";
    instructionsDetails.innerHTML = "";
    SearchInputs.innerHTML = "";


    $(".innerLoad").fadeIn(500);
    $(".loader").fadeIn(500);

    var data = [];
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${AreaMeal}`);
    response = await response.json()
    data = response.meals.slice(0,20);

    displayMeals(data);


    $(".innerLoad").fadeOut(500);
    $(".loader").fadeOut(500);

}

async function GetIngrediants() {
    closeNav();
    rowData.innerHTML = "";
    instructionsDetails.innerHTML = "";
    SearchInputs.innerHTML = "";


    $(".innerLoad").fadeIn(300);
    $(".loader").fadeIn(300);

    var data = [];
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response = await response.json();
    data = response.meals.slice(0,20);
    displayIngrediant(data);


    $(".innerLoad").fadeOut(300);
    $(".loader").fadeOut(300);

}
function displayIngrediant(data){
    var cols = ``;
    for (var i = 0; i < data.length; i++) {
        cols += `
        <div onclick="GetIngradientMeals('${data[i].strIngredient}')" class="myIngred col-3  d-flex justify-content-center align-items-center flex-column pb-5">
                        <i class="fa-solid ingredIcon fa-utensils"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
        `;

    }
    rowData.innerHTML = cols;
}

async function GetIngradientMeals(IngradientMeals) {
    closeNav();
    rowData.innerHTML = "";
    instructionsDetails.innerHTML = "";
    SearchInputs.innerHTML = "";


    $(".innerLoad").fadeIn(500);
    $(".loader").fadeIn(500);

    var data = [];
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngradientMeals}`);
    response = await response.json();
    data = response.meals.slice(0,20);

    displayMeals(data);


    $(".innerLoad").fadeOut(500);
    $(".loader").fadeOut(500);

}




let nameFocused = false;
let emailFocused = false;
let phoneFocused = false;
let ageFocused = false;
let passwordFocused = false;
let repasswordFocused = false;

function Contact() {

    instructionsDetails.innerHTML = "";
    SearchInputs.innerHTML = "";
    rowData.innerHTML = `
    <div class="contact d-flex justify-content-center align-items-center   flex-wrap pt-5">
                        <div class="col-sm-12 col-md-6 col-lg-5">
                            <div class="pt-4 px-2">
                                <label for="UserName"> <i class="fa-solid fa-user"></i> Name</label>
                                <input class="form-control" oninput="validationInputs()" type="text" id="UserName" placeholder="Enter Your Name">
                                <p class="d-none" id="nameValid">Special characters and numbers not allowed</p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-5">
                            <div class="pt-4 px-2">
                                <label for="UserEmail"><i class="fa-solid fa-envelope"></i> Email</label>
                                <input class="form-control" oninput="validationInputs()" type="email" id="UserEmail" placeholder="Enter Your Email">
                                <p class="d-none" id="emailValid">Email not valid *example@yyy.zzz </p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-5">
                            <div class="pt-4 px-2">
                                <label for="UserPhone"> <i class="fa-solid fa-mobile-screen"></i> Phone Number</label>
                                <input class="form-control" oninput="validationInputs()" type="tel" id="UserPhone" placeholder="Enter Your Phone">
                                <p class="d-none" id="phoneValid">Enter valid Phone Number</p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-5">
                            <div class="pt-4 px-2">
                                <label for="UserAge"><i class="fa-solid fa-bookmark"></i> Age</label>
                                <input class="form-control" oninput="validationInputs()" type="number" id="UserAge" placeholder="Enter Your Age">
                                <p class="d-none" id="ageValid">Enter valid age</p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-5">
                            <div class="pt-4 px-2">
                                <label for="UserPassword"> <i class="fa-solid fa-lock"></i> password</label>
                                <input class="form-control" oninput="validationInputs()" type="password" id="UserPassword" placeholder="Enter Password">
                                <p class="d-none" id="passwordValid">Enter valid password *Min 8 char, at least one letter and one num:*</p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-5">
                            <div class="pt-4 px-2">
                                <label for="UserRepassword"><i class="fa-solid fa-lock"></i> Repassword</label>
                                <input class="form-control" oninput="validationInputs()" type="password" id="UserRepassword" placeholder="Repassword">
                                <p class="d-none" id="repasswordValid">Password doesn't match</p>
                            </div>
                        </div>
                    </div>

                    <div class="buttn d-flex justify-content-center align-items-center flex-column pt-4">
                        <button onclick="clearForm()" id="myBtn" disabled class="btn btn-danger">SignUp</button>
                        
                    </div>


    `
    

    $(("#UserName")).on('focus', function() {
        nameFocused = true;
    })
    $(("#UserEmail")).on('focus', function() {
        emailFocused = true;
    })
    $(("#UserPhone")).on('focus', function() {
        phoneFocused = true;
    })
    $(("#UserAge")).on('focus', function() {
        ageFocused = true;
    })
    $(("#UserPassword")).on('focus', function() {
        passwordFocused = true;
    })
    $(("#UserRepassword")).on('focus', function() {
        repasswordFocused = true;
    })

    

}


function validationInputs() {
    
    let myBtn = document.getElementById("myBtn");

    if (nameFocused) {
        if (validationName()) {
            $(("#nameValid")).removeClass("d-block").addClass("d-none");
        } else {
            $(("#nameValid")).removeClass("d-none").addClass("d-block");
        }
    }
    if (emailFocused) {
        if (validationEmail()) {
            $(("#emailValid")).removeClass("d-block").addClass("d-none");
        } else {
            $(("#emailValid")).removeClass("d-none").addClass("d-block");
        }
    }
    if (phoneFocused) {
        if (validationPhoneNumber()) {
            $(("#phoneValid")).removeClass("d-block").addClass("d-none");
        } else {
            $(("#phoneValid")).removeClass("d-none").addClass("d-block");
        }
    }
    if (ageFocused) {
        if (validationAge()) {
            $(("#ageValid")).removeClass("d-block").addClass("d-none");
        } else {
            $(("#ageValid")).removeClass("d-none").addClass("d-block");
        }
    }
    if (passwordFocused) {
        if (validationPassword()) {
            $(("#passwordValid")).removeClass("d-block").addClass("d-none");
        } else {
            $(("#passwordValid")).removeClass("d-none").addClass("d-block");
        }
    }
    if (repasswordFocused) {
        if (validationRepassword()) {
            $(("#repasswordValid")).removeClass("d-block").addClass("d-none");
        } else {
            $(("#repasswordValid")).removeClass("d-none").addClass("d-block");
        }
    }
    

    if (validationName() && validationEmail() &&
        validationPhoneNumber() && validationAge() &&
        validationPassword() && validationRepassword()) {

        myBtn.removeAttribute("disabled")
    } else {
        myBtn.setAttribute("disabled", true)

    }
}

function validationName() {
    let UserName = document.getElementById("UserName");
    var text = UserName.value;
    var regexName = /^[a-zA-Z ]+$/;

    if (regexName.test(text)) {
        return true;
    } else {
        return false;
    }
}

function validationEmail() {
    let UserEmail = document.getElementById("UserEmail");
    var text = UserEmail.value;
    var regexName = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regexName.test(text)) {

        return true;
    } else {
        return false;
    }
}

function validationPhoneNumber() {
    let UserPhone = document.getElementById("UserPhone");

    var text = UserPhone.value;
    var regexName = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (regexName.test(text)) {

        return true;
    } else {

        return false;
    }
}

function validationAge() {
    let UserAge = document.getElementById("UserAge");

    var text = UserAge.value;
    var regexName = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;

    if (regexName.test(text)) {

        return true;
    } else {

        return false;
    }
}

function validationPassword() {
    let UserPassword = document.getElementById("UserPassword");

    var text = UserPassword.value;
    var regexName = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;

    if (regexName.test(text)) {

        return true;
    } else {

        return false;
    }
}

function validationRepassword() {
    let UserRepassword = document.getElementById("UserRepassword");
    let UserPassword = document.getElementById("UserPassword");
    var rePass = UserRepassword.value;
    var pass = UserPassword.value;

    if (rePass == pass) {

        return true;
    } else {

        return false;
    }
}

function clearForm(){
    UserName.value="";
    UserEmail.value="";
    UserPhone.value="";
    UserAge.value="";
    UserPassword.value="";
    UserRepassword.value="";
    myBtn.setAttribute("disabled", true);

}