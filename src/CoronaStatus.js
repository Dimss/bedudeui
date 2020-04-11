import React from "react";

import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util,
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
        if (process.env.REACT_APP_PROFILE === 'dev') this.API = "https://localhost:5001";
        this.state = { coronaStatusData: null }
    }

    componentWillMount = () => {
        this.loadCoronaStatusData()
    }

    loadCoronaStatusData = () => {
        fetch(`${this.API}/api/coronastatus`).then((response) => {
            return response.json()
        }).then((data) => {
            this.setState({
                coronaStatusData: data
            })
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    render() {
        console.log(this.state.coronaStatusData);
        return (

            < Chart height={600} data={this.state.coronaStatusData} scale={cols} forceFit >
                <Legend />
                <Axis name="date" />
                <Axis name="quantity" />
                <Tooltip
                    crosshairs={{
                        type: 'y',
                    }}
                />
                <Geom
                    type="line"
                    position="date*quantity"
                    size={2}
                    color={['quantityType', (quantityType) => {
                        //some code
                        if (quantityType == 'deaths') {
                            return '#ff7875';
                        }
                        if (quantityType == 'recovered') {
                            return '#95de64';
                        }
                        if (quantityType == 'active') {
                            return '#ffc53d';
                        }

                    }]}
                />
                <Geom
                    type="point"
                    position="date*quantity"
                    size={4}
                    shape={'circle'}
                    color={['quantityType', (quantityType) => {
                        //some code
                        if (quantityType == 'deaths') {
                            return '#ff7875';
                        }
                        if (quantityType == 'recovered') {
                            return '#95de64';
                        }

                        if (quantityType == 'active') {
                            return '#ffc53d';
                        }

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