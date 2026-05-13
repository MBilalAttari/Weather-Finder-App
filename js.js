const apiKey = "8d86be893d2f42a188d131751260905";

const getWeather = async () => {
  const city = "islamabad";

  const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    try{
        const ApiRisponse = await fetch(weatherUrl);
        
        const data = await ApiRisponse.json();
        console.log(data);
        const weatherIcon = data.current.condition.icon;
        console.log(weatherIcon);
    }catch(err){
        console.log(err);
    }
}
getWeather();