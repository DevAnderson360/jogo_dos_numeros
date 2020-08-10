let pontos = 0;
let erros  = 0;

//embaralhar array
Array.prototype.shuffle = function() {

    let indice = this.length;
    
    while(indice) {

        const indiceAleatorio = Math.floor(Math.random() * indice--);
        [this[indice], this[indiceAleatorio]] = 
            [this[indiceAleatorio], this[indice]];
    }

    return this;
}

function setDraggable(select){
	$(select).draggable({
		helper: 'clone'
	});
}

function setDroppable(select){
	$(select).droppable({
        //hoverClass: 'lixeira-ativa',
        drop: function(e, ui) {

            let this_num = $(this).attr('key');

            let   ui_num = $(ui)[0].draggable.attr('key')

            let msg = "Acertou"; 

            let status = this_num === ui_num ? true: false;

            if(!status)
            	msg = "Errou"
            
            console.log(msg)

            if(status){
            	$(this).droppable( "option", "disabled", true );
            	$(this).css("background-color", "#92FF36");

            	pontos = pontos + 1;
            }else{
            	erros = erros + 1;
            	$(this).css("background-color", "#FA0C00");
            }

            setPontos();
            setErros();

        }
    });
}

function setPontos()
{
	$("#tp").text(pontos);
}

function setErros()
{
	$("#err").text(erros);
}

//-----
var numbers = ["Zero", "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove", "Dez", "Onze", "Doze", "Treze", "Quatorze", "Quinze"];

//setar numeros
function set(amount){
	let totalNumbers = numbers.length;
	
	var num = [];

	var new_array = [];
	
	for(var i = 0 ; i < totalNumbers; i++)
		num.push(i)

	num.shuffle();

	for(var i = 0 ; i < amount; i++)
		new_array.push(num[i])

	return new_array;
	
}

function renderNumber(n){
	$("#numbers").append(`<div class="blockChild" key="${n}" id="${n}"><div class="container">${n}</div></div>`)
	setDraggable(`#${n}`)
}

function renderNumerals(nums){
	nums.map(function(n){
    	$("#numerals").append(`<div class="blockChildn" key="${n}" id="${numbers[n]}"><div class="container">${numbers[n]}</div></div>`)
		
		setDroppable(`#${numbers[n]}`)

    });
}

function render(num){
	let nums = set(num);
	nums.map(function(n){
		renderNumber(n)
	});
	renderNumerals(nums.shuffle())
}