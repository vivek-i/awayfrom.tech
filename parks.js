var weatherAPIKey = '58402fb2f7344bad89824757211707'
var token = 'YNj4HhWdLXGcHwciw29IltEBqcdK6ydb63enDFyb';

function searchCampsiteById(id, stateCode)
{
    

    

    var xhr = new XMLHttpRequest()
    console.log(id)
    xhr.open('GET', 'https://developer.nps.gov/api/v1/parks?q=' + id + '&limit=50&api_key=' + token, true)
    xhr.send()        
    xhr.onload = function() {   
        var data = JSON.parse(xhr.responseText)

        var titleSection = document.getElementById('titleInfo')
        var locationTitle = document.createElement('h1')
        locationTitle.innerHTML = data.data[0].fullName
        titleSection.appendChild(locationTitle)

        if(data.data[0].images[0]!=undefined)
        {
            var resultImage = document.createElement('img')
            resultImage.src = data.data[0].images[0].url
            document.getElementById('imageSection').appendChild(resultImage)
        }

        var informationContainer = document.getElementById('informationContainer')
        var description = document.createElement('p')        
        description.innerHTML = 'Description: ' + data.data[0].description
        informationContainer.appendChild(description)

        var activitesField = document.createElement('p')
        for(var j = 0; j < data.data[0].activities.length; j++ )
        {
            activitesField.innerHTML += data.data[0].activities[j].name + ', '
        }
        document.getElementById('listActivities').appendChild(activitesField)
        
        var lat = data.data[0].latitude
        var long = data.data[0].longitude
        document.getElementById('map').src='https://maps.google.com/maps?q=' + lat + ',' + long + '&t=&z=15&ie=UTF8&iwloc=&output=embed'



         var serverXhr = new XMLHttpRequest()
         serverXhr.open('GET', 'https://poetic-world-320005.uc.r.appspot.com/updateClicks?location=' + id + "&zip=" + stateCode /*data.data[0].addresses[0].postalCode*/, true)
         serverXhr.send()
         serverXhr.onload = function() {
            var serverData = JSON.parse(serverXhr.responseText)

            var crowdedRating = serverData.finalScore
            var locationRating = serverData.Rating
            var ratingText = document.createElement('p')
            description.innerHTML += '</br></br>' + "Our User Rating: " + locationRating +'/5 Stars'
            
            var rightBox = document.getElementById('imgContainer');
            var meterImage = document.createElement('img')
            if(crowdedRating < 2)
            {
                meterImage.src = '/meters/lowMeter.png'
            }
            else if(crowdedRating > 3)
            {
                meterImage.src = '/meters/highMeter.png'
            }
            else
            {
                meterImage.src = '/meters/middleMeter.png'
            }
            rightBox.appendChild(meterImage)
         }



    }
}







