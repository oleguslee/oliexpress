const $goodsContainerIndex = document.getElementById('goodContainerIndex')

$goodsContainerIndex?.addEventListener('click', async (e) => {
  if (e.target.hasAttribute('data-cart')) {
    const $card = e.target.closest('[data-id]');
    const currentId = $card.dataset.id
    console.log('currentId', currentId)
    const response = await fetch(`/cart/${currentId}`, {
      method: 'PATCH',
      header: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currentId)
    })
    const dataFromServer = await response.json()
    console.log(dataFromServer)

  }
})
