import * as React from 'react';
import { Stage, Layer } from 'react-konva';
import { Checkbox, Button } from 'antd';
import ColoredRect from './ColoredRect';

interface IShape {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ICanvasState<T> {
  shapes: T[];
  isDrawing: boolean;
  isDrawingMode: boolean;
}

export default class Canvas extends React.Component<{}, ICanvasState<IShape>> {
  constructor(props: any) {
    super(props);

    this.state = {
      shapes: [], // list of dimensions to be rendered as shapes
      isDrawing: false, // in the process of drawing a shape
      isDrawingMode: true, // allow shapes to be drawn
    };
  }

  public render() {
    return (
      <div>
        <Checkbox
          checked={this.state.isDrawingMode}
          onChange={this.handleCheckboxChange}
        >
          Drawing Mode
        </Checkbox>
        <Button>Load Script</Button>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onContentClick={this.handleStageClick}
          onContentMouseMove={this.handleMouseMove}
        >
          <Layer>
            {this.state.shapes.map((shape: IShape, idx: number) => {
              return (
                <ColoredRect
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  isDrawingMode={this.state.isDrawingMode}
                  key={idx}
                  onDragEnd={this.handleShapeDragEnd}
                  // pass isDrawingMode so we know when we can click on a shape
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
    );
  }

  private handleCheckboxChange = (e: any) => {
    // toggle drawing mode
    this.setState({
      isDrawingMode: !this.state.isDrawingMode,
    });
  };

  private handleStageClick = (e: any) => {
    if (!this.state.isDrawingMode) {
      return;
    }

    // if we are drawing a shape, a click finishes the drawing
    if (this.state.isDrawing) {
      this.setState({
        isDrawing: !this.state.isDrawing,
      });
      document.body.style.cursor = 'default';
      return;
    }

    // otherwise, add a new rectangle at the mouse position with 0 width and height,
    // and set isDrawing to true
    const newShapes = this.state.shapes.slice();
    newShapes.push({
      x: e.evt.layerX,
      y: e.evt.layerY,
      width: 0,
      height: 0,
    });

    this.setState({
      isDrawing: true,
      shapes: newShapes,
    });
  };

  private handleMouseMove = (e: any) => {
    if (!this.state.isDrawingMode) {
      return;
    }

    const mouseX = e.evt.layerX;
    const mouseY = e.evt.layerY;

    // update the current rectangle's width and height based on the mouse position
    if (this.state.isDrawing) {
      document.body.style.cursor = 'crosshair';

      // get the current shape (the last shape in this.state.shapes)
      const currShapeIndex = this.state.shapes.length - 1;
      const currShape = this.state.shapes[currShapeIndex];
      const newWidth = mouseX - currShape.x;
      const newHeight = mouseY - currShape.y;

      const newShapesList = this.state.shapes.slice();
      newShapesList[currShapeIndex] = {
        x: currShape.x, // keep starting position the same
        y: currShape.y,
        width: newWidth, // new width and height
        height: newHeight,
      };

      this.setState({
        shapes: newShapesList,
      });
    }
  };

  private handleShapeDragEnd = (e: any) => {
    if (!e.target) {
      return;
    }

    // get the current shape (the last shape in this.state.shapes)
    const currShape = this.state.shapes[e.target.index];

    const newShapesList = this.state.shapes.slice();
    newShapesList[e.target.index] = {
      x: e.evt.dragEndNode.attrs.x,
      y: e.evt.dragEndNode.attrs.y,
      width: currShape.width,
      height: currShape.height,
    };

    this.setState({
      shapes: newShapesList,
    });
  };
}
