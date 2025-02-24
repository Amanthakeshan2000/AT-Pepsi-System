export const webAnalyticsChartOptions = () => {
    const chartOptions = {
        chart: { type: "bar", height: 425, toolbar: { show: !1 } },
        series: [
            { name: "New Visitors", data: [44, 55, 41, 64, 22, 43, 21, 41, 64, 22, 43, 21] },
            { name: "Returning Visitors", data: [53, 32, 33, 52, 13, 44, 32, 33, 52, 13, 44, 32] },
        ],
        plotOptions: {
            bar: {
                horizontal: !1,
                borderRadius: 4,
                borderRadiusApplication: "end",
                columnWidth: "25%"
            }
        },
        dataLabels: { enabled: !1, offsetX: -6, style: { fontSize: "12px", colors: ["#fff"] } },
        stroke: { show: !1, width: 1, colors: ["#fff"] },
        colors: ["#E1E3EA", "#3454d1"],
        xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], axisBorder: { show: !1 }, axisTicks: { show: !1 }, labels: { style: { colors: "#64748b", fontFamily: "Inter" } } },
        yaxis: {
            labels: {
                formatter: function (e) {
                    return +e + "K";
                },
                offsetX: -22,
                offsetY: 0,
                style: { color: "#64748b", fontFamily: "Inter" },
            },
        },
        grid: { padding: { top: 0, right: 0, bottom: 30, left: 0 }, strokeDashArray: 3, borderColor: "#e9ecef" },
        tooltip: {
            y: {
                formatter: function (e) {
                    return +e + "K";
                },
            },
            style: { colors: "#64748b", fontFamily: "Inter" },
        },
        legend: { show: !0, labels: { colors: "#64748b" }, fontFamily: "Inter" },
    }
    return chartOptions
}