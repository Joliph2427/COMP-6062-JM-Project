const app = Vue.createApp({
    data() {
        return {
            user: {
                profile_picture: '',
                first_name: '',
                last_name: '',
                age: ''
            },
            weather: {
                city: 'London',
                province: 'Ontario',
                country: 'Canada',
                temp: '',
                wind: '',
                desc: ''
            },
            dictionary: {
                word: '',
                phonetic: '',
                definition: ''
            }
        };
    },
    created() {
        this.User();
        this.Weather();
        this.Dictionary();
    },
    methods: {
        User() {
            fetch('https://comp6062.liamstewart.ca/random-user-data')
                .then(response => {
                    if(response.ok)
                    {
                        return response.json();
                    }
                    else
                    {
                        console.log('an error occured.please try again');
                    }
                })
                .then(data => {
                    this.user.profile_picture = data.user_profile.avatar_url;
                    this.user.first_name = data.user_profile.first_name;
                    this.user.last_name = data.user_profile.last_name;
                    this.user.age = data.user_profile.age;
                })
                .catch(error => {console.log('random user fetch error');});
        },
        Weather() {
            fetch(`https://comp6062.liamstewart.ca/weather-data?city=${this.weather.city}&province=${this.weather.province}&country=${this.weather.country}`)
                .then(response =>  {
                    if(response.ok)
                    {
                        return response.json();
                    }
                    else
                    {
                        console.log('an error occured.please try again');
                    }
                })
                .then(data => {
                    this.weather.temp = data.weather_data.temperature;
                    this.weather.wind = data.weather_data.wind_speed;
                    this.weather.desc = data.weather_data.weather_description;
                })
                .catch(error => {console.log('Weather fetch error');});
        },
        Dictionary() {
            fetch(`https://comp6062.liamstewart.ca/api/define?word=${this.dictionary.word}`)
                .then(response =>  {
                    if(response.ok)
                    {
                        return response.json();
                    }
                    else
                    {
                        console.log('an error occured.please try again');
                    }
                })
                .then(data => {
                    this.dictionary.word = data.word;
                    this.dictionary.phonetic = data.phonetic;
                    this.dictionary.definition = data.definition;
                })
                .catch(error => {console.log('Dictionary fetch error');});
        }
    }
});

app.mount('#app');
