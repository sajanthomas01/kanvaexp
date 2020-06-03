import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';


function App() {
  let canvasRef = React.useRef(null);
  const [startX, setStartX] = React.useState(0);
  const [startY, setStartY] = React.useState(0);
  const [lastX, setlastX] = React.useState(0);
  const [lastY, setlastY] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const [isMouseDown, setIsMouseDown] = React.useState(false);
  let canvasOffsetX = 8
  let canvasOffsetY = 8;

  const handleMouseDown = () => {
    // console.log('mouse down', canvasRef.getStage().getPointerPosition());
    const point = canvasRef.getStage().getPointerPosition();
    setlastX(parseInt(point.x - canvasOffsetX))
    setlastY(parseInt(point.y - canvasOffsetY))
    setIsMouseDown(true);
    // this._drawing = true;
    // this.setState({
    //   lines: [...this.state.lines, []]
    // });
    setStartX(canvasRef.getStage().getPointerPosition().x);
  };
  const handleMouseMove = e => {
    // if (!this._drawing) {
    //   return;
    // }
    const stage = canvasRef.getStage();
    const point = stage.getPointerPosition();
    console.log(point);
    setStartX(parseInt(point.x - canvasOffsetX));
    setStartY(parseInt(point.y - canvasOffsetY));
    if (isMouseDown) {
      setWidth(startX - lastX);
      setHeight(startY - lastY);
    }

  };
  const handleMouseUp = () => {
    console.log('mouse up')
    // this._drawing = false;
    setIsMouseDown(false);
  };

  return (
    <div className="row">
      <div className="col s1">
        <div className="row grey">
          <button className="btn btn-wave">Rect</button> <br /><br />
          <button className="btn btn-wave">Circle</button> <br /><br />
          <button className="btn btn-wave">Line</button> <br /><br />
        </div>
      </div>
      <div className="col s11">
        <div className="row">
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            ref={node => {
              canvasRef = node;
            }}
          >
            <Layer>
              <Text text="Some text on canvas" fontSize={15} />
              <Rect
                x={lastX}
                y={lastY}
                width={width}
                height={height}
                // fill="red"
                stroke="black"
                draggable
                shadowBlur={1}
                strokeWidth={5}

              />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
}

export default App;
