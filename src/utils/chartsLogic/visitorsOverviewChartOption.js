export const visitorsOverviewChartOption = () => {
    const chartOption = {
        chart: {
            height: 370,
            type: "area",
            stacked: !1,
            toolbar: {
                show: !1
            },
        },
        xaxis: {
            categories: ["JAN/22", "FEB/22", "MAR/22", "APR/22", "MAY/22", "JUN/22", "JUL/22"],
            axisBorder: {
                show: !1
            },
            axisTicks: {
                show: !1
            },
            labels: {
                style: {
                    fontSize: "11px",
                    colors: "#64748b"
                }
            },
        },
        yaxis: {
            min: 0,
            max: 100,
            tickAmount: 5,
            labels: {
                formatter: function (e) {
                    return +e + "K";
                },
                offsetX: -15,
                offsetY: 0,
                style: {
                    fontSize: "11px",
                    colors: "#64748b"
                },
            },
        },
        stroke: {
            curve: "smooth",
            width: [1, 1, 1, 1],
            dashArray: [3, 3, 3, 3],
            lineCap: "round"
        },
        grid: {
            padding: {
                left: 10,
                right: 0,
            },
            strokeDashArray: 3,
            borderColor: "#ebebf3",
            row: {
                colors: ["#ebebf3", "transparent"],
                opacity: 0.02
            },
        },
        legend: {
            show: !1
        },
        colors: ["#3454d1", "#25b865", "#d13b4c"],
        dataLabels: {
            enabled: !1
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        series: [
            { name: "Unique Visitors", data: [20, 45, 10, 75, 35, 80, 40], type: "area" },
            { name: "Unique Page Views", data: [25, 60, 20, 90, 45, 100, 55], type: "area" },
            { name: "Unique Impression", data: [30, 40, 15, 70, 30, 85, 45], type: "area" },
        ],
        tooltip: {
            y: {
                formatter: function (e) {
                    return +e + "K";
                },
            },
            style: { fontSize: "12px", fontFamily: "Inter" },
        },
    }

    return chartOption
}