"use strict";

const $ = (selector)=> {
    return document.querySelector(selector)
}

const divResultados = $(".result");
const input = $("#inp-ip");
const button = $("button");
const form = $("#form");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8fde8c9626mshafa344efd638926p1766f1jsn2f5058be08ba',
		'X-RapidAPI-Host': 'ip-whois-geolocation1.p.rapidapi.com'
	}
};

const peticion = async (ip)=>{
    return fetch(`https://ip-whois-geolocation1.p.rapidapi.com/?ip=${ip}`, options)
    .then(res =>{
        return res.json()
    })
    .catch(error => console.error(error))
  }

form.addEventListener("submit", async(e)=>{
    e.preventDefault();

    if(input.value.length > 0){
        button.textContent = "Buscando direccion IP...";
        button.style.background = "#13171f";
        button.style.border = "1px solid rgb(0, 175, 224)"
        button.style.color = "rgb(0, 175, 224)"
        const promesa = await peticion(input.value)
        .then(res =>{
            setTimeout(() => {
                button.style.background = "rgb(0, 175, 224)"
                button.textContent = "Buscar información de la direccion IP";
                button.style.color = "black"
                divResultados.innerHTML = JSON.stringify(res, null, 3);
            }, 500);
        })
        .catch(e => {alert(e)})
    }
    else {
        input.style.border = "none"
        input.style.outline = "2px solid red"
    }
})
