export const topCountryClickChartOptions = () => {
    const chartOptions = {
        chart: { width: 300, type: "donut" },
        dataLabels: {
            enabled: !1
        },
        labels: ["Australia", "United State", "Bangladesh"],
        series: [64, 25, 45],
        stroke: { width: 0 },
        legend: { show: !1 },
        colors: ["#FF9F43", "#DC3545", "#3454D1"],
        plotOptions: {
            pie: {
                donut: {
                    size: "80%"
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (e) {
                    return +e + "K";
                },
            },
            style: { fontSize: "11px", fontFamily: "Inter" },
        },
    }
    return chartOptions
}