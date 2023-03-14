import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./StationDetail.css";
import stationDetailType from "../../types/stationDetailType";

const StationDetailComponent = () => {
  const location = useLocation();
  const { brandSlug, slug, currentPage } = location.state;

  const [stationDetails, setStationDetails] = useState<stationDetailType>();

  useEffect(() => {
    const fetchDetails = async () => {
      // const res = await axios.get(
      //   `https://bff-web-guacamole.musicradio.com/station/${brandSlug}/${slug}`
      // );
      // const { data } = res;

      // Had to use this when the api was not working and giving CORS error

      const data = {
        brandId: "KLo",
        brandLogo:
          "https://herald.musicradio.com/media/0d3d891d-32f2-4c53-95ee-8d1e35bdd126.png",
        brandName: "Capital",
        brandSlug: "capital",
        gduid: "363e5e3b-1c83-4fc5-87b5-4b4ca4543a1f",
        heraldId: "25",
        id: "AMpR",
        legacyStationPrefix: "capital",
        name: "Capital Teesside",
        obit_enabled: false,
        slug: "teesside",
        streamUrl: "https://media-ssl.musicradio.com/CapitalTeesside",
        tagline: "The UK's No.1 Hit Music Station",
      };
      setStationDetails(data);
    };

    if (brandSlug && slug) {
      fetchDetails();
    }
  }, [location]);

  return (
    <>
      <Link to='/' className='float-start' state={{ page: currentPage }}>
        {"< Back"}
      </Link>
      <h2>Station Details</h2>
      <img
        src={stationDetails?.brandLogo}
        alt="Station's Logo"
        className='image'
      />
      <table className='table table-striped table-dark mt-2'>
        <tbody>
          <tr>
            <td>Station Name:</td>
            <td>{stationDetails?.name}</td>
          </tr>
          <tr>
            <td>Station Tagline:</td>
            <td>{stationDetails?.tagline}</td>
          </tr>
          <tr>
            <td>Stream Url:</td>
            <td>{stationDetails?.streamUrl}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default StationDetailComponent;
