// var dataStringify = JSON.stringify(data,null,2);
var trList = []
var filterParty = []
var allStates = []
var filterState = ''

var checkboxes = document.querySelectorAll("input[type=checkbox]");
checkboxes.forEach(checkbox => {
    checkbox.addEventListener( 'change', function(e) {
        console.log(event)
        if(this.checked) {
            filterParty.push(this.value)
            // Checkbox is checked..
        } else {
            filterParty.splice(filterParty.indexOf(this.value),1)
            // Checkbox is not checked..
        }
        loadDataFunction();
    });
})
document.getElementById("states").innerHTML = `<option value=""></option>`
document.getElementById("states").addEventListener( 'change', function(e) {
    console.log(event)
    debugger
    filterState = this.value;
    loadDataFunction();
});
                

const fillStateOptions = (state) => {
    if(!allStates.includes(state)){
        allStates.push(state)
        var option = 
        `<option value="${state}">${state}</option>`;
        document.getElementById("states").innerHTML += option
    }
}

const loadDataFunction = () =>{
    document.getElementById("tbody").innerHTML = ''
    debugger
    data.results.forEach(result => {
        let members = result.members;
        if(filterParty.length > 0) members = members.filter(member => filterParty.includes(member.party))
        if(filterState.length > 0) members = members.filter(member => filterState.includes(member.state))
        members.forEach((element,i) => {
            fillStateOptions(element.state);
            var senate = {
                url: element.url,
                fullName : `${element.first_name ? `${element.first_name} ` : ``}${element.middle_name ? `${element.middle_name} ` : ``}${element.last_name ? `${element.last_name} ` : ``}`,
                party : element.party,
                state : element.state,
                seniority : element.seniority,
                percentage : `${element.votes_with_party_pct}%`,
            };
            var trString = `<tr scope="row">
                <td><a href="${senate.url}">${senate.fullName}</a></td>
                <td>${senate.state}</td>
                <td>${senate.seniority}</td>
                <td>${senate.party}</td>
                <td>${senate.percentage}</td>
            </tr>`;
            document.getElementById("tbody").innerHTML += trString
        });
    });
}
loadDataFunction()
