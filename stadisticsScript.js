const statisticsData = {
    data : {
        D: {
            quantity:0,
            percVotedWPartyQuantity:0,
            avgVoted:0,
        },
        R: {
            quantity:0,
            percVotedWPartyQuantity:0,
            avgVoted:0,
        },
        I:{
            quantity:0,
            percVotedWPartyQuantity:0,
            avgVoted:0,
        },
        T:{
            quantity:0,
            percVotedWPartyQuantity:0,
            avgVoted:0,
            mostEngaged:[],
            leastEngaged:[],
            mostLoyal:[],
            leastLoyal:[]
        }
    }
}

const loadDataFunction = () =>{
    data.results.forEach(result => {
        let members = result.members;
        statisticsData.data.T.quantity = members.length;

        let votes = []
        members.forEach((element,i) => {
            statisticsData.data.T.percVotedWPartyQuantity += element.votes_with_party_pct
            var senate = {
                fullName : `${element.first_name ? `${element.first_name} ` : ``}${element.middle_name ? `${element.middle_name} ` : ``}${element.last_name ? `${element.last_name} ` : ``}`,
                party : element.party,
                percentage : element.votes_with_party_pct,
                missedVotes : element.missed_votes
            };


            console.log(element.party)
            switch (element.party) {
                case 'D':
                    statisticsData.data.D.quantity++
                    statisticsData.data.D.percVotedWPartyQuantity += element.votes_with_party_pct
                    break;
                case 'R':
                    statisticsData.data.R.quantity++
                    statisticsData.data.R.percVotedWPartyQuantity += element.votes_with_party_pct
                    break;
                case 'ID':
                    statisticsData.data.I.quantity++
                    statisticsData.data.I.percVotedWPartyQuantity += element.votes_with_party_pct
                break;
                default:
                    break;
            }
            
            votes.push({quantity:element.missed_votes, partyPct: element.votes_with_party_pct, partyVotes: Math.round(element.total_votes * element.votes_with_party_pct / 100),name:senate.fullName, votesWParty: element.missed_votes_pct})

            
            
        });

        let tPer = Math.ceil(statisticsData.data.T.quantity * 0.1)

        statisticsData.data.D.avgVoted = (statisticsData.data.D.percVotedWPartyQuantity / statisticsData.data.D.quantity) || 0
        statisticsData.data.R.avgVoted = (statisticsData.data.R.percVotedWPartyQuantity / statisticsData.data.R.quantity) || 0
        statisticsData.data.I.avgVoted = (statisticsData.data.I.percVotedWPartyQuantity / statisticsData.data.I.quantity) || 0
        statisticsData.data.T.avgVoted = (statisticsData.data.T.percVotedWPartyQuantity / statisticsData.data.T.quantity) || 0
        
        votes.sort((a, b) => b.votesWParty - a.votesWParty);
        statisticsData.data.T.leastEngaged = votes.slice(0,tPer)
        statisticsData.data.T.mostEngaged = votes.slice(Math.ceil(votes.length - tPer, 0))
        statisticsData.data.T.mostEngaged.sort((a, b) => a.votesWParty - b.votesWParty);

        votes.sort((a, b) => b.partyPct - a.partyPct);
        statisticsData.data.T.mostLoyal = votes.slice(0,tPer)
        statisticsData.data.T.leastLoyal = votes.slice(Math.ceil(votes.length - tPer, 0))
        statisticsData.data.T.leastLoyal.sort((a, b) => a.partyPct - b.partyPct);

      

    });
}

appendToHtml = () => {

    let trString;
    let tbodyLeastEngaged = document.getElementById("tbodyLeastEngaged");
    let tbodyMostEngaged = document.getElementById("tbodyMostEngaged");
    let tbodyLeastLoyal = document.getElementById("tbodyLeastLoyal");
    let tbodyMostLoyal = document.getElementById("tbodyMostLoyal");


    for (const key in statisticsData.data) {
        trString = 
        `<tr scope="row">
            <td>${key}</td>
            <td>${statisticsData.data[key].quantity}</td>
            <td>${statisticsData.data[key].avgVoted.toFixed(2)}%</td>
        </tr>`;
        document.getElementById("tbodyGlance").innerHTML += trString
    }

    if(tbodyLeastEngaged){
        statisticsData.data.T.leastEngaged.forEach( x => {
            trString = 
            `<tr scope="row">
                <td>${x.name}</td>
                <td>${x.quantity}</td>
                <td>${x.votesWParty.toFixed(2)}%</td>
             </tr>`;
            document.getElementById("tbodyLeastEngaged").innerHTML += trString
        })
    }
   
    if(tbodyMostEngaged){
        statisticsData.data.T.mostEngaged.forEach( x => {
            trString = 
            `<tr scope="row">
                <td>${x.name}</td>
                <td>${x.quantity}</td>
                <td>${x.votesWParty.toFixed(2)}%</td>
             </tr>`;
            document.getElementById("tbodyMostEngaged").innerHTML += trString
        })
    }

    if(tbodyLeastLoyal){
        statisticsData.data.T.leastLoyal.forEach( x => {
            trString = 
            `<tr scope="row">
                <td>${x.name}</td>
                <td>${x.partyVotes}</td>
                <td>${x.partyPct.toFixed(2)}%</td>
             </tr>`;
            document.getElementById("tbodyLeastLoyal").innerHTML += trString
        })
    }
    
    if(tbodyMostLoyal){
        statisticsData.data.T.mostLoyal.forEach( x => {
            trString = 
            `<tr scope="row">
                <td>${x.name}</td>
                <td>${x.partyVotes}</td>
                <td>${x.partyPct.toFixed(2)}%</td>
             </tr>`;
            document.getElementById("tbodyMostLoyal").innerHTML += trString
        })
    }
}

loadDataFunction()
appendToHtml()


console.log(statisticsData);