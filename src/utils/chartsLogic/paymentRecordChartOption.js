export const paymentRecordChartOption = () => {
    const chartOptions = {
        chart: {
            width: "100%",
            stacked: !1,
            toolbar: {
                show: !1
            },
        },
        stroke: {
            width: [1, 2, 3],
            curve: "smooth",
            lineCap: "round"
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: "end",
                columnWidth: "29%"
            }
        },
        colors: ["#3454d1", "#a2acc7", "#E1E3EA"],
        series: [
            {
                name: "Payment Rejected",
                type: "bar",
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 21]
            },
            {
                name: "Payment Completed",
                type: "line",
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 41]
            },
            {
                name: "Awaiting Payment",
                type: "bar",
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 56]
            }
        ],
        fill: {
            opacity: [.85, .25, 1, 1],
            gradient: {
                inverseColors: !1,
                shade: "light",
                type: "vertical",
                opacityFrom: .5,
                opacityTo: .1,
                stops: [0, 100, 100, 100]
            }
        },
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
                    colors: "#A0ACBB"
                }
            },
        },
        yaxis: {
            labels: {
                formatter: function (e) {
                    return +e + "K"
                },
                offsetX: 0,
                offsetY: 0,
                style: {
                    colors: "#A0ACBB"
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
            padding: {
                left: 35,
                right:28
            },
        },
        dataLabels: {
            enabled: !1
        },
        tooltip: {
            // intersect:false,
            // shared: !0,
            // inverseOrder: !0,
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
                colors: "#A0ACBB"
            },
            fontSize: "12px",
            fontFamily: "Inter"
        }
    };
    return chartOptions
}