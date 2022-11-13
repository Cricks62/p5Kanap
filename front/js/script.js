// creation des articles avec les produits
function newCard(objet) {
    const section = document.querySelector('.items')
    const newa = document.createElement('a');
    newa.setAttribute ('href', `./product.html?id=${objet._id}`)
    const newarticle = document.createElement('article');
    const newimg = document.createElement('img');
    newimg.setAttribute('src', `${objet.imageUrl}`);
    newimg.setAttribute('alt',`${objet.altTxt}`);
    const newh3 = document.createElement('h3');
    newh3.className = 'productName';
    newh3.textContent = `${objet.name}`
    const newp = document.createElement('p');
    newp.className = 'productDescription';
    newp.textContent = `${objet.description}`;

    section.appendChild(newa)
    newa.appendChild(newarticle)
    newarticle.appendChild(newimg)
    newarticle.appendChild(newh3)
    newarticle.appendChild(newp)
    console.log(objet)
}
// Méthode fetch pour recup l'api 
fetch('http://localhost:3000/api/products')
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(data) {
      console.log(data);

        for (let objet of data) {
           newCard(objet)
        }
  
    })
    .catch(function(err) {
       console.log(err)
    });