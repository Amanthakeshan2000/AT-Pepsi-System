export const estimateBarChartTwoOptions = () => {
    const chartOptions = {
        series: [
            {
                name: "Earning",
                data: [
                    { x: "Jan", y: 322 },
                    { x: "Feb", y: 324 },
                    { x: "Mar", y: 329 },
                    { x: "Apr", y: 342 },
                    { x: "May", y: 348 },
                    { x: "Jun", y: 334 },
                    { x: "Jul", y: 325 },
                    { x: "Aug", y: 316 },
                    { x: "Sep", y: 318 },
                    { x: "Oct", y: 330 },
                    { x: "Nov", y: 355 },
                    { x: "Dec", y: 366 },
                ],
            },
            {
                name: "Expense",
                data: [
                    { x: "Jan", y: -162 },
                    { x: "Feb", y: -90 },
                    { x: "Mar", y: -50 },
                    { x: "Apr", y: -77 },
                    { x: "May", y: -35 },
                    { x: "Jun", y: -45 },
                    { x: "Jul", y: -88 },
                    { x: "Aug", y: -120 },
                    { x: "Sep", y: -156 },
                    { x: "Oct", y: -123 },
                    { x: "Nov", y: -88 },
                    { x: "Dec", y: -66 },
                ],
            },
        ],
        chart: { type: "bar", height: 480, stacked: !0, toolbar: { show: !1 } },
        plotOptions: {
            bar: {
                borderRadius: 4,
                // borderRadiusApplication: 'end',
                // borderRadiusApplication: "start",
                // borderRadiusWhenStacked: 'last',
                columnWidth: "15%"
            }
        },
        colors: ["#3454D1", "#FFA21D"],
        dataLabels: { enabled: !1 },
        legend: { labels: { colors: "#A0ACBB" }, fontFamily: "Inter" },
        xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], axisBorder: { show: !1 }, axisTicks: { show: !1 }, labels: { style: { colors: "#A0ACBB", fontFamily: "Inter" } } },
        yaxis: {
            labels: {
                formatter: function (e) {
                    return +e + "K";
                },
                offsetX: 0,
                offsetY: 0,
                style: { color: "#A0ACBB", fontFamily: "Inter" },
            },
        },
        grid: { padding: { top: 0, right: 0, bottom: 30, left: 0 }, xaxis: { lines: { show: !1 } }, yaxis: { lines: { show: !1 } } },
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