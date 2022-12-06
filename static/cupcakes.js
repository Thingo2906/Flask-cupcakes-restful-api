

function generateCupcakeHTML(cupcake) {
    return `
      <div id=${cupcake.id}>
        <li>
          ${cupcake.flavor} | ${cupcake.size} | ${cupcake.rating} 
          <button class="delete-cupcake" data-id="${cupcake.id}">X</button>
          
        </li>
        <img class="Cupcake-img"
              src="${cupcake.image}"
              alt="image for cupcake>
       
      </div>
    `;
}

async function showCupcakes() {
    const response = await axios.get(`/api/cupcakes`);
  
    for (let cupcake of response.data.cupcakes) {
      let newCupcake = $(generateCupcakeHTML(cupcake));
      $("#cupcakes-list").append(newCupcake);
    }
}

$("#new-cupcake-form").on("submit", async function (evt) {
    evt.preventDefault();
  
    let flavor = $("#form-flavor").val();
    let size = $("#form-size").val();
    let rating = $("#form-rating").val();
    let image = $("#form-image").val();
  
    const response = await axios.post(`/api/cupcakes`, {
      flavor,
      size,
      rating,
      image
    });
  
    let newCupcake = $(generateCupcakeHTML(response.data.cupcake));
    $("#cupcakes-list").append(newCupcake);
    $("#new-cupcake-form").trigger("reset");
  });
  

$('.delete-cupcake').click(deleteCupcake)

async function deleteCupcake() {
    const id = $(this).data('id')
    await axios.delete(`/api/cupcakes/${id}`)
    $(this).parent().remove()
}
  
$(showCupcakes);
  