export const sellingStatusChartOptions = () => {
    const chartOptions = {
        series: [{ name: "Selling Status", data: [25, 60, 20, 90, 45, 100, 55] }],
        chart: { type: "area", height: 215, toolbar: { show: !1 }, sparkline: { enabled: !0 } },
        stroke: { width: 1, curve: "smooth" },
        fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.2, opacityTo: 0.5, stops: [0, 90, 100] } },
        colors: ["#17a2b8"],
        grid: { show: !1 },
        legend: { show: !1 },
        dataLabels: { enabled: !1 },
        tooltip: {
            theme: "dark",
            y: {
                formatter: function (e) {
                    return +e + "K";
                },
            },
            style: { colors: "#A0ACBB", fontFamily: "Roboto" },
        },
    }
    return chartOptions
}