/* global google, $ */
(function () {
  'use strict';

  function doAfterTimeoutAsync(callback, delay) {
    //setTimeout(callback, delay);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(callback());
        } catch (e) {
          reject(e);
        }
      }, delay);
    });
  }

  const bmgLoc = { lat: 40.09584720509516, lng: -74.22222707431865 };

  const map = new google.maps.Map(
    document.getElementById("map"),
    {
      zoom: 4,
      center: bmgLoc,
    }
  );

  const infoWindow = new google.maps.InfoWindow({ maxWidth: 260 }
  );
  const searchInput = $('#search');
  const rowsInput = $('#rows');
  const placesList = $('#sidebar ul');
  $('#searchForm').submit(async e => {
    try {
      e.preventDefault();

      const response = await fetch(`http://api.geonames.org/wikipediaSearch?q=${searchInput.val()}&maxRows=${rowsInput.val()}&username=slubowsky&type=json`);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);

      const bounds = new google.maps.LatLngBounds();
      data.geonames.forEach(place => {
        const marker = new google.maps.Marker({
          position: /*new google.maps.LatLng(place),*/place, //{lat: place.lat, lng: place.lng},
          map: map,
          title: place.title,
          animation: google.maps.Animation.DROP,
          //icon: place.thumbnailImg
          icon: place.thumbnailImg ? {
            url: place.thumbnailImg,
            scaledSize: new google.maps.Size(50, 50)
          } : undefined
        });

        marker.addListener('click', () => {
          infoWindow.setContent(`${place.summary}<a href="https://${place.wikipediaUrl}" target="_blank">more info</a>`);
          infoWindow.open(map, marker);
        });

        bounds.extend(place);

        const theLi = $(`<li>
           <span>${place.title}</span>
           <img src="${place.thumbnailImg}" alt="${place.title}">
           <div class="summary">${place.summary} <a href = "https://${place.wikipediaUrl}" target = "_blank" > more info</a></div>
         </li>`)
          .appendTo(placesList)
          .click(async () => {
            const currentActive = $('.active');
            if (currentActive) {
              currentActive.find('.summary').slideUp('slow');
              currentActive.removeClass('active');
            }
            if (!currentActive.is(theLi)) {
              theLi.addClass('active');
              theLi.find('.summary').slideDown('slow');
            }

            /*setTimeout(() => {
              map.setZoom(16);
              setTimeout(() => map.panTo(place), 1000);
            }, 1000);*/

            await doAfterTimeoutAsync(() => map.setZoom(16), 1000);
            await doAfterTimeoutAsync(() => map.panTo(place), 1000);
          });
      });
      map.fitBounds(bounds);
    } catch (err) {
      console.error('oops', err);
    }
  });

  ////////////////////////////
  let markers = [];
  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.POLYLINE,
        google.maps.drawing.OverlayType.RECTANGLE,
      ],
    },
    markerOptions: {
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    },
    circleOptions: {
      fillColor: "#ffff00",
      fillOpacity: 0.2,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1,
    },
  });

  drawingManager.setMap(map);

  google.maps.event.addListener(drawingManager, 'overlaycomplete', e => {
    console.log('overlay complete', e);

    markers.push({ lat: e.overlay.position.lat(), lng: e.overlay.position.lng() });

    localStorage.setItem('markers', JSON.stringify(markers));
  });


  let oldMarkers = localStorage.getItem('markers');
  if (oldMarkers) {
    oldMarkers = JSON.parse(oldMarkers);
    oldMarkers.forEach(marker => {
      new google.maps.Marker({
        position: marker,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      });
    });
  }
}());