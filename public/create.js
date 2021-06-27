const $goodsForm = document.forms.goodsForm;
const $goodsContainer = document.getElementById('goodContainer')
console.log($goodsContainer)

$goodsForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  console.log('formData', formData)
  const response = await fetch('/create', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
  const dataFromServer = await response.json()
  const newGoodHTML = createNewGoodHTML(dataFromServer);
  $goodsContainer?.insertAdjacentHTML('beforebegin', newGoodHTML)
  e.target.reset();
})

// $goodsForm?.addEventListener('submit', async (e) => {
//   const formData = Object.fromEntries(new FormData(e.target));
//   JSON.stringify(formData)
// })


$goodsContainer?.addEventListener('click', async (e) => {
  if (e.target.hasAttribute('data-delete')) {
    const $card = e.target.closest('[data-id]');
    const currentId = $card.dataset.id
    const response = await fetch(`/create/${currentId}`, {
      method: 'DELETE'
    })
    const status = response.status;
    if (status === 200) {
      $card.remove();
    }
  }
})

function createNewGoodHTML(good) {
  return `
  <div data-id="${good._id}" class="col-4 my-2">
        <div class="card  w-100 h-100" style="width: 18rem;">
            <img src="${good.picture}" class="card-img-top" width="250" height="250" alt="${good.title}">
            <div class="card-body">
                <h5 class="card-title">Category: ${good.category.name}</h5>
                <h5 class="card-title">Title: ${good.title}</h5>
                <h5 class="card-title">Quantity: ${good.quantity}</h5>
                <h5 class="card-title">Price: ${good.price} ₩</h5>
                <a href="/good/${good._id}" class="btn btn-primary">Edit</a>
                <button data-delete type="button" class="btn btn-danger">Delete</button>
            </div>
        </div>
    </div>
  `
}

