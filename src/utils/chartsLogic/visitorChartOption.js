export const visitorChartOption = () => {
    const chartOptions = {
        series: [
            { name: "New Visitors", data: [18, 21, 40, 28, 31, 47, 51, 32, 45, 36, 65, 26] },
            { name: "Retuning Visitors", data: [30, 11, 23, 18, 32, 30, 36, 15, 58, 45, 22, 34] },
        ],
        chart: { height: 350, type: "area", toolbar: { show: !1 } },
        stroke: { curve: "smooth", width: 2 },
        colors: ["#3454D1", "#FFA21D"],
        dataLabels: { enabled: !1 },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            axisBorder: { show: !1 },
            axisTicks: { show: !1 },
            labels: { style: { fontFamily: "Inter", fontSize: "11px", colors: "#64748b" } },
        },
        yaxis: {
            labels: {
                formatter: function (e) {
                    return +e + "K";
                },
                offsetX: -22,
                offsetY: 0,
                style: { fontFamily: "Inter", fontSize: "11px", color: "#64748b" },
            },
        },
        fill: { type: "gradient", gradient: { shadeIntensity: 1, inverseColors: !1, opacityFrom: 0.45, opacityTo: 0.05, stops: [20, 100, 100, 100] } },
        markers: { size: 3, strokeWidth: 3, hover: { size: 4, sizeOffset: 2 } },
        legend: { show: !1 },
        grid: { padding: { left: 0, right: 0 }, strokeDashArray: 3, borderColor: "#ebebf3", row: { colors: ["#ebebf3", "transparent"], opacity: 0.02 } },
    }
    return chartOptions
}