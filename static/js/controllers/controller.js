app.controller('RatingController', ['$scope', '$http', 'leafletData', function ($scope, $http, leafletData) {


    avg = function (arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += parseInt(arr[i], 10); //don't forget to add the base
        }

        var avg = sum / arr.length;
        return avg;
    };


    $scope.ratingYears= ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016'];
    $scope.selectedYear = $scope.ratingYears[0];


    $scope.streets = [];
    $http.get('/streetNames').success(function (response, status, headers, config) {
        response.forEach(function (data) {
            $scope.streets.push(data.streetName);
        });
    });

    $scope.loadTable = function () {
        $http.get('/potHolesByStreet').success(function (response, status, headers, config) {
            var streetPotMap = {};
            response.forEach(function (data0) {
                streetPotMap[data0.streetID] = data0.potholesCnt;
                $scope.test(streetPotMap);
            });
        });

        var data = {
            'year': $scope.selectedYear,
        };
        var config = {
            params: data,
            headers: {'Accept': 'application/json'}
        };
        $scope.roadRatings = [];


        $http.get('/roadRatingsByYear', config).success(function (response, status, headers, config) {
            response.forEach(function (data) {
                var data1 = {
                    crackCnt: Math.round(avg(data.crack)),
                    patchCnt: Math.round(avg(data.patch)),
                    overallCnt: Math.round(avg(data.overall)),
                    streetName: data.streetName
                }
                $scope.roadRatings.push(data1);
            });
        });

    };
    $scope.loadTable();

    $scope.test = function (test) {
        console.log(test);
        $scope.streetPotMap = test;
    };

}]);

app.controller('OverviewController', ['$scope', '$http', function ($scope, $http) {


    $scope.potholesBarchart = "potholes_barchart";
    $scope.potholesBarchartDesc = "This chart illustrates the number of potholes fixed each month since April 2016.";

    $scope.potholesDotchart = "potholes_dotchart";
    $scope.potholesDotchartDesc = "The chart shows hour by distribution of day of the week(potholes fixed)";

    $scope.potholesHeatMap = "potholes_heatmap";
    $scope.potholesHeatMapDesc = "The following calendar heat map details the dates when potholes were fixed since April 2016. "

    $scope.ratingsLineBreakDown = "roadRating_breakdown";
    $scope.ratingsLineBreakDownDesc = "Road ratings broken down by condition based on the criteria:<br><br>" +
        " 1) Good – Road Ratings larger than 7. <br>" +
        " 2) Fair – Road Ratings equal to 6 or 7.<br>" +
        " 3) Bad – Road Ratings smaller than 6.";

    $scope.tempRoadPlots = "tempRoadPlot";
    $scope.tempRoadPlotsDesc = "From our research, road condition can be related to traffic volume and weather.<br><br>" +
        "The lack of traffic volume data makes it difficult to build the model and test our theory with real data.<br><br>" +
        "We used snowfall and temperature as measures of the severity of the winter and road condition (Good, Fair, Bad)" +
        "as a measure of road surface condition. However, we did not find there is a strong correlation between the variables.";


    $scope.ratingsLineChart = "ratings_linechart";
    $scope.ratingsLineChartDesc = "A closer look of road condition changes categorized by range of road ratings.<br><br>" +
        "During 2000 to 2004, road condition has been gradually improving. Moving into a new decade, the number of good roads has been decreasing while number of bad roads goes up.";


    $scope.overlayBarchart = "barchart_overlay";
    $scope.overlayBarchartDesc = "What happened during 2000 to 2004? <br><br>" + "By looking at the road overlay data, we came up with an assumption:  The intensive maintenance projects during that period leads to the increase.";

    $scope.tempRoadPlots = "tempRoadPlot";
    $scope.tempRoadPlotsDesc = " Other factors affecting road quality: traffic volume and weather.<br><br>" +
        "The lack of traffic volume data makes it difficult to build the model and test our theory with real data<br><br>" +
        "To demonstrate a proof of concept, we used snowfall and temperature as measures of the severity of the winter, and road condition (i.e., Good, Fair, Bad)" +
        "as a measure of road surface condition. However, we did not find a strong correlation between the variables.";


}]);

app.controller('PredictionController', ['$scope', '$http', function ($scope, $http) {

    $scope.roadRatingOverlay = "roadRating_overlay";
    $scope.roadRatingOverlayDesc = "Overlay is the highest form of street maintenance.<br><br>" + "Properly maintained, an overlay can extend the life of the street by 20-25 years although heavily used streets may require more frequent overlays.<br><br>" +
        "The chart below shows the average ratings for roads that were overlayed in the specific year (the start point of the line) respectively.";

    $scope.tempPredictPlot = "tempPrediction";
    $scope.tempPredictPlotDesc = "How many years can overlay actually extend the life of streets in Syracuse?<br><br>" +
        "Because the road rating data of previous years was not available, we created a linear growth model to simulate the lifespan of the asphalt surface in Syracuse.<br><br>" +
        "To generate the model with high confidence level with sufficient sample size, we only looked at roads overlaid from 2000 to 2004.<br><br>" +
        "From the model below, we estimate that each road pavement can last approximately 18-20 years before requiring a next overlay.";
}]);

app.controller('PredictionController', ['$scope', '$http', function ($scope, $http) {

    $scope.roadRatingOverlay = "roadRating_overlay";
    $scope.roadRatingOverlayDesc = "Overlay is the highest form of street maintenance.<br><br>" + "Properly maintained, an overlay can extend the life of the street by 20-25 years although heavily used streets may require more frequent overlays.<br><br>" +
        "The chart below shows the average ratings for roads that were overlayed in the specific year (the start point of the line) respectively.";

    $scope.tempPredictPlot = "tempPrediction";
    $scope.tempPredictPlotDesc = "How many years can overlay actually extend the life of streets in Syracuse?<br><br>" +
        "Because the road rating data of previous years was not available, we created a linear growth model to simulate the lifespan of the asphalt surface in Syracuse.<br><br>" +
        "To generate the model with high confidence level with sufficient sample size, we only looked at roads overlaid from 2000 to 2004.<br><br>" +
        "From the model below, we estimate that each road pavement can last approximately 18-20 years before requiring a next overlay.";


}]);
