import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Table, Container, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Detail from "./Detail";

const TableBlock = () => {
    const [row, setRow] = useState(20);
    const [data, setData] = useState({});
    const [pagination, setPagination] = useState([]);
    const [toggleDetail, setToggleDetail] = useState(false);

    const getPatient = async () => {
        try {
            const res = await axios.get("http://49.50.167.136:9871/api/patient/list");
            const resData = res.data.patient;
            // console.log(resData);
            setData({ list: resData.list, page: resData.page, rowPerPage: row });
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };
    // console.log(data);

    const onChangeSelect = (e) => {
        const rowNum = e.target.value;
        // console.log(rowNum);
        setRow(parseInt(rowNum));
    };
    const onClickColumn = (e) => {
        console.log(e.target.innerText, "column click");
    };

    useEffect(() => {
        getPatient();
    }, [row]);

    return (
        <Container>
            <div className="mt-3 mb-3" style={{ display: "flex" }}>
                <select onChange={onChangeSelect} style={{ marginLeft: "auto" }}>
                    <option defaultValue={20} value={20}>
                        --- select row ---
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
                        if (index < data.rowPerPage) {
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
                        }
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
