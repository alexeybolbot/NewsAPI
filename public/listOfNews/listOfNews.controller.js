angular
    .module('app')
    .controller('ListOfNewsController' , ListOfNewsController);

function ListOfNewsController($http, listOfNews, listOfCountries, listOfSources, languages) {
    var vm = this;
    vm.country = 'country=us';
    vm.language = '';
    vm.sources = '';
    vm.category = '';
    vm.url = '';
    vm.template = false;
    vm.news = '';
    vm.options = {country: 'Страна - США', source: '', language: '', category: ''};
    vm.listOfNews = listOfNews;
    vm.listOfCountries = listOfCountries;
    vm.listOfSources = listOfSources;
    vm.languages = languages;
    vm.newsOfCountry = newsOfCountry;
    vm.newsOfLanguage = newsOfLanguage;
    vm.newsOfSources = newsOfSources;
    vm.newsOfCategory = newsOfCategory;
    vm.setFile = setFile;
    vm.showDetailedNews = showDetailedNews;
    vm.back = back;
    vm.saveNews = saveNews;

    function newsOfCountry(country, name) {
        vm.options.country = `Страна - ${name}`;
        changeListOfSources(country);
        vm.country = country == 'all' ? '' : `country=${country}`;
        vm.sources = '';
        vm.options.source = '';
        showNews();
    }

    function newsOfLanguage(language, name) {
        vm.options.language = `Язык - ${name}`;
        vm.language = `language=${language}`;
        showNews();
    }

    function newsOfSources(source, name) {
        vm.options.source = `Издание - ${name}`;
        vm.country = '';
        vm.options.country = '';
        vm.category = '';
        vm.options.category = '';
        vm.sources = `sources=${source}`;
        showNews();
    }

    function newsOfCategory(category, name) {
        vm.sources = '';
        vm.options.source = '';
        vm.options.category = `Категория - ${name}`;
        vm.category = `category=${category}`;
        showNews();
    }

    function changeListOfSources(countryId) {
        var url = `https://newsapi.org/v2/sources?country=${countryId}&apiKey=e3194fa27ccf47f4bd010554c2640e14`;

        return $http.get(url)
            .then(getListOfSourcesComplete)
            .catch(getListOfSourcesFailed);

        function getListOfSourcesComplete(response) {
            vm.listOfSources = response.data;
        }

        function getListOfSourcesFailed(error) {
            console.log(error.data);
        }
    }

    function showNews() {
        ctreateUrl();

        var url = `https://newsapi.org/v2/top-headlines?${vm.url}&apiKey=e3194fa27ccf47f4bd010554c2640e14`;

        return $http.get(url)
            .then(getListOfNewsComplete)
            .catch(getListOfNewsFailed);

        function getListOfNewsComplete(response) {
            vm.listOfNews = response.data;
        }

        function getListOfNewsFailed(error) {
            console.log(error.data);
        }
    }

    function ctreateUrl() {
        vm.url = vm.country;

        if(vm.language != ''){
            vm.url = vm.url == '' ? `${vm.language}` : (vm.url + `&${vm.language}`);
        }

        if(vm.sources != ''){
            vm.url = vm.url == '' ? `${vm.sources}` : (vm.url + `&${vm.sources}`);
        }

        if(vm.category != ''){
            vm.url = vm.url == '' ? `${vm.category}` : (vm.url + `&${vm.category}`);
        }
    }

    function setFile() {
        if(vm.template) {
            return 'listOfNews/detailedNews.html';
        } else {
            return 'listOfNews/listOfNews.html';
        }
    }
    
    function showDetailedNews(news) {
        vm.news = news;
        vm.template = true;
    }

    function back() {
        vm.template = false;
    }

    function saveNews(news) {
        $http.post('news/saveNews', news)
            .then(saveNewsComplete)
            .catch(saveNewsFailed);

        function saveNewsComplete(response) {
            alert(response.data);
        }

        function saveNewsFailed(error) {
            console.log(error.data);
        }
    }
}