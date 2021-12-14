const api_key = "30f137b742626d2bc0775a8090991c30";

$(document).ready(() => {
    $('#searchform').on('submit',(e)=>{
        let searchText = $('#buscador').val();
        obtenerRecientes(searchText);
        e.preventDefault();
    })
    $('#changeColor').click(() => {
      $('body').toggleClass('darkmode');
      $('.modal-dialog').addClass('text-dark')
    })
});

function obtenerRecientes(searchText) {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchText}`)
    .then((res) => res.json())
    .then((result) => {
      let top_movie = result.results;
      let output = ''
      $.each(top_movie, (_, movie) => {
      output += `<div class="col-sm" onclick="peliculaSeleccionada('${
          movie.id
        }')" >
                    <div class="card" id="movie_popular">
                        <img src=${`https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.backdrop_path}`} class="card-img-top" alt=${
          movie.title
        }>
                        <div class="card-body">
                            <p class="card-text text-center w-100 text-dark">${
                              movie.title
                            }</p>
                        </div>
                    </div>
                    </div>`
      });
      $('#popular_card').html(output)
    })
    .catch((error) => console.log("error", error));
}

function peliculaSeleccionada(id) {
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=es-ES`).then((res) => res.json()).then((res)=>{
    console.log(res)
    $('#staticBackdrop').find('.modal-title').text(res.title);
    $('#staticBackdrop').find('.modal-body').html(`<img src=${`https://image.tmdb.org/t/p/w500/${res.backdrop_path || res.poster_path}`} class="card-img-top" alt=${res.title}>`)
    $('#staticBackdrop').find('.modal-descripcion').html(`<p>${res.overview}</p>`)
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`).then((result) => result.json()).then((result) => {
      $('#staticBackdrop').find('.modal-cast').html(`<p>${result.cast.slice(0,12).map(i => i.name).join(', ')}</p>`)
    })
    $('#staticBackdrop').find('.modal-genres').html(`<strong>${res.genres.map(i => i.name).join(' - ') || 'Sin genero'}</strong>`)
    $('#staticBackdrop').modal('show');
  }).catch(err => console.log(err))
}
