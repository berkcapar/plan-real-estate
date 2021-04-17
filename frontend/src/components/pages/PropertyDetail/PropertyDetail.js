import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import "./PropertyDetail.css";
import SquareFootIcon from "@material-ui/icons/SquareFoot";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import PhoneIcon from "@material-ui/icons/Phone";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Map from "../../Map/Map";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import ImageSlider from "../../ImageSlider/ImageSlider";
import Box from "@material-ui/core/Box";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import propertyService from "../../../services/property";
import { initProperties } from "../../../redux/reducers/propertyReducer";
import { getPropertiesFromState } from "../../../redux/selectors";

const PropertyAirports = ({ propertyId }) => {
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    const fetchAirports = async (propertyId) => {
      console.log(propertyId);

      try {
        const { airports } = await propertyService.fetchAirports(propertyId);
        setState({ status: "success", data: airports });
      } catch (error) {
        setState({ status: "failure", error });
      }
    };

    fetchAirports(propertyId);
  }, [propertyId]);

  switch (state.status) {
    case "loading":
    default:
      return "Fetching airports...";
    case "success":
      return (
        <div>
          {state.data.map((airport) => (
            <div>{airport.name}</div>
          ))}
        </div>
      );

    case "failure":
      return state.error.message;
  }
};

const PropertyDetail = ({ matchingProperty }) => {
  const [showSlider, setShowSlider] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const handleSlider = () => {
    setShowSlider(true);
    setShowDetails(false);
  };

  const handleClose = () => {
    setShowSlider(false);
    setShowDetails(true);
  };

  return (
    <div className="detail-container">
      {showDetails ? (
        <div>
          <div className="image-slider">
            <ImageSlider slides={matchingProperty.photos} />
          </div>
          <h2 className="title">{matchingProperty.title}</h2>
          <div className="image-area">
            <div className="big-image">
              <img
                onClick={handleSlider}
                src={matchingProperty.photos[0]}
                alt="property"
              />
            </div>
            <div className="small-images">
              {matchingProperty.photos.slice(1, 5).map((photo, index) => {
                return (
                  <div key={index}>
                    <img onClick={handleSlider} src={photo} alt="property" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="button">
            <Button onClick={handleSlider} variant="contained" color="primary">
              Show all Photos
            </Button>
          </div>

          <div className="contact-icon-container">
            <div className="icon-area">
              <div className="m2-area">
                <SquareFootIcon className="icon" />
                <p>{matchingProperty.m2}m2</p>
              </div>
              <div className="room-area">
                <MeetingRoomIcon className="icon" />
                <p className="room-text">{matchingProperty.roomnumber} rooms</p>
              </div>
              <h3 className="price">{matchingProperty.price}€</h3>
            </div>
            <div className="contact">
              <p>Contact for this House</p>
              <PhoneIcon className="icon" />
            </div>
          </div>
          <div className="char-key">
            <div className="char-area">
              <h2>Characteristic</h2>
              <h3>General</h3>
              <p>Liveable Surface: {matchingProperty.liveablem2} m²</p>
              <p>Land: {matchingProperty.m2} m²</p>
              <p>Number of Rooms: {matchingProperty.roomnumber}</p>
              <p>Number of Bathrooms: {matchingProperty.bathnumber}</p>
              <p>Year of Construction: {matchingProperty.year}</p>
            </div>
            <div className="key-features">
              <h2>Key Features</h2>
              <p>{matchingProperty.detailed}</p>
            </div>
          </div>
          <div className="location">
            <div className="text">
              <h2>Location</h2>
              <h3>{matchingProperty.city}</h3>
              <div className="explore">
                <p>Explore</p>
                <ChevronRightIcon className="icon" />
              </div>
              <div className="airports">
                <h3>Nearest Airports</h3>
                <PropertyAirports propertyId={matchingProperty.id} />
              </div>
            </div>

            <div className="map">
              <Map location={matchingProperty.location} zoomLevel={17} />
            </div>
          </div>
        </div>
      ) : null}
      {showSlider ? (
        <div>
          <Box
            display="flex"
            justifyContent="flex-end"
            width="92%"
            mb={1}
            mt={1}
            onClick={handleClose}
          >
            <KeyboardBackspaceIcon />
            Go Back to Details Page
          </Box>
          <ImageSlider slides={matchingProperty.photos} />
        </div>
      ) : null}
    </div>
  );
};

const PropertyDetailContainer = () => {
  const propertyDataState = useSelector(getPropertiesFromState);
  const dispatch = useDispatch();
  let match = useRouteMatch("/properties/:id");

  useEffect(() => {
    dispatch(initProperties());
  }, [dispatch]);

  switch (propertyDataState.status) {
    case "failure":
      return "error";
    case "loading":
    default:
      return "loading";
    case "success":
      const matchingProperty = match
        ? propertyDataState.data.find(
            (matchingProperty) => matchingProperty.id === match.params.id
          )
        : null;
      return <PropertyDetail matchingProperty={matchingProperty} />;
  }
};

export default PropertyDetailContainer;

//<div className="airports">
//<h3>Nearest Airports</h3>
//<PropertyAirports propertyId={propertyDetail.id} />
//</div>
