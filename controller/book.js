app.controller('bookctrl',function($scope,$http){
    $scope.listbook=[];
    $scope.deleteb=function(id){
        if(confirm('xóa?')){
            $http.delete(`http://localhost:3000/books/${id}`).then(
                function(res){
                    if(res.status==200){
                        $scope.listbook=res.data
                        alert('xóa thành công')
                    }
                },
                function(res){alert('không thể xóa')}
            )
        }
    }
    $http.get(`http://localhost:3000/books`).then(
        function(res){
            if(res.status==200){
                console.log(res);
                $scope.listbook=res.data
            }
        },
        function(res){alert('không thể lấy dữ liệu')}
    )
})
app.controller("editctrl",function($scope,$http,$routeParams){
$scope.oneb=[];
$scope.id=$routeParams.id;
$http.get(`http://localhost:3000/books/${$scope.id}`).then(
    function(res){
        if(res.status==200){
            console.log(res);
            $scope.oneb=res.data
        }
    },
    function(res){alert('không thể lấy dữ liệu')}
)
$scope.editb= function(){
    $http.put(`http://localhost:3000/books/${$scope.id}`,{
        name:$scope.oneb.name,
        author:$scope.oneb.author,
        price:$scope.oneb.price,
    }).then(
        function(res){
            alert('sửa thành công')
            return document.location='#!book'
        },
        function(res){alert('không thể sửa sách')},
    )
}
})
app.controller('addctrl',function($scope,$http,){
    $scope.name=''
    $scope.author=''
    $scope.price=''
  
    $scope.addb= function(){
        $http.post(`http://localhost:3000/books`,{
            name:$scope.name,
            author:$scope.author,
            price:$scope.price,
        }).then(
            function(res){
                alert('thêm thành công')
                return document.location='#!book'
            },
            function(res){alert('không thể thêm sách')},
        )
    }
})