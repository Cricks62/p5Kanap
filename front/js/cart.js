// function basket(objet) {
    const cart = document.querySelector('#cart__items');
    const newarticle = document.createElement('article');
    newarticle.className = 'cart__item';
    const newdiv = document.createElement('div');
    newdiv.className = 'cart__item__img';
    const newimg = document.createElement('img');
    const newdiv2 = document.createElement('div');
    newdiv2.className = 'cart__item__content';
    const newdiv3 = document.createElement('div');
    newdiv3.className = 'cart__item__content__description';
    const newh2 = document.createElement('h2');
    const newp = document.createElement('p');
    const newp2 = document.createElement('p')
    const newdiv4 = document.createElement('div')
    newdiv4.className = 'cart__item__content__settings'
    const newdiv5 = document.createElement('div')
    newdiv5.className = 'cart__item__content__settings__quantity'
    const newp3 = document.createElement('p');
    // creer l'imput
    const newdiv6 = document.createElement('div')
    newdiv6.className = 'cart__item__content__settings__delete'
    const newp4 = document.createElement('p')
    newp4.className = 'deleteItem'

    
    
    
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
    newdiv4.appendChild(newdiv6)
    newdiv6.appendChild(newp4)
    // }
    
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
    
    
    
    
    
    fetch('http://localhost:3000/api/products')
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(data) {
      console.log(data);
    
        // for (let objet of data) {
        //    basket(objet)
        // }
    
    })
    .catch(function(err) {
       console.log(err)
    });