import React, { useState } from "react";
import styled from "styled-components";

const CinemaGroupContainer = styled.div`
  display: flex;
  height: 80px;
  padding: 20px 20px 20px 20px;
  border: 1px solid #ddd;
`;
const CinemaGroupLogo = styled.div`
  width: 100%;
  opacity: ${(props) => (props.active ? "1" : "0.5")};
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  margin-bottom: 40px;
  img {
    width: 40px;
  }
  :hover {
    opacity: 1;
  }
`;

const ListCinemaGroup = ({ heThongRap, layLichChieuPhim }) => {
  const [maHeThongRap, setMaHeThongRap] = useState("");
  React.useEffect(() => {
    if (heThongRap.length !== 0) {
      setMaHeThongRap(heThongRap[0].maHeThongRap);
      layLichChieuPhim(heThongRap[0].maHeThongRap);
    }
  }, []);
  const renderLogoItem = () => {
    return heThongRap.map((rap) => {
      return (
        <CinemaGroupLogo
          key={rap.maHeThongRap}
          onClick={() => {
            setMaHeThongRap(rap.maHeThongRap);
            layLichChieuPhim(rap.maHeThongRap);
          }}
          active={rap.maHeThongRap === maHeThongRap}
        >
          <img src={rap.logo} alt="rap logo" />
        </CinemaGroupLogo>
      );
    });
  };

  return <CinemaGroupContainer>{renderLogoItem()}</CinemaGroupContainer>;
};

export default React.memo(ListCinemaGroup);
