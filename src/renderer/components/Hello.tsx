import * as React from 'react';


export class Hello extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      counter: 0
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  /**
   * handleOnClick
   */
  public handleOnClick(event: any): void {
    this.setState((prevState: any, props: any) => ({
      counter: prevState.counter + 1
    }));
  }

  public render() {
    return (
      <div>
        <p>Hello, Electron. Counter a: {this.state.counter}</p>
        <button 
          name = "Update"
          onClick = { this.handleOnClick }
        >Increment</button>
      </div>
    );
  }
}