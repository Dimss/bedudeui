import React from "react";

import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
    Guide,
} from 'bizcharts';

const { Line } = Guide;


const cols = {
    month: {
        range: [0, 1],
    },
};

export default class CoronaStatus extends React.Component {

    constructor(props) {
        super(props)
        this.API = "";
        this.state = { coronaStatusData: null }
    }

    componentWillMount = () => {
        this.loadCoronaStatusData()
    }

    loadCoronaStatusData = () => {
        fetch(`${this.API}/api/corona`).then((response) => {
            return response.json()
        }).then((data) => {
            let chartData = []
            data.forEach((record) => {
                if (record.date == "0001-01-01T00:00:00Z") return;
                record.date = record.date.substring(0, record.date.indexOf("T"))
                chartData.push(record);
            })
            this.setState({
                coronaStatusData: chartData
            })
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    render() {
        return (

            < Chart height={600} data={this.state.coronaStatusData} scale={cols} forceFit >
                <Legend />
                <Axis name="date" />
                <Axis name="cases" />
                <Tooltip
                    crosshairs={{
                        type: 'y',
                    }}
                />
                <Geom
                    type="line"
                    position="date*cases"
                    size={2}
                    color={['status', (quantityType) => {
                        //some code
                        if (quantityType == 'deaths') {
                            return '#ff7875';
                        }
                        // if (quantityType == 'recovered') {
                        //     return '#95de64';
                        // }
                        // if (quantityType == 'confirmed') {
                        //     return '#ffc53d';
                        // }

                    }]}
                />
                <Geom
                    type="point"
                    position="date*cases"
                    size={4}
                    shape={'circle'}
                    color={['status', (quantityType) => {
                        if (quantityType == 'deaths') {
                            return '#ff7875';
                        }
                        // if (quantityType == 'recovered') {
                        //     return '#95de64';
                        // }

                        // if (quantityType == 'confirmed') {
                        //     return '#ffc53d';
                        // }

                    }]}
                    style={{
                        stroke: '#fff',
                        lineWidth: 1,
                    }}
                />

            </Chart >
        )
    }
}