angular
    .module('app')
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'listOfNews/news.html',
            controller: 'ListOfNewsController',
            controllerAs: 'vm',
            resolve: {
                listOfNews: function(listOfNewsService) {
                    return listOfNewsService.getListOfNews('https://newsapi.org/v2/top-headlines?country=us&apiKey=e3194fa27ccf47f4bd010554c2640e14');
                },
                listOfCountries: function(listOfNewsService) {
                    return listOfNewsService.getListOfNews('json/countries.json');
                },
                listOfSources: function(listOfNewsService) {
                    return listOfNewsService.getListOfNews('https://newsapi.org/v2/sources?country=us&apiKey=e3194fa27ccf47f4bd010554c2640e14');
                },
                languages : function(listOfNewsService) {
                    return listOfNewsService.getListOfNews('json/languages.json');
                }
            }
        })
        .when('/saveNews', {
            templateUrl: 'listOfNews/news.html',
            controller: 'SaveNewsController',
            controllerAs: 'vm',
            resolve: {
                listOfNews: function(listOfNewsService) {
                    return listOfNewsService.getListOfNews('news/saveNews');
                }
            }
        })
        .when('/addNews', {
            templateUrl: 'listOfNews/news.html',
            controller: 'AddNewsController',
            controllerAs: 'vm'
        })
        .when('/myNews', {
            templateUrl: 'listOfNews/news.html',
            controller: 'MyNewsController',
            controllerAs: 'vm',
            resolve: {
                listOfNews: function(listOfNewsService) {
                    return listOfNewsService.getListOfNews('news/myNews');
                }
            }
        });
}