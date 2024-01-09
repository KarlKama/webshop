import React from 'react'
import Lottie from "lottie-react";

import notFound from "../../images/NotFound2.json";

//  npm install lottie-react


function NotFound() {
  const lottieProps = {
    loop: true,
    animationData: notFound,
    style: {
      marginTop: "50px",
      width: '100vw',
      height: '300px',
    },
  };

  return (
    <div className="center">
      <Lottie {...lottieProps} />
    </div>
    );
}

export default NotFound