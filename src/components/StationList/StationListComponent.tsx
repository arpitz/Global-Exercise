import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import response from "./response";
import "./StationList.css";
import stationListType from "../../types/stationListType";

const StationListComponent = () => {
  const location = useLocation();
  const page = location.state ? location.state.page : null;
  const [stations, setStations] = useState<stationListType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageData, setCurrentPageData] = useState<stationListType[]>([]);

  const PER_PAGE = 10;

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const fetchData = async () => {
    // const res = await axios.get(
    //   `https://bff-web-guacamole.musicradio.com/stations`
    // );
    // const { data } = res;

    const data = response;
    setStations(data);
  };

  useEffect(() => {
    window.history.replaceState({}, document.title);
    fetchData();
  }, []);

  useEffect(() => {
    if (stations.length) {
      const offset = currentPage * PER_PAGE;
      const data = stations.slice(offset, offset + PER_PAGE);
      setCurrentPageData(data);
    }
  }, [currentPage, stations]);

  useEffect(() => {
    if (page) setCurrentPage(page);
  }, [page]);

  return (
    <>
      <h2>Station List</h2>
      <Link to='/addStation'>Add New Station</Link>
      <div className='d-flex'>
        {currentPageData.length > 0 &&
          currentPageData.map((station) => {
            return (
              <Link
                className='link'
                key={station.id}
                to={`/detail/${station.id}`}
                state={{
                  brandSlug: station.brand.slug,
                  slug: station.slug,
                  currentPage,
                }}>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>{station.name}</h5>
                    <p className='card-text'>{station.tagline}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={Math.ceil(stations.length / PER_PAGE)}
        forcePage={currentPage}
        onPageChange={(e) => handlePageClick(e)}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </>
  );
};

export default StationListComponent;
