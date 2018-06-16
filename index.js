d3.csv("./data/dataset.csv", (data => {
 
    var dados = data.map(e => {
        return {
            uIdCheckin: e["User ID_checkin"],
            venueId: e["Venue ID"],
            tags: e["Tags"],
            uIdCommenter: e["User ID_commenter"],
            comment: e["Comment"],
        }
    });
    cleanData(dados)
    //console.log(dados)
}));
 
var a = [{}];
var invalid = 'none None "" unknown';
 
var keys = ["uIdCheckin", "venueId", "tags", "uIdCommenter", "comment"];
var cont = 0;
function cleanData(data){
    data.forEach(e => {
        var aux = 0;
        for(var i = 0 ; i < keys.length ; i++){
            if(e[keys[i]] == ""){
                aux++;
                if(aux>0) break;
            }

            if((keys[i] == "tags") && ((e[keys[i]].includes("bar,")) ||(e[keys[i]].includes("bar\\")) )){
                cont++;
            }
        }
        if(aux<=0)a.push(e);
    });
    console.log(cont);
    console.log(a);
}