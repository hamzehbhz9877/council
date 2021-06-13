export const DashboardChart=(data)=>{

    const dataRegister = {
        labels: data.registerUsers.map(data => data.day),
        datasets: [
            {
                label: "تعداد کاربران ثبت نام شده هفتگی",
                data: data.registerUsers.map(data => data.value),
                borderColor: 'rgb(54,162,235)',
                backgroundColor: "orange"
            }
        ]
    };
    const optionsRegister = {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: .5,
        scales: {
            yAxes: [
                {
                    gridLines: {
                        color: 'rgba(219, 219, 219,.5)'
                    },
                    ticks: {
                        fontSize: 15,
                        fontColor: 'black',
                        fontFamily: "BYekan",
                        callback: (value, index, values) => {
                            return '' + value;
                        }
                    },
                    scaleLabel: {
                        display: false,
                        labelString: '',
                    }
                }
            ],
            xAxes: [
                {
                    gridLines: {
                        color: 'rgb(219, 219, 219,.5)',
                    },
                    ticks: {
                        fontColor: 'black',
                        fontFamily: "BYekan",
                    },
                    scaleLabel: {
                        display: false,
                        labelString: '',
                    }
                }
            ]
        },
        tooltips: {
            displayColors: true,
            backgroundColor: "black",
            enabled: true,
            mode: "single",
            titleAlign:'right',
            // bodyFontSize: 15,
            // bodyFontFamily: "Gamja Flower",
            bodyFontColor: 'rgb(219,219,219)',
            bodyFontFamily: "BYekan",
            titleFontColor: 'white',
            titleFontFamily: "BYekan",
            yPadding: 10,
            xPadding: 15,
            cornerRadius: 4,
            // bodyFontStyle: "bold",
            callbacks: {
                title: (data) => {
                    return data[0].xLabel;
                },
                // label: (tooltipItems, data) => {
                //     return console.log(tooltipItems,data);
                // }
            }
        },
        animation: {
            duration: "1000"
        },
        legend: {
            display: true,
            labels: {
                fontColor: 'black',
                fontFamily: "BYekan",
                fontSize: 16,
            }
        }
    };

    return{dataRegister,optionsRegister}
}