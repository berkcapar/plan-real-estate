import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./ImageSlider.css";
import CloseIcon from "@material-ui/icons/Close";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const id = useParams().id;
  const property = useSelector((state) =>
    state.property.data.find((p) => p.id === id)
  );

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div>
      <section className="slider">
        <ArrowBackIosIcon className="back-arrow" onClick={prevSlide} />
        <ArrowForwardIosIcon className="forward-arrow" onClick={nextSlide} />
        {property.photos.map((photo, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <img src={photo} alt="property" className="image" />
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default ImageSlider;
