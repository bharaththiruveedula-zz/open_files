/**
 * 
 */
var arr1 = [20, 40, 3, 5, 4, 10, 12];
$(function () {
        $('#area_chart').highcharts({
            chart: {
                type: 'areaspline'
            },
            title: {
                text: 'HO Failure'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF'
            },
            xAxis: {
                categories: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday'
                ],
                plotBands: [{ // visualize the weekend
                    from: 4.5,
                    to: 6.5,
                    color: 'rgba(68, 170, 213, .2)'
                }]
            },
            yAxis: {
                title: {
                    text: 'HO failure'
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' units'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: [{
                name: '101',
                data: arr1
            }, {
                name: '110',
                data: [1, 3, 4, 3, 3, 5, 4]
            },
            {
                name: '120',
                data: [10, 30, 40, 30, 30, 50, 40]
            }
            ]
        });
    });
    
