import React from 'react'
import Lottie from "lottie-react";

import loader from "../images/Loading.json";

const Loader = ({loaderWidth, loaderHeight}) => {
    const lottieProps = {
      loop: true,
      animationData: loader,
      style: {
        marginTop: "50px",
        width: loaderWidth,
        height: loaderHeight,
      },
    };
  
    return (
      <div className="center">
        <Lottie {...lottieProps} />
      </div>
      );
  }

export default Loader