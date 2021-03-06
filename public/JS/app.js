

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo =  document.querySelector('#msg-2')
const msgThree = document.querySelector('#msg-3')


weatherForm.addEventListener('submit', (event) => {

    event.preventDefault()

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''
    msgThree.textContent = ''
    fetch('/weather?address='+search.value).then((response => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
            msgOne.textContent = data.error
        }else{
            msgOne.textContent = data.location
            msgTwo.textContent = data.temperature
            msgThree.textContent = data.summary
            
        }
    })
}))
    
    
})

