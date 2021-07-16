$(document).ready(function () {
  /* main(); */
  quotesGetRequest();
  popularTutorialsGetRequest();
  latestVideosGetRequest();
});

function quotesGetRequest() {
  let url = "https://smileschool-api.hbtn.info/quotes";
  $.ajax(url, {
    beforeSend: function () {
      $('.quotes-loader').show();
    },
    complete: function () {
      $('.quotes-loader').hide();
    }
  })
    .done(function (response) {
      appendQuotes(response);
    })
}

function popularTutorialsGetRequest() {
  let url = "https://smileschool-api.hbtn.info/popular-tutorials";
  $.ajax(url, {
    beforeSend: function () {
      $('.popular-tutorials-loader').show();
    },
    complete: function () {
      $('.popular-tutorials-loader').hide();
    }
  })
    .done(function (response) {
      appendPopularTutorials(response, '#carouselVideo .container .carousel-inner');
    })
}

function latestVideosGetRequest() {
  let url = "https://smileschool-api.hbtn.info/latest-videos";
  $.ajax(url, {
    beforeSend: function () {
      $('.latest-videos-loader').show();
    },
    complete: function () {
      $('.latest-videos-loader').hide();
    }
  })
    .done(function (response) {
      appendPopularTutorials(response, '#carouselLatestVideo .container .carousel-inner');
    })
}

function appendQuotes(data) {
  let active = false;

  data.forEach(element => {
    let quoteFormat = `<div class="carousel-item">
                            <blockquote>
                                <div class="container">
                                    <div class="row align-items-center px-md-5">
                                        <div class="col-sm-3 text-center">
                                            <img class="img-carousel rounded-circle" src="${element.pic_url}" alt="...">
                                        </div>
                                        <div class="col-sm-9 mt-5 mt-sm-0">
                                            <p class="text-white"><span>&#171;</span> ${element.text} <span>&#187;</span></p>
                                            <h3 class="text-white">${element.name}</h3>
                                            <small class="text-white">${element.title}</small>
                                        </div>
                                    </div>
                                </div>
                            </blockquote>
                        </div>`

    $('.section-carousel .carousel-inner').append(quoteFormat);

    if (!active) {
      $('.carousel-inner .carousel-item').addClass('active');
      active = true;
    }
  });
}

function appendPopularTutorials(data, parent) {
  let active = false;
  let each4Items = 0;
  let carouselItem = $(
    `<div class="carousel-item"></div>`
  );

  let contentItems = $(
    `<div class="d-flex justify-content-around px-5 px-md-0"></div>`
  );

  data.forEach(element => {
    let cardFormat = `<div class="card">
                          <img class="card-img-top position-relative" src="${element.thumb_url}" alt="Card image cap">
                          <div class="card-image position-absolute top-0 left-0">
                              <img src="/images/play.png" alt="" width="64px" height="64px">
                          </div>
                          <div class="card-body py-3">
                              <h4 class="card-title font-weight-bold color-text">${element.title}</h4>
                              <p class="card-text text-muted">${element['sub-title']}</p>
                              <div class="d-flex align-items-center">
                                  <img src="${element.author_pic_url}" class="rounded-circle" alt="..." width="40px" height="40px">
                                  <div>
                                      <h4 class="font-weight-bold pl-3"><span class="color">${element.author}</span></h4>
                                  </div>
                              </div>
                              <div class="d-flex mt-2 justify-content-between">
                                  <div class="rating">
                                      <img src="/images/star_on.png" alt="" width="15px" height="15px">
                                      <img src="/images/star_on.png" alt="" width="15px" height="15px">
                                      <img src="/images/star_on.png" alt="" width="15px" height="15px">
                                      <img src="/images/star_on.png" alt="" width="15px" height="15px">
                                      <img src="/images/star_off.png" alt="" width="15px" height="15px">
                                  </div>
                                  <div class="minutes">
                                      <p><span class="color">${element.duration}</span></p>
                                  </div>
                              </div>
                          </div>
                      </div>`;

    if (!active) {
      carouselItem.addClass('active');
      active = true;
    }

    if (each4Items == 4) {
      $(parent).append(carouselItem);
      carouselItem.append(contentItems);
      each4Items = 0;

      carouselItem = $(
        `<div class="carousel-item"></div>`
      );

      contentItems = $(
        `<div class="d-flex justify-content-around px-5 px-md-0"></div>`
      );
      console.log('added all');
    } else {
      contentItems.append(cardFormat);
      console.log('adding: ' + each4Items);
    }


    each4Items++;
  });

  if (each4Items != 0) {
    $(parent).append(carouselItem);
    carouselItem.append(contentItems);
  }
}
