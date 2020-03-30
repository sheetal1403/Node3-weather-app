const request = require('request')

const geocode = (address, callback) => {
    
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hlZXRhbDE0MDMiLCJhIjoiY2s4Y3Q0ZDA2MDQxdDNmcGcwb2cxMjZnayJ9.CCvlfyvRHsR-ZLZGNMQ0-A'
    
    request({url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect', undefined)
        }else if(response.body.message){
            callback('Wrong URL', undefined)
        }else if(response.body.features.length === 0){
            callback('Location Not found', undefined)
        }
        else{
            const latitude = response.body.features[0].center[1];
            const longitude = response.body.features[0].center[0];
            callback(undefined,{
                latitude: response.body.features[0].center[1], 
                longitude: response.body.features[0].center[0],
                placeName: response.body.features[0].place_name
            }
            )
        }
        
    })
    
}

module.exports = geocode