var contentviewer = angular.module('contentViewer', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.tree = [];
    $scope.selectedTag = "LINK";
    $scope.selectedLevel = 3;

    $scope.selectSimilar = function (child) {
        console.log("selected", child);
        $scope.selectedTag = child.tag;
        $scope.selectedLevel = child.level;
    };

    $scope.isSelected = function(index) {
        return $scope.tree[index].tag == $scope.selectedTag && $scope.tree[index].level == $scope.selectedLevel;
    };

    $scope.highlightingClass = function (child) {
        return "col-sm-offset-" + child.level + (child.tag === $scope.selectedChild.tag && child.level == $scope.selectedChild.level) ? " highlighted-item" : "";
    };

    // when submitting the add form, send the text to the node API
    $scope.getContent = function () {
        const url = $scope.formData.url;
        if (url)
            $http.get(url)
                .success(function (data) {
                    $scope.rawContent = data;
                    $scope.tree = [];

                    let parser = new DOMParser();
                    let doc = parser.parseFromString(data, "text/html");
                    let getTagName = item => item.tagName;
                    let getTagNames = ((item, lvl = 0) => {
                        $scope.tree.push({tag: getTagName(item), level: lvl});

                        for (let subitem of item.children)
                            getTagNames(subitem, lvl + 1);
                    });

                    getTagNames(doc);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };
}