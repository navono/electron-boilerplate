import * as React from 'react';


export class Hello extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  render() {
    return (
      <div>
        <p>Hello, Electron. </p>
      </div>
    );
  }
}