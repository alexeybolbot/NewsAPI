angular
    .module('app')
    .controller('AddNewsController' , AddNewsController);

function AddNewsController($http) {
    var vm = this;
    vm.template = false;
    vm.setFile = setFile;
    vm.showDetailedNews = showDetailedNews;
    vm.addNews = addNews;
    vm.back = back;

    function setFile() {
        if(vm.template) {
            return 'addNews/detailedNews.html';
        } else {
            return 'addNews/addNews.html';
        }
    }

    function showDetailedNews() {
        vm.template = true;
    }

    function back() {
        vm.template = false;
    }
    
    function addNews(form) {
        if(form.$valid){
            $http.post('news/addNews', {title: vm.title, text: vm.text})
                .then(addNewsComplete)
                .catch(addNewsFailed);

            function addNewsComplete(response) {
                alert(response.data);
            }

            function addNewsFailed(error) {
                console.log(error.data);
            }
        }
    }
}