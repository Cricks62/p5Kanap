function getCurrentURL () {
  return window.location.href
}
const url = new URL(getCurrentURL());
const idp = url.searchParams.get("id");

function displayProduct(objet){

const img = document.querySelector('.item__img');
const newimg = document.createElement('img');
newimg.setAttribute('src', `${objet.imageUrl}`);
newimg.setAttribute('alt',`${objet.altTxt}`);
const title = document.querySelector('#title');
title.textContent = `${objet.name}`;
const price = document.querySelector('#price');
price.textContent = `${objet.price}`;
const description = document.querySelector('#description');
description.textContent = `${objet.description}`;
const select = document.querySelector('#colors');
 
for (let color of objet.colors){
      const option = document.createElement('option');
      option.setAttribute('value', color);
      option.textContent = `${color}`;

      select.appendChild(option);
  }

img.appendChild(newimg);
}

function saveCart(canap) {
// JSON.stringify prend l'objet et le transforme en chaine de caractere
localStorage.setItem("canap", JSON.stringify(canap));
}

function getCart() {
// recuperation de l'objet canap
let canap = localStorage.getItem("canap");
// si canap et == a null
if(canap == null) {
  // alors on retourne le tableau (l'objet)
  return []
  //sinon on retransform l'objet en string
}else{
  // JSON.parse retransforme la chaine de caractere "string" en objet
  return JSON.parse(canap)
}
}

function addToCart(idp, quantity, color) {

if (!idp || !quantity || !color)
return false;

  const produit = {
    id: idp,
    color: color,
    quantity: quantity,
  }

// recuperatrion du panier dans le local storage
let canap = getCart();

if (canap != null) {

console.log(idp, quantity, color)
// cherche dans le panier si il y as un produit donc l'id et = a l'id du produit ajouter
let foundProduct = canap.findIndex((p) => p.id === idp && p.color === color);

console.log(canap);
console.log(foundProduct);

// si le produit et différent de undefined
if(foundProduct !== -1) {
// panier non vide + article trouvé
//l'objet et deja dans le panier donc on ajoute une quantiter
// on cumule les quantités
canap[foundProduct].quantity = parseInt(canap[foundProduct].quantity) + parseInt(quantity);
// j'ajoute l'article
canap.push(produit);
// je supprimer l'ancien article
canap.pop();

}else{
// panier non vide + article non trouvé
//défini la quantiter par défaut a 1.

// ajout du produit
canap.push(produit);
}

} else {

// panier vide => ajout du produit
  canap.push(produit);  

}

saveCart(canap);

document.location.href = "cart.html";

}

const button = document.getElementById('addToCart');

button.addEventListener('click', (e) => {
e.preventDefault();

if (!colors.value) {
alert("Veuillez choisir une couleur")
} else if (quantity.value <= 0) {
alert("Vous devez ajouter au moins un produit par commande")
} else if (quantity.value > 100) {
alert("Vous ne pouvez pas ajouter plus de 100 produits par commande")
} else {
addToCart(idp, quantity.value, colors.value);
}

});



fetch(`http://localhost:3000/api/products/${idp}`)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(objet) {
    displayProduct(objet);
  })
  .catch(function(err) {
     console.log(err)
  });
