var numbers = [
"zero",
"um",
"dois",
"três",
"quatro",
"cinco",
"seis",
"sete",
"oito",
"nove",
"dez",
"onze",
"doze",
"treze",
"quatorze",
"quinze",
"dezesseis",
"dezessete",
"dezoito",
"dezenove",
"vinte",
"vinte e um",
"vinte e dois",
"vinte e três",
"vinte e quatro",
"vinte e cinco",
"vinte e seis",
"vinte e sete",
"vinte e oito",
"vinte e nove",
"trinta",
"trinta e um",
"trinta e dois",
"trinta e três",
"trinta e quatro",
"trinta e cinco",
"trinta e seis",
"trinta e sete",
"trinta e oito",
"trinta e nove",
"quarenta",
"quarenta e um",
"quarenta e dois",
"quarenta e três",
"quarenta e quatro",
"quarenta e cinco",
"quarenta e seis",
"quarenta e sete",
"quarenta e oito",
"quarenta e nove",
"cinquenta",
"cinquenta e um",
"cinquenta e dois",
"cinquenta e três",
"cinquenta e quatro",
"cinquenta e cinco",
"cinquenta e seis",
"cinquenta e sete",
"cinquenta e oito",
"cinquenta e nove",
"sessenta",
"sessenta e um",
"sessenta e dois",
"sessenta e três",
"sessenta e quatro",
"sessenta e cinco",
"sessenta e seis",
"sessenta e sete",
"sessenta e oito",
"sessenta e nove",
"setenta",
"setenta e um",
"setenta e dois",
"setenta e três",
"setenta e quatro",
"setenta e cinco",
"setenta e seis",
"setenta e sete",
"setenta e oito",
"setenta e nove",
"oitenta",
"oitenta e um",
"oitenta e dois",
"oitenta e três",
"oitenta e quatro",
"oitenta e cinco",
"oitenta e seis",
"oitenta e sete",
"oitenta e oito",
"oitenta e nove",
"noventa",
"noventa e um",
"noventa e dois",
"noventa e três",
"noventa e quatro",
"noventa e cinco",
"noventa e seis",
"noventa e sete",
"noventa e oito",
"noventa e nove",
"cem"];



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

            let status = this_num === ui_num ? true: false;
            
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
    	$("#numerals").append(`<div class="blockChildn" key="${n}" id="n_${n}"><div class="container">${numbers[n]}</div></div>`)
		
		setDroppable(`#n_${n}`)

    });
}

function render(num){
	let nums = set(num);
	nums.map(function(n){
		renderNumber(n)
	});
	renderNumerals(nums.shuffle())
}