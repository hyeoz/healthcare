import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Container, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Detail from "./Detail";
import { getHost } from "../utils/Util";
import FilterBlock from "../components/Filter";

const TableBlock = () => {
    // Filter  
    const [filter, setFilter] = useState({
        ethnicity: "",
        gender: "",
        race: "",
        age_min: "",
        age_max: "",
        death: "",
    });
    const [page, setPage] = useState(1);
    const [row, setRow] = useState(30);
    const [data, setData] = useState({});

    const [toggleDetail, setToggleDetail] = useState(false);

    useEffect(() => {
        console.log("testset")
        getPatient();
    }, [row, filter]);
    const getPatient = async () => {
        try {
            console.log({ params: { ...filter, page, length: row } });
            const params = {
                page,
                length: row,
                gender: filter.gender ? filter.gender : "",
                race: filter.race ? filter.race : "",
                ethnicity: filter.ethnicity ? filter.ethnicity : "",
                age_min: filter.age_min ? filter.age_min : "",
                age_max: filter.age_max ? filter.age_max : "",
                death: filter.death ? filter.death === "Y" ? true : false : ""
            }
            if (params.age_min === "") { delete params.age_min }
            if (params.age_max === "") { delete params.age_max }
            if (params.death === "") { delete params.death }
            const res = await axios.get(`${getHost()}/patient/list`, { params });
            const resData = res.data.patient;
            console.log(resData);
            setData({ list: resData.list, page: resData.page, rowPerPage: row });
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };

    const onClickColumn = (e) => {
        console.log(e.target.innerText, "column click");
    };

    return (
        <Container>
            <FilterBlock setFilterAndGet={setFilter} />
            <div className="mt-3 mb-3" style={{ display: "flex" }}>
                <select onChange={(e) => { setRow(parseInt(e.target.value)); }} style={{ marginLeft: "auto" }}>
                    <option defaultValue={row} value={row}>
                        --- 행 갯수 ---
                    </option>
                    <option value={10}>10</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <Table bordered>
                <thead>
                    <tr>
                        <th onClick={onClickColumn}>ID</th>
                        <th onClick={onClickColumn}>성별</th>
                        <th onClick={onClickColumn}>생년월일</th>
                        <th onClick={onClickColumn}>나이</th>
                        <th onClick={onClickColumn}>인종</th>
                        <th onClick={onClickColumn}>민족</th>
                        <th onClick={onClickColumn}>사망여부</th>
                    </tr>
                </thead>
                <tbody>
                    {data.list?.map((d, index) => {
                        return (
                            <tr
                                key={d.personID}
                                onClick={() => setToggleDetail(!toggleDetail)}
                            >
                                <td>{d.personID}</td>
                                <td>{d.gender}</td>
                                <td>{d.birthDatetime.split(" ")[0]}</td>
                                <td>{d.age}</td>
                                <td>{d.race}</td>
                                <td>{d.ethnicity}</td>
                                <td>{d.isDeath ? "Y" : "N"}</td>
                                {/* <Detail id={d.personID} /> */}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div style={{ display: "flex", float: "right" }}>

                <Pagination >
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            previous
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            3
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            4
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            5
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            next
                        />
                    </PaginationItem>

                </Pagination>
            </div>
        </Container>
    );
};
export default TableBlock;
