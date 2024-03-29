import Image from "next/image";
import Container from "./container";
import heroImg from "../public/img/Default_create_a_3d_volcanic_earth_where_instead_of_the_sea_th_2_d989a65d-508f-4cf6-8cfd-7e85bd655167_0.png";
import React, { useState } from 'react';
import TxTabs from "./txTabs"

const SendTxPageComponent = () => {
  return (
    <>
      <Container className="flex flex-wrap">
        <div className="flex items-center w-full lg:w-1/2">
          <TxTabs></TxTabs>
        </div>
        <div className="fixed-image-container">
          <Image
            src={heroImg}
            width="616"
            height="617"
            className={"object-cover"}
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
        </div>
      </Container>
      <style jsx>{`
        .fixed-image-container {
          position: right;
          top: 300; /* Adjust the top value to fix its vertical position */
          right: 300; /* Adjust the right value to fix its horizontal position */
          width: 616px; /* Set the fixed width you want */
          height: 617px; /* Set the fixed height you want */
        }
      `}</style>
    </>
  );
}

export default SendTxPageComponent;
