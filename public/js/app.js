console.log('CLient side JS file');


const weatherForm = document.querySelector('form');
const serachElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(event) =>{
    event.preventDefault();

    const location = serachElement.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' +location).then((response) =>{
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
                // console.log(data.error);
            } else {
                messageOne.textContent = data.location ;
                messageTwo.textContent = data.foreCast ;
                // console.log(data.location);
                // console.log(data.foreCast);

            }
        })
});
});