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
    return canap;
    return JSON.parse(canap)
  }
}

function addToCart(idp, quantity, color) {
  // recuperatrion du panier dans le local storage
  let canap = getCart();
  console.log(idp, quantity, color)
  // cherche dans le panier si il y as un produit donc l'id et = a l'id du produit ajouter
  let foundProduct = canap.findIndex((p) => p.id === idp && p.color === color);
  // si le produit et différent de undefined
  if(foundProduct != undefined) {
    //l'objet et deja dans le panier donc on ajoute une quantiter
    let quantiter = canap[foundProduct].quantity;
    quantiter = quantiter+quantity;
  }else{
    //défini la quantiter par défaut a 1.
    const produit = {
      id: idp,
      color: color,
      quantity: quantity,
    }
    // ajout du produit
    canap.push(produit);
  }
  saveCart(canap);
}

const button = document.getElementById('addToCart');

button.addEventListener('click', (e) => {
  e.preventDefault();
  addToCart(idp, quantity.value, colors.value);
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
