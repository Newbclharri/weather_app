const my_api_key = config.MY_API_KEY;

//`http://api.openweathermap.org/geo/1.0/direct?appid={API key}&q={city name},{state code},{country code}&limit={limit}`
// const data = $.ajax(`https://api.openweathermap.org/data/2.5/onecall?appid=${API_KEY}`)
console.log("connected!");
const directApi = `http://api.openweathermap.org/geo/1.0/direct?appid=${my_api_key}`
const onecallApi = `https://api.openweathermap.org/data/2.5/onecall?appid=${my_api_key}`
const $inputCityState = $("[type ='text']");
const $buttonCity = $("[type='submit']");
const $temp = $("#temp");
const $windshield = $("#windshield");
const $weather = $("#weather");
const $link = $('a');

// console.log($inputCity); console.log($buttonCity); console.log($temp); console.log($windshield); console.log($weather)
// const req = $.ajax(directApi)
// console.log(req)

//functions
const isValidInput = (userInput) =>{
    const checkInput = userInput.replaceAll(' ','').split(',');
    const lettersOnly = /^[A-Za-z]+$/;
    
    let count = 0;
    if(checkInput.length === 2){
        const a = checkInput[0];
        const b = checkInput[1];
        const lettersOnly2 = /^[A-Za-z]+$/;
        if(!a.match(lettersOnly)){
            count++;
        }
        if(!b.match(lettersOnly2)){
            count++;
        }
        if(count > 0 || b.length < 4){
            alert("Please enter a valid City, State.\n Example: Dallas, Texas")
        }else{
            return true;
        }
    }else{
        alert("Please enter a valid City, State.\n Example: Dallas, Texas")
    }
}

$buttonCity.on("click", (e) =>{
    e.preventDefault()
    let input = $inputCityState.val();
   
    //if valid input, remove spaces and comma
    if(!isValidInput(input)){
        return
    }else{
        input = input.replace(' ','').split(',');
        city = input[0];
        state = input[1];

        //make direct API call requesting city and state info
        const req = $.ajax(directApi + `&q=${city},${state},US`)
        req.then(res =>{
            console.log(res)
            //get city latitute and longitute values
            const lat = res[0].lat, lon = res[0].lon
            console.log(lat, lon)
            //make one call request using lat and lon data
            const res_2 = $.ajax(onecallApi + `&lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,daily`)
            res_2.then(res_2 => {
                console.log(res_2)
                // $temp.text(`Temperature: ${Math.round(res_2.current.temp)}F`)
                $('#city').find('span').remove();
                $('#city').append(`<span >${city}</span>`);
                $temp.find('span').remove()
                $temp.append(`<span>${Math.round(res_2.current.temp)}F</span>`)
                $windshield.find('span').remove()
                $windshield.append(`<span>${Math.round(res_2.current.feels_like)}F</span>`)
                $weather.find('span').remove()
                $weather.append(`<span>${res_2.current.weather[0].description}</span>`)
            })
        })
        console.log(req)
        
    }
});



