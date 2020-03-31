const request = require('request')

getweather = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/1ae7e4590e02c087c78e8aa161d21a5a/'+latitude+','+longitude;
    request({url: url, json:true}, (error,{body}) => {
        if(error){
            callback('Error connecting');
        }else if(body.error){
            callback('Poorly formatted request')
        }else{
            const temperature = body.currently.temperature;
            // const precip = response.body.currently.precipProbability; 
    
            const summary =  body.daily.data[0].summary
            callback(undefined, {
                temperature,
                summary
            })
        }
    })
}

module.exports = getweather