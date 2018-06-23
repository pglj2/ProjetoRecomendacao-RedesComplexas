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
var usi = [];
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

    for(var i =0; i < 10; i++){
        usi.push(users[Math.floor((Math.random() * users.length))].Id);
    }

    $(document).ready(function(){
        var client_id = "DSFNN45CHZ1XUCDT3XQWPS5GCPF34SBE0TQ1RXD4WSURZXA2";
        var client_secret = "KMEVLN5HTNEBNVU0MARJL2FZAAR1ETEJBXRLD1522CT4G5NZ";
        var v = "20180623";
        var users_ids= usi;/*["93642","58758","121273","51957","204573","258400","44806","48997","80552","86519","22938","50631"];*/
        /*var linha = document.getElementById("random_users");
        linha = linha.children;
        var arryLinha = [].slice.call(linha);*/
        var aux = [];
        var t = false;
        var temp;
        function preencherGrid(identificador){
            var j=0;
            //console.log(arryLinha);
        //console.log(arryLinha[1]);
            for(i=0;i<5;i++){
                while(!t){
                    temp = Math.floor(Math.random()*(users_ids.length)-1);
                    if(!aux.includes(temp)){
                        aux.push(temp);
                        t = true;
                    } 
                }
                var atual = users_ids[temp];
                t = false;
                j = i+6;
                $.ajax({
                    url:'https://api.foursquare.com/v2/users/'+atual+'?client_id='+client_id+'&client_secret='+client_secret+'&v='+v,
                    type: 'GET'
                }).done(function(resultado){
                    //console.log(resultado);
                    var ibagem = document.createElement("IMG");
                    var widthIcon = "width200";
                    var foto = resultado.response.user.photo;
                    var linkFoto = foto.prefix + widthIcon + foto.suffix; 
                    ibagem.setAttribute('src',linkFoto);
                    ibagem.setAttribute('value',resultado.response.user.id);
                    console.log(ibagem);
                    if(identificador == "#random_users"){
                        $(identificador + "> #ru"+i).append(ibagem);
                    }else{
                        $(identificador+ " > #ru"+j).append(ibagem);
                    }
        
                    var teste = d3.selectAll("img");
                    console.log("test");
                    console.log(teste);
                }).fail(function(x,s,r){
                    console.log(r);
                });
            }   
        }
        preencherGrid("#random_users");
        preencherGrid("#random_users2");
        
        $("body").on('click','img',function(){
            console.log($(this).attr("value"));
            buscarUsuario($(this).attr("value"));
            /*pesquisar onde pega a lista de venues do usuario*/
        });

        });
    console.log(usi);
    console.log(users);
    //console.log(users[1].Id);
    //console.log(users[1].venuesId);

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
        console.log("seuas locais são: "+ locais);        

        var localRecomendado = recomendarLocal(usuario, locais);
        console.log("O local recomendado é: "+ localRecomendado);
        modalLocalRecomendado(localRecomendado);
}

function modalLocalRecomendado(localRecomendado){
    $.ajax({//
        url:"https://api.foursquare.com/v2/venues/" + localRecomendado + "?client_id=DSFNN45CHZ1XUCDT3XQWPS5GCPF34SBE0TQ1RXD4WSURZXA2&client_secret=KMEVLN5HTNEBNVU0MARJL2FZAAR1ETEJBXRLD1522CT4G5NZ&v=20180622",
        type: 'GET'
    }).done(function(resultado){
        var local = resultado.response.venue;
        $(".modal-title").html(local.name);
        var elemento = document.getElementById("contatos");
        elemento.innerHTML += local.contact.formattedPhone;
        var endereco = local.location.formattedAddress[0]+","+local.location.formattedAddress[1]
        +local.location.formattedAddress[2];
        elemento = document.getElementById("endereco");
        elemento.innerHTML += endereco;
        var categorias = "";
        for(j=0;j<local.categories.length;j++){
            if(j!=local.categories.length-1){
                categorias += local.categories[j].name+" - ";
            }else{
                categorias += local.categories[j].name;
            }
        }
        elemento = document.getElementById("categorias");
        elemento.innerHTML += categorias;
        var linkRestaurante = document.createElement("A");
        linkRestaurante.setAttribute("href",local.canonicalUrl);
        linkRestaurante.innerHTML = local.name;
        $("#site").append(linkRestaurante);
        elemento = document.getElementById("score");
        elemento.innerHTML += local.rating;
        
        $("#recomendado").modal();
    }).fail(function(x,s,r){
        console.log(r);
        });
}

function recomendarLocal(usu, loc){

    var localRec = Math.floor(Math.random()*(loc.length));
    console.log("O local recomendado é: "+ loc[localRec]);
    return loc[localRec];
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