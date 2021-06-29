const $goodsContainerIndex = document.getElementById('goodContainerIndex')

$goodsContainerIndex?.addEventListener('click', async (e) => {
  if (e.target.hasAttribute('data-cart')) {
    const $card = e.target.closest('[data-id]');
    const currentId = $card.dataset.id
    const response = await fetch(`/cart/${currentId}`, {
      method: 'POST',
    })
    if (response.status === 200) {
      const newQuantity = ($card.dataset.quantity -= 1);
      $card.querySelector('#quantity').innerText = `Quantity: ${newQuantity}`
    }
  }
})
