export const deviceUseChartOptions = () => {
    const chartOptions = {
        chart: {
            width: 270,
            type: "donut"
        },
        dataLabels: { enabled: !1 },
        stroke: { width: 0, lineCap: "round" },
        // labels: ["Desktop", "Tablet", "Mobile", "Others"],
        // series: [64, 25, 45, 15],
        // colors: ["#FF9F43", "#475e77", "#DC3545", "#3454D1"],
        legend: {
            show: !1,
            position:
                "bottom",
            fontFamily: "Inter",
            fontWeight: 500,
            labels: {
                colors: "#64748b",
                fontFamily: "Inter"
            },
            markers: {
                width: 10,
                height: 10
            },
            itemMargin: {
                horizontal: 20,
                vertical: 5
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "80%",
                    labels: {
                        show: !1,
                        name: {
                            show: !1,
                            fontSize: "16px",
                            colors: "#64748b",
                            fontFamily: "Inter"
                        },
                        value: {
                            show: !1,
                            fontSize: "30px",
                            fontFamily: "Inter",
                            color: "#64748b",
                            formatter: function (e) {
                                return e;
                            },
                        },
                    },
                },
            },
        },
        responsive: [
            {
                breakpoint: 380,
                options: {
                    chart: {
                        width: 280
                    },
                    legend: {
                        show: !1
                    }
                }
            }
        ],
        tooltip: {
            y: {
                formatter: function (e) {
                    return +e + "K";
                },
            },
            style: { colors: "#64748b", fontFamily: "Inter" },
        },
    }
    return chartOptions
}