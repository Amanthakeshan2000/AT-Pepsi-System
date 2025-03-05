export const marketingCampaignChartOptions = () => {
    const chartOptions = {
        chart: {
            toolbar: { show: !1 }
        },
        series: [
            {
                name: "Online Campaign",
                data: [44, 55, 41, 64, 22, 43, 21, 41, 64, 22, 43, 21]
            },
            {
                name: "Offline Campaign",
                data: [53, 32, 33, 52, 13, 44, 32, 33, 52, 13, 44, 32]
            },
        ],
        plotOptions: {
            bar: {
                horizontal: !1,
                borderRadius: 5,
                borderRadiusApplication: "end",
                columnWidth: "30%"
            },
            series: {
                dataLabels: {
                    borderColor: 'transparent' // Remove the border around the dots
                }
            }
        },
        dataLabels: {
            enabled: !1,
            offsetX: -6,
            style: {
                fontSize: "12px",
                colors: ["#fff"]
            }
        },
        stroke: {
            show: !1,
            width: 1,
            colors: ["#fff"]
        },
        colors: ["#E1E3EA", "#3454d1"],
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            axisBorder: {
                show: !1
            },
            axisTicks: {
                show: !1
            },
            labels: {
                style: {
                    colors: "#64748b",
                    fontFamily: "Inter"
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (e) {
                    return +e + "K";
                },
                offsetX: 6,
                style: {
                    colors: "#64748b",
                    fontFamily: "Inter"
                },
            },
            
        },
        grid: {
            strokeDashArray: 3,
            borderColor: "#e9ecef",
            padding: {
                left: 20,
                right: 0
            },
        },
        tooltip: {
            y: {
                formatter: function (e) {
                    return +e + "K";
                },
            },
            style: {
                colors: "#64748b",
                fontFamily: "Inter"
            },
        },
        legend: {
            show: !1,
            fontFamily: "Inter",
            labels: {
                colors: "#64748b"
            }
        },
    }
    return chartOptions
}