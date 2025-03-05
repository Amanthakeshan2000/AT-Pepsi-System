export const billableTimeChartOption = () => {
    const chartOptions = {
        chart: {
            height: 350, width: "100%",
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
                borderRadiusApplication: "end",
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
                return e + " Mins"
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
        colors: ["#e5e7eb", "#3454D1"],
        series: [
            {
                name: "Total Time",
                data: [20, 30, 40, 50, 46, 42, 38, 34, 30, 28, 26, 25]
            },
            {
                name: "Billable Time",
                data: [15, 25, 35, 45, 41, 38, 33, 28, 23, 18, 13, 10]
            }
        ],
        markers: {
            size: 0
        },
        xaxis: {
            categories: ["08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30"],
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
            tickAmount: 5,
            labels: {
                formatter: function (e) {
                    return +e + " Mins"
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
            padding: {
                left: 20,
                right: -5
            }
        },
        tooltip: {
            y: {
                formatter: function (e) {
                    return +e + " Mins"
                }
            },
            style: {
                fontSize: "12px",
                fontFamily: "Inter"
            }
        },
        legend: {
            show: !1, labels: {
                fontSize: "12px",
                colors: "#64748b"
            },
            fontSize: "12px",
            fontFamily: "Inter"
        }
    }
    return chartOptions
}