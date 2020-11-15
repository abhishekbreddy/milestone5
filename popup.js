var matchArr = [];

function getMatches(){
    fetch("https://cricapi.com/api/matchCalendar?apikey=gGh6Nrw4d1NYAWlG7gakwUQbGwk2")
        .then(
            function(response) {
                if(response.status !== 200) {
                    console.log("error");
                    return;
                }
                else{
                    response.json().then(
                        function(data){
                            
                            for(i=0;i<10;i++){
                                if(data.data[i].unique_id.startsWith("w")){
                                    
                                }
                                else{
                                    matchArr.push(
                                        data.data[i]
                                    )
                                }
                            }
                            if(matchArr.length != 0){
                                matchArr.forEach(element => {
                                    let newOption = document.createElement('option');
                                    newOption.innerText = element.name;
                                    document.getElementById("exampleFormControlSelect1").appendChild(newOption);
                                }); 
                            }
                        }
                    )
                }
            }
        )
}

function getUniqueId(anyText){
    matchArr.forEach(element => {
        if(element.name == anyText){
            fetch("https://cricapi.com/api/cricketScore?apikey=gGh6Nrw4d1NYAWlG7gakwUQbGwk2&unique_id="+element.unique_id)
                .then(
                    function(response){
                        if(response.status !== 200){
                            return;
                        }
                        else{
                            response.json().then(
                                function(data){
                                    alert(data.stat);
                                }
                            )
                        }
                    }
                )
        }
    })
}

window.onload = getMatches();

document.getElementById("formConfirm").addEventListener("click",function(e){
    e.preventDefault();
    var a = document.getElementById('exampleFormControlSelect1');
    getUniqueId(a.options[a.selectedIndex].value);
})