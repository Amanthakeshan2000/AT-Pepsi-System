
export const inquiryChannelChartOption = () => {
    const chartOptions = {
        chart: {
            type: "bar",
            height: 350,
            stacked: !0,
            toolbar: {
                show: !1
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 5,
                columnWidth: "20%",
                horizontal: !1
            }
        },
        colors: ["#283c50", "#3454d1", "#fb8500", "#25b865", "#ffb703"],
        series: [
            {
                name: "Leads", data: [4, 5, 4, 6, 3, 4, 5, 4, 6, 3, 4, 5]
            },
            {
                name: "Active", data: [3, 4, 3, 6, 5, 3, 3, 6, 2, 5, 4, 3]
            },
            {
                name: "Pending", data: [4, 5, 4, 6, 3, 4, 5, 4, 6, 3, 4, 6]
            },
            {
                name: "Resolved", data: [4, 5, 4, 6, 3, 4, 5, 4, 6, 3, 4, 5]
            },
            {
                name: "Calcelled", data: [4, 5, 4, 6, 3, 4, 5, 4, 6, 3, 4, 5]
            }
        ],
        xaxis: {
            categories: ["JAN/22", "FEB/22", "MAR/22", "APR/22", "MAY/22", "JUN/22", "JUL/22", "AUG/22", "SEP/22", "OCT/22", "NOV/22", "DEC/22"],
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
            max:35,
            tickAmount: 5,
            labels: {
                formatter: function (e) {
                    return +e + " K"
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
        dataLabels: {
            enabled: !1
        },
        tooltip: {
            intersect:false,
            shared: !0,
            inverseOrder: !0,
            y: {
                formatter: function (e) {
                    return +e + " GB"
                }
            },
            style: {
                fontSize: "11px",
                fontFamily: "Inter"
            }
        },
        legend: {
            show: !0,
            position: "top",
            horizontalAlign: "left",
            fontSize: "12px",
            fontFamily: "Inter",
            labels: {
                fontSize: "12px",
                colors: "#64748b"
            },
            markers: {
                shape:"circle",
            },
            itemMargin: {
                horizontal: 5,
                vertical: 15
            }
        }
    }

    return chartOptions
}

