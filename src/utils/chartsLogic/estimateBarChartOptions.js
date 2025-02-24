export const estimateBarChartOptions = () => {
    const chartOptions = {
        chart: { stacked: !0, toolbar: { show: !1 } },
        plotOptions: {
            bar: {
                borderRadius: 3,
                borderRadiusApplication: "end",
                columnWidth: "20%"
            }
        },
        grid: { show: !1 },
        grid: {
            padding: { top: 0, right: 20, bottom: 0, left: 10 },
            xaxis: { lines: { show: !1 } }, yaxis: { lines: { show: !1 } }
        },
        legend: { show: !1 },
        // colors: ["#3454D1"],
        dataLabels: { enabled: !1 },
        stroke: { curve: "smooth" },
        // series: [{ name: "Income", data: [40, 55, 45, 58, 47, 61, 49, 65, 54, 69, 57, 73] }],
        xaxis: { show: !1, axisBorder: { show: !1 }, axisTicks: { show: !1 }, labels: { show: !1, style: { colors: "#A0ACBB", fontFamily: "Inter" } } },
        yaxis: { labels: { show: !1 } },
        tooltip: {
            y: {
                formatter: function (e) {
                    return +e + "K";
                },
            },
            style: { colors: "#A0ACBB", fontFamily: "Inter" },
        },
    }
    return chartOptions
}