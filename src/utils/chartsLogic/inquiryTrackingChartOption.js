export const inquiryTrackingChartOption = () => {
    const chartOptions = {
        chart: {
            height: 350,
            width: "100%",
            stacked: !1,
            type: "bar",
            toolbar: {
                show: !1
            }
        },
        stroke: {
            show: !1
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication:"end",
                columnWidth: "30%",
                distributed: !1,
                dataLabels: {
                    position: "top"
                }
            }
        },
        dataLabels: {
            enabled: !0,
            formatter: function (e) {
                return e + "K"
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
        colors: ["#3454D1", "#e5e7eb"],
        series: [{
            name: "New",
            data: [20, 30, 40, 50, 46, 42, 38, 34, 30, 28, 26, 25]
        },
        {
            name: "Resolved",
            data: [15, 25, 35, 45, 41, 38, 33, 28, 23, 18, 13, 10]
        }
        ],
        markers: {
            size: 0
        },
        xaxis: {
            categories: ["JAN/23", "FEB/23", "MAR/23", "APR/23", "MAY/23", "JUN/23", "JUL/23", "AUG/23", "SEP/23", "OCT/23", "NOV/23", "DEC/23"],
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
            min: 0,
            max: 50,
            tickAmount: 5,
            labels: {
                formatter: function (e) {
                    return +e + "K"
                },
                offsetX: 0,
                offsetY: 0,
                style: {
                    colors: "#64748b"
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
                left:20,
                right:-10
            }
        },
        tooltip: {
            y: {
                formatter: function (e) {
                    return +e + "K"
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
    }
    return chartOptions
}

