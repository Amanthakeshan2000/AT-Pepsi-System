export const hoursSpentChartOption = () => {
    const chartOptions = {
        chart: {
            stacked: !1,
            toolbar: {
                show: !1
            }
        },
        stroke: {
            show: !1
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                borderRadiusApplication:"end",
                columnWidth: "25%",
                distributed: !0,
                dataLabels: {
                    position: "top"
                }
            }
        },
        dataLabels: {
            enabled: !0,
            formatter: function (e) {
                return e + "MIN"
            },
            offsetY: 20,
            style: {
                fontSize: "12px",
                colors: ["#304758"]
            }
        },
        dataLabels: {
            enabled: !1
        },
        colors: ["#E9EDF7", "#E9EDF7", "#E9EDF7", "#3454D1", "#E9EDF7", "#E9EDF7", "#E9EDF7"],
        series: [
            {
                name: "Spent",
                data: [200, 300, 400, 500, 460, 420, 380]
            }
        ],
        markers: {
            size: 0
        },
        xaxis: {
            categories: ["SAT", "SUN", "MON", "THU", "WEN", "THU", "FRI"],
            axisBorder: {
                show: !1
            },
            axisTicks: {
                show: !1
            },
            labels: {
                style: {
                    fontSize: "10px",
                    colors: "#64748b"
                }
            }
        },
        yaxis: {
            min:0,
            max:500,
            tickAmount: 5,
            labels: {
                formatter: function (e) {
                    return +e + "M"
                },
                offsetX: 2,
                offsetY: 0,
                style: {
                    color: "#64748b"
                }
            }
        },
        grid: {
            xaxis: {
                lines: {
                    show: !1
                }
            },
            yaxis: {
                lines: {
                    show: !1
                }
            },
            padding:{
                left:23,
                bottom:0
            }
        },
        tooltip: {
            y: {
                formatter: function (e) {
                    return +e + " MIN"
                }
            },
            style: {
                fontSize: "12px",
                fontFamily: "Inter"
            }
        },
        legend: {
            show: !1,
            labels: {
                fontSize: "12px",
                colors: "#64748b"
            },
            fontSize: "12px",
            fontFamily: "Inter"
        }
    };

    return chartOptions
}