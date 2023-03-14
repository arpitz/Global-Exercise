import { Routes, Route } from "react-router-dom";
import AddStationComponent from "./components/AddStation";
import StationDetailComponent from "./components/StationDetail";
import StationListComponent from "./components/StationList";

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<StationListComponent />} />
      <Route path='/detail/:id' element={<StationDetailComponent />} />
      <Route path='/addStation' element={<AddStationComponent />} />
    </Routes>
  );
};
export default Main;
