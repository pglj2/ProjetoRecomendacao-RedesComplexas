d3.csv("./data/user_venues_ids.csv", (data => {
 
    var dados = data.map(e => {
        return {
            uIdCheckin: e["UserId"],
            venueId: e["VenueId"],
            tags: e["Tags"],
        }
    });
    cleanData(dados)
    //console.log(dados)
}));
 
var a = [{}];
var invalid = 'none None "" unknown';
 
var keys = ["uIdCheckin", "venueId", "tags"];
var cont = 0;
var resp = [];
var lin;
var users = [];
var temp,temp1, temp2;
var stringAux, stringAux2;

function cleanData(data){
    data.forEach(e => {
        var aux = 0;
        for(var i = 0 ; i < keys.length ; i++){
            if(e[keys[i]] == ""){
                aux++;
                if(aux>0) break;
            }

            // if((keys[i] == "tags") /*&& ((e[keys[i]].includes("bar,")) ||(e[keys[i]].includes("bar\\")) )*/){
            //     //cont++;
            //     lin = e[keys[i]].split(",");
            //         for(var j = 0; j < lin.length; j++){
            //             if(!resp.includes(lin[i]) && (lin[i] != undefined) && (lin[i] != ""))
            //             resp.push(lin[i]);
            //         }
            // }

            if(keys[i] == "uIdCheckin"){
                stringAux = e[keys[i]];
                stringAux = stringAux.substr(1, stringAux.length - 2); 
            }
            if(keys[i] == "venueId"){
                stringAux2 = e[keys[i]];
                stringAux2 = stringAux2.substr(1,stringAux2.length - 2);
                lin =  stringAux2.split(",");
                lin = removeDuplicatas(lin);
                temp = {Id: stringAux , venuesId: lin };
                users.push(temp);
            }


        }

        if(aux<=0)a.push(e);
    });

    console.log(resp);
    console.log(users);
    console.log(users[1].Id);
    console.log(users[1].venuesId);

}

function buscarUsuario(id_usuario) {
    var id = id_usuario.toString();
    var usuario;
    var locais; //array
    
    for(var i = 0; i < users.length; i++){
        if(users[i].Id == id){

            usuario = id;
            locais = users[i].venuesId;
            
        }
    }
        console.log("oi "+ usuario);
        console.log("seuas locais são :"+ locais);        

        recomendarLocal(usuario, locais);
}

function requestFourSquare(){
//https://api.foursquare.com/v2/venues/177?client_id=DSFNN45CHZ1XUCDT3XQWPS5GCPF34SBE0TQ1RXD4WSURZXA2&client_secret=KMEVLN5HTNEBNVU0MARJL2FZAAR1ETEJBXRLD1522CT4G5NZ&v=20180622
var str = "https://api.foursquare.com/v2/venues/" + venue + "?client_id=DSFNN45CHZ1XUCDT3XQWPS5GCPF34SBE0TQ1RXD4WSURZXA2&client_secret=KMEVLN5HTNEBNVU0MARJL2FZAAR1ETEJBXRLD1522CT4G5NZ&v=20180622";

window.location.href = str;
}


function removeDuplicatas(arry){
	var vistos = {};
	return arry.filter(function(item){
		return vistos.hasOwnProperty(item) ? false:(vistos[item]=true);
	});
}