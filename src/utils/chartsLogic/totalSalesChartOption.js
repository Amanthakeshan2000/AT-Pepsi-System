
export const totalSalesChartOption = () => {
    const chartOptions = {
        chart: {
            type: "area",
            height: 150,
            sparkline: {
                enabled: !0
            }
        },
        dataLabels: {
            enabled: !1
        },
        colors: ["#93a9ff"],
        fill: {
            type: "solid", opacity: .4
        },
        stroke: {
            curve: "smooth", width: 3
        },
        series: [{
            name: "Total Sales",
            data: [20, 10, 18, 12, 25, 10, 20]
        }
        ],
        yaxis: {
            min: 0, max: 30
        },
        tooltip: {
            theme: "dark", y: {
                formatter: function (e) {
                    return +e + "K"
                }
            },
            style: {
                fontSize: "12px", fontFamily: "Inter"
            }
        }
    }
    return chartOptions
}
