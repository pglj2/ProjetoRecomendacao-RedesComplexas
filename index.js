d3.csv("./data/dataset.csv", (data => {
 
    var dados = data.map(e => {
        return {
            uIdCheckin: e["User_Id"],
            venueId: e["Venues_Id"],
            tagBar: e["Bar"],
            tagBurguer: e["Burguer"]
        }
    });
    //cleanData(dados)
    console.log(dados);
}));
 
var a = [{}];
var invalid = 'none None "" unknown';
var lin;
var resp = [{}]; 
var keys = ["uIdCheckin", "venueId", "tagBar","tagBurguer"];
var cont = 0;
function cleanData(data){
    data.forEach(e => {
        var aux = 0;
        for(var i = 0 ; i < keys.length ; i++){
            if(e[keys[i]] == ""){
                aux++;
                if(aux>0) break;
            }
            if((keys[i] == "tagBar") /*&& ((e[keys[i]].includes("bar,")) ||(e[keys[i]].includes("bar\\")) )*/){
                //cont++;
                lin = e[keys[i]].split(",");
                    for(var j = 0; j < lin.length; j++){
                        if(!resp.includes(lin[i]) && (lin[i] != undefined) && (lin[i] != ""))
                        resp.push(lin[i]);
                    }
            }
            /*if((keys[i] == "tags") && ((e[keys[i]].includes("bar,")) ||(e[keys[i]].includes("bar\\")) )){
                cont++;
            }*/
        }
        if(aux<=0)a.push(e);
    });
    console.log(cont);
    console.log(a);
}