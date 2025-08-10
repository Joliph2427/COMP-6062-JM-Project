const app = Vue.createApp({
    data() {
        return {
            user: {
                name: '',
                age: '',
                avatar: ''   
            },
            city: 'London',     
            province: 'Ontario',
            country: 'Canada',
            weather: {
                temperature: '',
                wind: '',
                description: ''
            },
            word: '',   
            dictionary: {
                word: '',
                phonetic: '',
                definition: ''
            }
        };
    },

    methods: {
        getRandomUser() {  
            fetch('https://comp6062.liamstewart.ca/random-user-data')
                .then(response => response.json())
                .then(data => {
                    this.user.name = data.firstName + " " + data.lastName;
                    this.user.age = data.age;
                    this.user.avatar = data.avatar;
                });
        },

getWeather() {
    fetch(`https://comp6062.liamstewart.ca/weather-data?city=${this.city}&province=${this.province}&country=${this.country}`)
        .then(response => response.json())
        .then(data => {
            this.weather.temperature = data.weather_data.temperature;
            this.weather.wind = data.weather_data.wind_speed;
            this.weather.description = data.weather_data.weather_description;
        })
        .catch(error => {
            console.log("Weather fetch error:", error);
        });
        },

        defineWord() {  
            fetch('https://comp6062.liamstewart.ca/api/define?word=' + this.word)
                .then(response => response.json())
                .then(data => {
                    this.dictionary.word = data.word;
                    this.dictionary.phonetic = data.phonetic;
                    this.dictionary.definition = data.definition;
                });
        }
    },

    created() {
        this.getRandomUser();
        this.getWeather();
    }
});

app.mount('#app');
