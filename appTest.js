/*function descendants(person, people, myStr)
{
    //create var for children of origin person

    for(let i = 0; i < people.length; i++) {      //looping through all people and add id # for child of original person
        if (person.id === people[i].parents[0] || person.id === people[i].parents[1]) {
            myStr += people[i].firstName.toString() + ' ';
            myStr += people[i].lastName.toString() + '  ';
            descendants(people[i], people, myStr);
            //TODO: Push people[i].NAMES to a new array and search form the array instead of a String.
            //Can use string and make array with split('  ') because myStr is 'firstName 1 space lastName 2 spaces firstName 1 space lastName'
            //Then check and add all the children of origin person for children
        }
    }
    return myStr;
}*/

/*
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
}*/
