angular
    .module('app')
    .factory('listOfNewsService', listOfNewsService);

function listOfNewsService($http) {
    return {
        getListOfNews: getListOfNews
    };

    function getListOfNews(url) {
        return $http.get(url)
            .then(getListOfNewsComplete)
            .catch(getListOfNewsFailed);

        function getListOfNewsComplete(response) {
            return response.data;
        }

        function getListOfNewsFailed(error) {
            logger.error(error.data);
        }
    }
}