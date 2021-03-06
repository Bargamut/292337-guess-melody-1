import React from 'react';

const withTransformProps = (transformFunc) => {
  return (Component) => {
    const WithTransformProps = (props) => {
      const newProps = transformFunc(props);

      return <Component {...newProps} />;
    };

    return WithTransformProps;
  };
};

export default withTransformProps;
