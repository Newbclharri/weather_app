//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// const data = $.ajax(`https://api.openweathermap.org/data/2.5/onecall?appid=${API_KEY}`)
const API_KEY = "cd3c2eb06c37ebaae0a1baba8b321dc3"

console.log("connected!");
const $inputCityState = $("[placeholder='City, State']");
const $buttonCity = $("[type='submit']");
const $temp = $("#temp");
const $windshield = $("#windshield");
const $weather = $("#weather");

// console.log($inputCity); console.log($buttonCity); console.log($temp); console.log($windshield); console.log($weather)
const a = "Memphis, TN"
console.log(a.replace(' ', '').split(','))


$buttonCity.on("click", (e) =>{
    e.preventDefault()
    let city = $inputCityState.val()
    const checkInput = city.split(',')
    const lettersOnly = /^[A-Za-z]+$/;
    
    console.log(checkInput.length)
    if(checkInput.length === 2){
    
        for(i = 0; i < checkInput.length; i++){
            let element = checkInput[i]
            console.log(element)
            if(checkInput[0].match(lettersOnly)){
                console.log(true)
            }
        }
    }else{
        alert("Please enter a valid City, State")
    }
    const limit = 5;
    city = city.replace(/\s+/g, '') //using regex to remove all instances of whitespace found in string
    city = city.split(',') //remove comma
      
    
   
    console.log(city)

    // console.log(city)
    //make API call
    // $.ajax(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${API_KEY}`).then(data =>{
    //     console.log(data)
    // })


});

