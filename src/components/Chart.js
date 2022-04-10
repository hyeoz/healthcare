import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { getHost } from "../utils/Util";

const ChartBlock = () => {
    const [chartData, setChartData] = useState();

    const getChartData = async () => {
        try {
            const res = await axios.get(`${getHost()}/patient/stats`);
            setChartData(res.data.stats);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };

    useEffect(() => {
        getChartData();
    }, []);

    const genderOptions = {
        labels: ["F", "M"],
        title: {
            text: "성별",
            align: "left",
        },
    };
    const raceOptions = {
        labels: ["F", "M"],
        title: {
            text: "인종",
            align: "left",
        },
    };
    const ethnicityOptions = {
        labels: ["F", "M"],
        title: {
            text: "민족",
            align: "left",
        },
    };
    const grOptions = {
        labels: ["F", "M"],
        title: {
            text: "성별+인종",
            align: "left",
        },
    };
    const geOptions = {
        labels: ["F", "M"],
        title: {
            text: "성별+민족",
            align: "left",
        },
    };

    return (
        <Container>
            <div style={{ margin:"auto", display: "flex" }}>
                <ReactApexChart
                    type="pie"
                    series={[55, 45]}
                    options={genderOptions}
                    width={230}
                    height={230}
                />
                <ReactApexChart
                    type="pie"
                    series={[55, 45]}
                    options={raceOptions}
                    width={230}
                    height={230}
                />
                <ReactApexChart
                    type="pie"
                    series={[55, 45]}
                    options={ethnicityOptions}
                    width={230}
                    height={230}
                />
                <ReactApexChart
                    type="pie"
                    series={[55, 45]}
                    options={grOptions}
                    width={230}
                    height={230}
                />
                <ReactApexChart
                    type="pie"
                    series={[55, 45]}
                    options={geOptions}
                    width={230}
                    height={230}
                />
            </div>
        </Container>
    );
};

export default ChartBlock;
