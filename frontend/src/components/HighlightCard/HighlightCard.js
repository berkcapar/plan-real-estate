import { Link } from "react-router-dom";
import "./HighlightCard.css";
import Box from "@material-ui/core/Box";
import SquareFootIcon from "@material-ui/icons/SquareFoot";
import RoomIcon from "@material-ui/icons/Room";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
const HighlightCard = ({ property }) => {
  return (
    <div className="highlight-card">
      <Link
        style={{ textDecoration: "none" }}
        to={`/properties/${property.id}`}
      >
        <div className="highlightcard-textbox">
          <div className="">
            <img alt="property" src={property.photos[0]} />
            <Box>
              <h3 className="highlightcard-title">{property.title}</h3>
              <div className="highlightcard-details">
                <p className="highlightcard-details-city">
                  <Box>
                    <RoomIcon />
                  </Box>
                  {property.city}
                </p>
                <p className="hightlightcard-details-price">
                  <Box>
                    <LocalOfferIcon />
                  </Box>
                  €{property.price}
                </p>
                <p className="hightlightcard-details-size">
                  <Box>
                    <SquareFootIcon />
                  </Box>
                  {property.m2}m²
                </p>
                <p className="hightlightcard-details-rooms">
                  <Box>
                    <MeetingRoomIcon />
                  </Box>
                  {property.roomnumber} rooms
                </p>
              </div>
            </Box>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HighlightCard;
