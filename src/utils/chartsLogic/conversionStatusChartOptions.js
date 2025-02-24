export const conversionStatusChartOptions = () => {
    const chartOptions = {
        series: [{ name: "Conversion Status", data: [44, 75, 41, 70, 52, 76, 51, 71, 55, 82, 55, 82] }],
        chart: { type: "bar", height: 200, toolbar: { show: !1 } },
        plotOptions: {
            bar: {
                horizontal: !1,
                borderRadius: 3,
                borderRadiusApplication: "end",
                endingShape: "rounded",
                columnWidth: "20%"
            }
        },
        colors: ["#fff"],
        grid: { show: !1 },
        legend: { show: !1 },
        dataLabels: { enabled: !1 },
        xaxis: { categories: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], labels: { show: !0, style: { colors: "#fff", fontFamily: "Roboto" } }, axisBorder: { show: !1 } },
        yaxis: { labels: { show: !1 } },
        tooltip: {
            theme: "dark",
            y: {
                formatter: function (e) {
                    return +e + "K";
                },
            },
            style: { colors: "#000", fontFamily: "Roboto" },
        },
    }
    return chartOptions
}