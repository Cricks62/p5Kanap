function getCurrentURL () {
    return window.location.href
  }
  var url = new URL(getCurrentURL());
  var idp = url.searchParams.get("id");
  console.log(idp);

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
