let canap = getCart();
console.log(canap);


if(canap === null){
  const panierVide = 'Le panier vide';
  
} else {
  // let produitPanier = [];

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
     const newimput = document.createElement('imput');
     newimput.className = 'itemQuantity';
     newimput.setAttribute('type','number');
     newimput.setAttribute('name', 'itemQuantity');
     newimput.setAttribute('min','1');
     newimput.setAttribute('max','100');
     newimput.setAttribute('value', `${canap.quantity}`);
     const newdiv6 = document.createElement('div');
     newdiv6.className = 'cart__item__content__settings__delete';
     const newp4 = document.createElement('p');
     newp4.className = 'deleteItem';
     newp4.innerText = 'Supprimer';
   
   
   
   
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
     newdiv5.appendChild(newimput)
     newdiv4.appendChild(newdiv6)
     newdiv6.appendChild(newp4)

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


    
    //si un produit et présent dans le panier alors afficher :
    // id, couleur, quantiter.
    // si un produit et présent dans le panier alors récuperer dans l'api :
    //image + alt, prix, nom.
  
function getNumberProduct(){
  // recuperation du panier
  let canap = getCart();
  // définir le panier a 0
  let number = 0;
  // recuperation du nombre de produit dans le panier (canap)
  for (let product of canap) {
    //caculer le nombre de produit total dans le panier
    number += product.quantity;
  }
  // obtention du total 
  return number;
}