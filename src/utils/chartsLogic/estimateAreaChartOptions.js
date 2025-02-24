export const estimateAreaChartOptions = () => {
    const chartOptions = {
        chart: { type: "area", height: 100, sparkline: { enabled: !0 } },
        dataLabels: { enabled: !1 },
        // colors: ["#93a9ff"],
        fill: { type: "solid", opacity: 0.4 },
        stroke: { curve: "smooth", width: 3 },
        // series: [{ name: "Total Sales", data: [20, 10, 18, 12, 25, 10, 20] }],
        yaxis: { min: 0, max: 30 },
        tooltip: {
            theme: "dark",
            fixed: { enabled: !1 },
            x: { show: !1 },
            y: {
                title: {
                    // formatter: function (e) {
                    //     return "Total Sales";
                    // },
                },
            },
            marker: { show: !1 },
        },
        // grid:{
        //     padding:{
        //         top:10
        //     }
        // }
    }
    return chartOptions
}