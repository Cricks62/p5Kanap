let canap = getCart();
let totalPrice = 0;
let totalQuantity = 0;


if(canap === null){
  const panierVide = 'Le panier vide';
  
} else {

  for(a = 0; a < canap.length; a++ ){

  basket(canap[a]);
  }
}

function basket(canap) {

 fetch(`http://localhost:3000/api/products/${canap.id}`)
   .then(function(res) {
    if (res.ok) {
       return res.json();
     }
   })
   .then(function(objet) {

    
    
     const cart = document.querySelector('#cart__items');
     const newarticle = document.createElement('article');
     newarticle.className = 'cart__item';
     newarticle.setAttribute('data-id', `${canap.id}`);
     newarticle.setAttribute('data-color', `${canap.color}`);
     const newdiv = document.createElement('div');
     newdiv.className = 'cart__item__img';
     const newimg = document.createElement('img');
     newimg.setAttribute('src',`${objet.imageUrl}`)
     const newdiv2 = document.createElement('div');
     newdiv2.className = 'cart__item__content';
     const newdiv3 = document.createElement('div');
     newdiv3.className = 'cart__item__content__description';
     const newh2 = document.createElement('h2');
     newh2.innerText = `${objet.name}`
     const newp = document.createElement('p');
     newp.innerText = `${canap.color}`;
     const newp2 = document.createElement('p');
     newp2.innerText = `${objet.price}`+'€';
     const newdiv4 = document.createElement('div');
     newdiv4.className = 'cart__item__content__settings';
     const newdiv5 = document.createElement('div');
     newdiv5.className = 'cart__item__content__settings__quantity';
     const newp3 = document.createElement('p');
     newp3.innerText = 'Qté :'
     const newinput = document.createElement('input');
     newinput.className = 'itemQuantity';
     newinput.setAttribute('type','number');
     newinput.setAttribute('name', 'itemQuantity');
     newinput.setAttribute('min',1);
     newinput.setAttribute('max',100);
     newinput.setAttribute('value', `${canap.quantity}`);
     const newdiv6 = document.createElement('div');
     newdiv6.className = 'cart__item__content__settings__delete';
     const newp4 = document.createElement('p');
     newp4.className = 'deleteItem';
     newp4.innerText = 'Supprimer';

     totalQuantity += parseInt(canap.quantity);

     const totalQuantity2 = document.querySelector('#totalQuantity');
     totalQuantity2.innerText = `${totalQuantity}`;

     totalPrice += objet.price * canap.quantity;
     const totalPrice2 = document.querySelector('#totalPrice');
     totalPrice2.innerText = `${totalPrice}`;
   
     cart.appendChild(newarticle);
     newarticle.appendChild(newdiv)
     newdiv.appendChild(newimg);
     newarticle.appendChild(newdiv2)
     newdiv2.appendChild(newdiv3);
     newdiv3.appendChild(newh2);
     newdiv3.appendChild(newp);
     newdiv3.appendChild(newp2);
     newarticle.appendChild(newdiv4);
     newdiv4.appendChild(newdiv5);
     newdiv5.appendChild(newp3);
     newdiv5.appendChild(newinput);
     newdiv4.appendChild(newdiv6);
     newdiv6.appendChild(newp4);

    // il faut envoyer la nouvelle valeur saisie : newinput.value et non canap.quantity qui est l'ancienne valeur 
    newinput.addEventListener('change', (e) => updateQuantity(canap.id, canap.color, newinput.value))

    newp4.addEventListener('click',(e) => removeCanap(canap.id, canap.color));
   })
   
   .catch(function(err) {
     console.log(err)
 });

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

function removeCanap(idp, color) {
  let canap = getCart();
  const indexProduct = canap.findIndex(p => p.id === idp && p.color === color);
  canap.splice(indexProduct, 1);
  saveCart(canap);
  location.reload();
}

function updateQuantity(idp, color, newQty ) {
  let canap = getCart();
  // on recherche l'index du produit dans notre localStorage
  let indexProduct = canap.findIndex(p => p.id === idp && p.color === color)
 // si l index est positif c'est qu'on a trouvé le produit
  if(indexProduct>=0) {
 // article trouvé
 // on vient modifier la quantité DU produit grâce à son index trouvé plus haut avec la newQty envoyée
 canap[indexProduct].quantity = parseInt(newQty);
 // on sauvegarde le panier
 saveCart(canap);
 // on refresh la page
 window.location.reload();
  } else {
 // article à supprimer
 removeCanap(idp, color);
  }
}
//------------- Partie formulaire --------------//

let form = document.querySelector('.cart__order__form')

// écouter la modification du prénom 
form.firstName.addEventListener('change',function() {
  validFirstName(this)
});


const validFirstName = function(inputFirstName) {
  // creation de l'expression réguliere pour valider le prénom
  let firstNameRegExp = new RegExp(
    '^[a-zA-Z-]+$', 'g'
  );

  // on test l'expression réguliere
  let testFirstName = firstNameRegExp.test(inputFirstName.value);
  // récuperation de la balise P
  let errormsg = inputFirstName.nextElementSibling;

  if(testFirstName == true) {
    errormsg.innerText = 'Prénom Valide';
  } else {
    errormsg.innerText = "Votre prénom ne doit pas contenir de chiffre ou d'accent";
  }
};

form.lastName.addEventListener('change', function() {
  validLastName(this)
});

const validLastName = function(inputLastName) {
  let lastNameRegExp = new RegExp(
    '^[a-zA-Z-]+$', 'g'
  );
  let testLastName = lastNameRegExp.test(inputLastName.value);
  let errormsg = inputLastName.nextElementSibling;

  if(testLastName == true) {
    errormsg.innerText = 'Nom Valide';
  } else {
    errormsg.innerText = "Votre Nom ne doit pas contenir de chiffre ou d'accent";
  }
};

form.address.addEventListener('change', function() {
  validAddress(this)
});

const validAddress = function(inputAddress) {
  let addressRegExp = new RegExp(
    '^[a-zA-Z0-9 -]+$', 'g'
  );
  let testAddress = addressRegExp.test(inputAddress.value);
  let errormsg = inputAddress.nextElementSibling;

  if(testAddress == true) {
    errormsg.innerText = 'Adresse Valide';
  } else {
    errormsg.innerText = "Votre adresse ne doit pas contenir de caractère spéciaux";
  }
};

form.email.addEventListener('change',function() {
  validEmail(this)
});

form.city.addEventListener('change', function() {
  validCity(this)
});

const validCity = function(inputCity) {
  let cityRegExp = new RegExp(
    '^[a-zA-Z -]+$', 'g'
  );
  let testCity = cityRegExp.test(inputCity.value);
  let errormsg = inputCity.nextElementSibling;

  if(testCity == true) {
    errormsg.innerText = 'Ville Valide';
  } else {
    errormsg.innerText = "Le nom de votre ville ne doit pas contenir de chiffre ou d'accent";
  }
};

form.email.addEventListener('change',function() {
  validEmail(this)
});

const validEmail = function(inputEmail) {
  let emailRegExp = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
  );
  let testEmail = emailRegExp.test(inputEmail.value);
  let errormsg = inputEmail.nextElementSibling;

  if(testEmail == true) {
    errormsg.innerText = 'Email Valide';
  } else {
    errormsg.innerText = "Votre Email doit contenir un @";
  }
};
 