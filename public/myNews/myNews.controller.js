angular
    .module('app')
    .controller('MyNewsController' , MyNewsController);

function MyNewsController($http, listOfNews) {
    var vm = this;
    vm.template = false;
    vm.listOfNews = listOfNews;
    vm.setFile = setFile;
    vm.deleteNews = deleteNews;
    vm.showDetailedNews = showDetailedNews;
    vm.back = back;

    function setFile() {
        if(vm.template) {
            return 'addNews/detailedNews.html';
        } else {
            return 'myNews/listOfMyNews.html';
        }
    }

    function deleteNews(news) {
        $http.post('news/deleteMyNews', news)
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
        vm.title = news.title;
        vm.text = news.text;
        vm.template = true;
    }

    function back() {
        vm.template = false;
    }
}