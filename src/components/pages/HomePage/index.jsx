import React from 'react';

class Heading extends React.Component {

  ex1 = (jsonObj) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(JSON.stringify(jsonObj));
      }, 10000);
    });
  };

  res;

  render() {
    const jsonObj = {
      hai: 'hello',
      whatsup: 'nothing much',
      howsitgoing: 'bas chal rha h'
    };

    this.ex1(jsonObj).then(
      (result) => {
        this.res = result;
      },
      () => {
        this.res = 'error';
      }
    );

    return (
      <div>
        Hello World!!!
      </div>
    );
  }
}

export default Heading;
