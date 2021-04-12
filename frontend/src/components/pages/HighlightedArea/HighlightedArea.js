import HighlightCard from "../../HighlightCard/HighlightCard";
import { useDispatch, useSelector } from "react-redux";
import { getPropertiesFromState } from "../../../redux/selectors";
import "./HighlightedArea.css";
import { useEffect } from "react";
import { initProperties } from "../../../redux/reducers/propertyReducer";

const HighlightedArea = () => {
  const properties = useSelector(getPropertiesFromState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initProperties());
  }, [dispatch]);

  return (
    <div className="ha-container">
      <h1>Discover the Highlighted Properties</h1>
      <div className="highlighted-area">
        {properties.slice(0, 3).map((property) => (
          <HighlightCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default HighlightedArea;
