import React, { useState } from "react";
import { Stage, Layer, Star, Image, Text, Rect } from "react-konva";
import useImage from "use-image";

const maxWidth = window.innerWidth * 0.98;
const maxHeight = window.innerHeight * 0.98;
const width = 2048;
const height = 1600;
const ratio = height / width;

const Spaceship = () => {
  const [image] = useImage("./spaceship_4x.png");
  return <Image image={image} height={maxWidth * ratio} width={maxWidth} />;
};

const App = () => {
  const [state, setState] = React.useState({
    cursor: {
      x: null,
      y: null
    }
  });

  const [isHover, setIsHover] = React.useState(false);

  const handleMouseMove = (e) => {
    var stage = e.currentTarget;
    stage = e.target.getStage();
    setState({
      cursor: stage.getPointerPosition()
    });
  };

  const handleMouseEnter = (e) => {
    const container = e.target.getStage().container();
    setIsHover(true);
  };

  const handleMouseLeave = (e) => {
    const container = e.target.getStage().container();
    setIsHover(false);
  };

  const handleMouseClick = (e) => {
    window.open("https://testnets.opensea.io/collection/astrobelly", "_blank");
  };

  const absX = (state.cursor.x * width) / maxWidth;
  const absY = (state.cursor.y * width) / maxWidth;
  const text = `X: ${absX}, Y: ${absY}`;

  const gallery = {
    x: 55,
    y: 570,
    width: 460,
    height: 370
  };

  const aGallery = {
    x: (gallery.x * maxWidth) / width,
    y: (gallery.y * maxWidth) / width,
    width: (gallery.width * maxWidth) / width,
    height: (gallery.height * maxWidth) / width
  };

  return (
    <Stage
      width={maxWidth}
      height={maxWidth * ratio}
      onMouseMove={handleMouseMove}
    >
      <Layer>
        <Spaceship />
        <Text text={text} fontSize="20" fill="red" />
        <Rect
          width={aGallery.width}
          height={aGallery.height}
          x={aGallery.x}
          y={aGallery.y}
          fill="white"
          opacity={isHover ? 0.5 : 0}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleMouseClick}
        />
      </Layer>
    </Stage>
  );
};

export default App;
