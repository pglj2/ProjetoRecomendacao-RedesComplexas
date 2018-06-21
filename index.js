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
var resp = [];
var lin;
var users = [];
var temp = [];

function cleanData(data){
    data.forEach(e => {
        var aux = 0;
        for(var i = 0 ; i < keys.length ; i++){
            if(e[keys[i]] == ""){
                aux++;
                if(aux>0) break;
            }

            if((keys[i] == "tags") /*&& ((e[keys[i]].includes("bar,")) ||(e[keys[i]].includes("bar\\")) )*/){
                //cont++;
                lin = e[keys[i]].split(",");
                    for(var j = 0; j < lin.length; j++){
                        if(!resp.includes(lin[i]) && (lin[i] != undefined) && (lin[i] != ""))
                        resp.push(lin[i]);
                    }
            }

            if(keys[i] == "uIdCheckin"){
                temp = e[keys[i]];
                if(!users.includes(temp)){
                    users.push(temp);
                }
            }

            

            
        }

        if(aux<=0)a.push(e);
    });

    // for( var i = 0; i < resp.length; i++){
    //     temp.push(Math.round(Math.random()));
    //     users.push(temp);
    // }
    //console.log(cont);
    console.log(resp);
    console.log(users);
    //console.log(a);

}

function pegarTipo(){
console.log(k);
}
