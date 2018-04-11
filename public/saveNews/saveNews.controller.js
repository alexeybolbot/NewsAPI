angular
    .module('app')
    .controller('SaveNewsController' , SaveNewsController);

function SaveNewsController($http, listOfNews) {
    var vm = this;
    vm.template = false;
    vm.listOfNews = listOfNews;
    vm.setFile = setFile;
    vm.deleteNews = deleteNews;
    vm.showDetailedNews = showDetailedNews;
    vm.back = back;

    function setFile() {
        if(vm.template) {
            return 'listOfNews/detailedNews.html';
        } else {
            return 'saveNews/listOfSaveNews.html';
        }
    }

    function deleteNews(news) {
        $http.post('news/deleteNews', news)
            .then(deleteNewsComplete)
            .catch(deleteNewsFailed);

        function deleteNewsComplete(response) {
            vm.listOfNews = vm.listOfNews.filter(s => s._id != news._id);
            alert(response.data);
        }

        function deleteNewsFailed(error) {
            console.log(error.data);
        }
    }

    function showDetailedNews(news) {
        vm.news = news;
        vm.template = true;
    }

    function back() {
        vm.template = false;
    }
}