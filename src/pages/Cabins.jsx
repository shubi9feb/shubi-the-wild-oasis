import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  // const [showForm, setShowForm] = useState(false);
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  });
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations>Filter</CabinTableOperations>
      </Row>
      <Row>
        <CabinTable />
        {/* <Button
          onClick={() => {
            setShowForm((show) => !show);
          }}
        >
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />} */}
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
