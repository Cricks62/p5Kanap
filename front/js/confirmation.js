function getCurrentURL () {
    return window.location.href
  }
  const url = new URL(getCurrentURL());
  const orderId = url.searchParams.get("orderId");

  const id = document.getElementById('orderId');
  id.innerText = orderId;

  localStorage.clear()