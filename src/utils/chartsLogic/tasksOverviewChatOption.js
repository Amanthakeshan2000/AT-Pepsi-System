export const tasksOverviewChartOption = () => {
    const chartOptions =
    {
        chart: {
            type: "area",
            height: 100,
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
                opacityTo: .75,
                stops: [0, 90, 100]
            }
        },
        grid: {
            show: !1
        },
        legend: {
            show: !1
        },
        dataLabels: {
            enabled: !1
        },
        xaxis: {
            categories: ["SUN", "MON", "TUE", "WEN", "THU", "FRI", "SAR"],
            axisBorder: {
                show: !1
            },
            axisTicks: {
                show: !1
            }
        },
        tooltip: {
            y: {
                formatter: function (e) {
                    return +e + "Tasks"
                }
            },
            style: {
                fontSize: "12px",
                colors: "#A0ACBB",
                fontFamily: "Inter"
            }
        }
    }

    return chartOptions
}