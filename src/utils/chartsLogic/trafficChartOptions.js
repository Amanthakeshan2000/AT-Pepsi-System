export const trafficChartOptions = () => {
    const chartOptions = {
        series: [
            { name: "New Visitors", data: [20, 45, 10, 75, 35, 80, 45, 100, 55, 110, 75, 135], type: "area" },
            { name: "Returning Visitos", data: [25, 60, 20, 90, 45, 100, 65, 125, 75, 135, 90, 145], type: "area" },
        ],
        chart: { type: "area", height: 215, toolbar: { show: !1 }, sparkline: { enabled: !0 } },
        stroke: { curve: "smooth", width: [1.5, 1.5], dashArray: [0, 4], lineCap: "round" },
        fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.2, opacityTo: 0.5, stops: [0, 90, 100] } },
        colors: ["#e49e3d", "#fd7e14"],
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