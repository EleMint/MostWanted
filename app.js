/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  for(let i = 0; i < 13; i++){
    document.getElementById(`${i}`).innerHTML = '';
  }
  switch(searchType){
    case 'yes':
    let foundPerson = searchByName(people);
    mainMenu(foundPerson, people);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people);
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
      filteredPeople =  searchByEyeColor(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    case "age":
      filteredPeople = searchByAge(people);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      break;
    case "id":
      filteredPeople = searchById(people);
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  
  let foundPerson = filteredPeople;

  mainMenu(foundPerson, people);

}

function searchByHeight(people)
{
  let userInputHeight = prompt("How tall is the person?").trim();

  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      console.log(el.height);
      return true;
    }
  });
  if (newArray.length > 1) 
  {
  return newArray;
  }
  else 
  return newArray[0];
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?").trim();

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
  });
  console.log(newArray);
  if (newArray.length > 1) 
  {
  return newArray;
  }
  else 
  return newArray[0];
}

function searchByGender(people)
{
  let userInputGender = prompt("What is the person's gender?").trim();

  let newArray = people.filter(function (el) {
    if(el.gender === userInputGender.toLowerCase()) {
      return true;
    }
  });
  return newArray;
}


function searchByEyeColor(people)
{

  let userInputEyeColor = prompt("What is the person's Eye Color?").trim();

  let newArray = people.filter(function (el) {
    if(el.eyeColor === userInputEyeColor.toLowerCase()) {
      return true;
    }
  });
  return newArray;

}

function searchByAge(people)
{//people -> person
  let ageArray = getAge(people);
  console.log(ageArray);
  let newArray = [];
  let userInputAge = parseFloat(prompt("What is the person's age?").trim());
  for(let i = 0; i < ageArray.length; i++) {
      if (userInputAge === ageArray[i]){
        newArray.push(people[i]);
        console.log(people[i]);
      }
  }
  console.log(newArray);
    return newArray;
}

function getAge(people){
  let curDate = Date();
  let currentDate = curDate.split(' ');
  let neededParts = [];
  switch(currentDate[1]) {
      case "Jan":
          neededParts.push('1');
          break;
      case "Feb":
          neededParts.push('2');
          break;
      case "Mar":
          neededParts.push('3');
          break;
      case "Apr":
          neededParts.push('4');
          break;
      case "May":
          neededParts.push('5');
          break;
      case "Jun":
          neededParts.push('6');
          break;
      case "Jul":
          neededParts.push('7');
          break;
      case "Aug":
          neededParts.push('8');
          break;
      case "Sep":
          neededParts.push('9');
          break;
      case "Oct":
          neededParts.push('10');
          break;
      case "Nov":
          neededParts.push('11');
          break;
      case "Dec":
          neededParts.push('12');
          break;
  }
  neededParts.push(currentDate[2], currentDate[3]);
  let ageArray = [];
  for(let i = 0; i < people.length; i++){
    let personDOB = people[i].dob.split("/");
    let ageY = neededParts[2] - personDOB[2];
    let ageM = neededParts[0] - personDOB[0];
    let ageD = neededParts[1] - personDOB[1];
    if((ageM < 0 || ageM === 0) && (ageD < 0 || ageD === 0) ){
     ageY--;
    }
    ageArray.push(ageY);
  }
  return ageArray;
}


function searchByOccupation(people)
{
  let userInputOccupation = prompt("What is the person's occupation?").trim();

  let newArray = people.filter(function (el) {
    if(el.occupation === userInputOccupation.toLowerCase()) {
      return true;
    }
  });
  return newArray;
}

function searchById(people)
{
  let userInputId = prompt("What is the person's Id number?");

  let newArray = people.filter(function (el) {
    if(el.id == userInputId) {
      console.log(el.id);
      return true;
    }
  });
  return newArray[0];

}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  if(person.length > 1)
  {
    for(let i = 0; i < person.length; i++)
    {
      let myStr = "";
      console.log(person[i].firstName, person[i].lastName);
      for(var property1 in person[i])
      {
        myStr += property1 + ': ' + ' ';
        myStr += person[i][property1] + ' ';
        console.log(person[i][property1]);
        myStr += '<br>';
      }

      document.getElementById(`${i}`).innerHTML = myStr;
      document.getElementById(`${i}`).hidden = false;
    }
  } 
  else {
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      let myObj = '';
      for(var property1 in person)
      {
        myObj += property1 + ': ' + ' ';
        myObj += person[property1] + '\n';
      };
      alert(myObj);
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    let myStr = "";
    let something = descendants(person, people, myStr);
    if(something === '')
    {
        alert(`${person.firstName} ${person.lastName} does not have any descendants.`)
    }
    else
    {
        alert(`${person.firstName} ${person.lastName} has descendants of: \n${something}`)
    }
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
}

function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);
    let newArray = people.filter(function (el) {
        if (el.firstName.toLowerCase() === firstName.toLowerCase() && el.lastName.toLowerCase() === lastName.toLowerCase()) {
            return true;
        }
    });
    return newArray[0];
}



function descendants(person, people, myStr)
{
 //create var for children of origin person

 for(let i = 0; i < people.length; i++) {      //looping through all people and add id # for child of original person
     if (person.id === people[i].parents[0] || person.id === people[i].parents[1]) {
         myStr += people[i].firstName.toString() + ' ';
         myStr += people[i].lastName.toString() + '  ';
         descendants(people[i], people, myStr);
         //end of search for person parent
         // if(i === people.length)
         //create var for grandchildren of origin person
         // {
         //  //loop through people to find siblings
         //     for (let j = 0; j < people.length; j++)
         //     {
         //         if (people[i].parents[0] === people[j].parents[0] || people[i].parents[0] === people[j].parents[1] || people[i].parents[1] == people[j].parents[0] || people[i].parents[1] == people[j].parents[1])
         //         {
         //
         //             myStr += people[j].id.toString();
         //             //search for grandchildren from siblings
         //             descendants(people[j]);
         //         }
         //     }
         // }
     }
 }
 return myStr;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
