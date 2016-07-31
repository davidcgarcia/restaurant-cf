;(function() {

  class UserLocation {
    static get(callback) {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((location)=>{
          callback({
            lat: location.coords.latitude, 
            lng: location.coords.longitude
          })
        })
      } else { 
        alert('No pudimos detectar el lugar en el que te encuentras')
      }

    }
  }

  const myPlace = {
    lat: 3.411618,
    lng: -76.540655
  }

  google.maps.event.addDomListener(window, 'load', ()=>{
    const map = new google.maps.Map(
      document.getElementById('map'), 
      {
        center: myPlace,
        zoom: 15
      }
    )

    const marker = new google.maps.Marker({
      map: map,
      position: myPlace, 
      title: 'Restaurant Facilito', 
      visible: true
    })

    UserLocation.get((coords)=>{
      // Calcular distancia del restaurante al usuario

      let origin = new google.maps.LatLng(coords.lat, coords.lng)// LatLng
      let destination = new google.maps.LatLng(myPlace.lat, myPlace.lng)// LatLng

      let service = new google.maps.DistanceMatrixService()
      service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status)=>{
        if (status == google.maps.DistanceMatrixStatus.OK) {
          const durationElement = response.rows[0].elements[0]
          const durationTravel = durationElement.duration.text
          document.querySelector('#message')
                  .innerHTML = `
                    Estás a ${durationElement.duration.text} de una noche inolvidable en 
                    <span class="dancing-script medium">
                      Restaurante Facilito
                    </span>
                  `
        }
      })
    })

  })

})()