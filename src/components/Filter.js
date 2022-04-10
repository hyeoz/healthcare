import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getEthnicityList, getGenderList, getRaceList } from "../utils/Util";

const Filter = ({ setFilterAndGet }) => {
    const [genderList, setGenderList] = useState([]);
    const [raceList, setRaceList] = useState([]);
    const [ethnicityList, setEthnicityList] = useState([]);
    const [filter, setFilter] = useState({
        ethnicity: "",
        gender: "",
        race: "",
        age_min: "",
        age_max: "",
        death: "",
    });

    const getList = async () => {
        setEthnicityList((await getEthnicityList()).ethnicityList);
        setGenderList((await getGenderList()).genderList);
        setRaceList((await getRaceList()).raceList);
    };

    useEffect(() => {
        getList();
    }, []);

    const onSubmitForm = () => {
        setFilterAndGet(filter);
    };
    const onOverChange = (e) => {
        setFilter({ ...filter, age_max: e.target.value });
    };
    const onUnderChange = (e) => {
        setFilter({ ...filter, age_min: e.target.value });
    };

    return (
        <Form
            style={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid black",
                padding: "1rem",
            }}
        >
            <FormGroup style={{ display: "flex" }}>
                <Label>성별</Label>
                <Input onChange={(e) => { setFilter({ ...filter, gender: e.target.value }) }} type="select">
                    <option>전체</option>
                    {genderList.map((gen) => {
                        return <option>{gen}</option>;
                    })}
                </Input>
            </FormGroup>
            <FormGroup style={{ display: "flex" }}>
                <label>사망여부</label>
                <Input onChange={(e) => { setFilter({ ...filter, death: e.target.value }) }} type="select">
                    <option>전체</option>
                    <option>Y</option>
                    <option>N</option>
                </Input>
            </FormGroup>
            <FormGroup style={{ display: "flex" }}>
                <label>인종</label>
                <Input onChange={(e) => { setFilter({ ...filter, race: e.target.value }) }} type="select">
                    <option>전체</option>
                    {raceList.map((ra) => {
                        return <option>{ra}</option>;
                    })}
                </Input>
            </FormGroup>
            <FormGroup style={{ display: "flex" }}>
                <label>민족</label>
                <Input onChange={(e) => { setFilter({ ...filter, ethnicity: e.target.value }) }} type="select">
                    <option>전체</option>
                    {ethnicityList.map((eth) => {
                        return <option>{eth}</option>;
                    })}
                </Input>
            </FormGroup>
            <FormGroup>
                <label>나이</label>
                <input type="number" onChange={onUnderChange} /> ~{" "}
                <input type="number" onChange={onOverChange} />
            </FormGroup>
            <Button onClick={onSubmitForm}>검색하기</Button>
        </Form>
    );
};

export default Filter;
