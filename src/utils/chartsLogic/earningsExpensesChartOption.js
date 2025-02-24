export const earningsExpensesChartOption = () => {
    const chartOptions = {
        // series: [{
        //     name: "Earnings",
        //     data: [25, 60, 20, 90, 45, 100, 55]
        // }],
        chart: {
            type: "area",
            height: 125,
            toolbar: {
                show: !1
            },
            sparkline: {
                enabled: !0
            }
        },
        stroke: {
            width: 2,
            curve: "smooth"
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: .2,
                opacityTo: .5,
                stops: [0, 90, 100]
            }
        },
        // colors: ["#25b865"],
        grid: {
            show: !1,
            padding:{
                top:22
            }
        },
        legend: {
            show: !1
        },
        dataLabels: {
            enabled: !1
        },
        tooltip: {
            y: {
                formatter: function (e) {
                    return +e + "K"
                }
            },
            style: {
                colors: "#64748b", fontFamily: "Inter"
            }
        }
    }
    return chartOptions
}

