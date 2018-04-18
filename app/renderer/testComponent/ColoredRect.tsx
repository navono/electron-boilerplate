import * as Konva from 'konva';
import * as React from 'react';
import { Rect } from 'react-konva';

export interface IColoredRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  isDrawingMode: boolean;
  key: number;
  onDragEnd(evt: any): void;
}

interface IColoredRectState {
  color: string;
}

export default class ColoredRect extends React.Component<
  IColoredRectProps,
  IColoredRectState
> {
  public state = {
    color: 'green',
  };

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Rect
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
        draggable={!this.props.isDrawingMode}
        onDragEnd={this.props.onDragEnd}
      />
    );
  }

  private handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor(),
    });
  };
}
