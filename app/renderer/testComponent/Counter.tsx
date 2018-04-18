import * as React from 'react';
import './Counter.less';

export default class Hello extends React.Component<any, any> {
  /**
   * constructor
   */
  public constructor(props: any) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  public render() {
    return (
      <div>
        <h1 className="header">Hello. I'm counting: {this.state.counter}</h1>
        <input type="button" onClick={this.onIncrement} value="increment" />
      </div>
    );
  }

  private onIncrement = () => {
    this.setState((prevState: any, props: any) => {
      return { counter: prevState.counter + 1 };
    });
  };
}
