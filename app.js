
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
    searchByTraits(people, people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people);
    break;
  }
}

function searchByTraits(refinedPeople, people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'. Or type 'done' when completed.");
  let filteredPeople;

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(refinedPeople);
      break;
    case "weight":
      filteredPeople = searchByWeight(refinedPeople);
      break;
    case "eye color":
      filteredPeople =  searchByEyeColor(refinedPeople);
      break;
    case "gender":
      filteredPeople = searchByGender(refinedPeople);
      break;
    case "age":
      filteredPeople = searchByAge(refinedPeople);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(refinedPeople);
      break;
    case "id":
      filteredPeople = searchById(refinedPeople);
      break;
    case "done":
      mainMenu(refinedPeople, people);
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(refinedPeople, people);
      break;
  }
  if(filteredPeople.length === 0){
    searchByTraits(refinedPeople, people);
  }
  searchByTraits(filteredPeople, people);
}

function searchByHeight(people)
{
  let userInputHeight = parseFloat(prompt("How tall is the person?").trim());

  let newArray = people.filter(function (el) {
    if(el.height === userInputHeight) {
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
  let userInputWeight = parseFloat(prompt("How much does the person weigh?").trim());

  let newArray = people.filter(function (el) {
    if(el.weight === userInputWeight) {
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

function searchByGender(people)
{
  let userInputGender = prompt("What is the person's gender?").trim();

  return people.filter(function (el) {
    if(el.gender === userInputGender.toLowerCase()) {
      return true;
    }
  });
}

function searchByEyeColor(people)
{

  let userInputEyeColor = prompt("What is the person's Eye Color?").trim();

  return people.filter(function (el) {
    if(el.eyeColor === userInputEyeColor.toLowerCase()) {
      return true;
    }
  });
}

function searchByAge(people)
{//people -> person
  let ageArray = getAge(people);
  let newArray = [];
  let userInputAge = parseFloat(prompt("What is the person's age?").trim());
  for(let i = 0; i < ageArray.length; i++) {
      if (userInputAge === ageArray[i]){
        newArray.push(people[i]);
      }
  }
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

  return people.filter(function (el) {
    if(el.occupation === userInputOccupation.toLowerCase()) {
      return true;
    }
  });
}

function searchById(people)
{
  let userInputId = parseFloat(prompt("What is the person's Id number?"));

  let newArray = people.filter(function (el) {
    if(el.id === userInputId) {
      return true;
    }
  });
  return newArray[0];

}

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
      for(var property1 in person[i])
      {
        myStr += property1 + ': ' + ' ';
        myStr += person[i][property1] + ' ';
        myStr += '<br>';
      }

      document.getElementById(`${i}`).innerHTML = myStr;
      document.getElementById(`${i}`).hidden = false;
    }
  } 
  else {
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  let myArr = [];
  myArr.push(person);
  
  switch(displayOption){
    case "info":
      let myObj = '';
      for(var property1 in person)
      {
        myObj += property1 + ': ' + ' ';
        myObj += person[property1] + '\n';
      }
      alert(myObj);
    break;
    case "family":
    let familyArr = family(person, people, myArr);
    let reducedArr = reduceArry(people, familyArr);
    if(reducedArr[0] === '')
    {
        alert(`${person.firstName} ${person.lastName} is lonely and does not have a family.`)
    }
    else
    {
        for(let i = 0; i < reducedArr.length; i++)
        {
            document.getElementById(`${i}`).innerHTML = `${reducedArr[i].firstName} ${reducedArr[i].lastName}`;
        }
    }
    break;
    case "descendants":
    descendants(myArr[0], people, myArr);
    if(myArr[0] === '')
    {
        alert(`${person.firstName} ${person.lastName} does not have any descendants.`)
    }
    else
    {
        for(let i = 0; i < myArr.length; i++)
        {
            document.getElementById(`${i}`).innerHTML = `${myArr[i + 1].firstName} ${myArr[i + 1].lastName}`;
        }
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

function getObjectFromId(id, people)
{
    for(let i = 0; i < people.length; i++)
    {
        if(id === people[i].id)
        {
            return people[i];
        }
    }
}

function descendants(person, people, myArr)
{
    //loop through everyone in the data.js array and search for descendants
    for(let i = 0; i < people.length; i++)
    {
        if (person.id === people[i].parents[0] || person.id === people[i].parents[1])
        {
            myArr.push(people[i]);
            descendants(people[i], people, myArr);
        }
    }
}

function ascendants(person, people)
{

    let parents = [];
    for(let i = 0; i < people.length; i++)
    {
        if(person.id === people[i].parents[0] || person.id === people[i].parents[1])
        {
            parents.push(getObjectFromId(people[i].parents[0], people));
            parents.push(getObjectFromId(people[i].parents[1], people));
        }
    }
    return parents;
}

function ourDescendants(person, people)
{

    let children = people.filter(function(el){
        if(person.id === el.parents[0] || person.id === el.parents[1])
        {
            return true;
        }
    });
    let newArr = [];
    for(let i = 0; i < children.length; i++)
    {
        newArr.push(getObjectFromId(children[i], people));
    }
    return children;
}

function family(person, people, myArr)
{
    let curArr = [];
    let familyFound = findFamily(person, people, myArr);
    let foundFamily =curArr.concat(familyFound);
    let resultArr = curArr.concat(familyWeb(person, people, foundFamily));
    return resultArr.concat(foundFamily);
}

function findFamily(person, people, myArr)
{
    let parents = ascendants(person, people);
        let parentsArr = myArr.concat(parents);
    let children = ourDescendants(person, people);
        let childrenArr = myArr.concat(children);
    return parentsArr.concat(childrenArr);
}

function familyWeb(person, people, myArr)
{
    let resultArr = [];
    let curArr = [];
    for(let i = 0; i < myArr.length; i++)
    {
        resultArr = curArr.concat(findFamily(myArr[i], people, myArr));
    }
    return resultArr;
}

function reduceArry (people, myArr)
{
    let resultArr = [];
    for(let i = 0; i < myArr.length; i++)
    {
        if(!resultArr.includes(myArr[i])){
            resultArr.push(myArr[i]);
        }
    }
   return resultArr;
}

function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}

function chars(){
  return true;
}
