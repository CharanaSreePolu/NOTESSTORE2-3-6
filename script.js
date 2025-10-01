function viewSample(pdf, video, name) {
  // Open a new window for sample content
  const sampleWindow = window.open("", "_blank", "width=800,height=600");
  sampleWindow.document.write(`
    <h2>Sample Content: ${name}</h2>
    <p>📖 PDF Sample:</p>
    <iframe src="${pdf}" width="100%" height="300"></iframe>
    <p>🎥 Video Sample:</p>
    <video width="100%" controls>
      <source src="${video}" type="video/mp4">
    </video>
  `);
}
// Cart Array
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// Add to Cart
function addToCart(name, price, pdf, video, img) {
  cart.push({name, price, pdf, video, img});
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(name + " added to cart!");
}

// Update Cart Count
function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach(span => {
    span.innerText = cart.length;
  });
}
// Cart Page
if(document.getElementById("cart-items")){
  const cartContainer = document.getElementById("cart-items");

  function renderCart() {
    cartContainer.innerHTML = ""; // Clear previous content
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      cartContainer.innerHTML += `
        <div class="cart-row">
          <img src="${item.img}" alt="${item.name}">
          <div>
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
          </div>
        </div>`;
    });
    document.getElementById("total").innerText = "Total: ₹" + total;
    updateCartCount();
  }

  // Initial render
  renderCart();

  // Remove function
  window.removeFromCart = function(index) {
    cart.splice(index, 1); // Remove item
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(); // re-render cart
  }
}


// Get Access
function getAccess() {
  if(cart.length === 0){ alert("Cart is empty!"); return; }
  window.location.href = "content.html";
}

// Content Page
if(document.getElementById("content-container")){
  const container = document.getElementById("content-container");
  cart.forEach(item => {
    container.innerHTML += `
      <div class="content-box">
        <h3>${item.name}</h3>
        <p>📖 PDF Notes:</p>
        <iframe src="${item.pdf}" width="100%" height="250"></iframe>
        <p>🎥 Video Lecture:</p>
        <video width="100%" controls>
          <source src="${item.video}" type="video/mp4">
        </video>
      </div>`;
  });
}
