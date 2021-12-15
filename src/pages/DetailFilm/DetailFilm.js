import React from "react";
import styled from "styled-components";

const DetailFilm = (props) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Wrapper>
      <p>{props.match.params.idFilm}</p>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: var(--header-height);
`;
export default DetailFilm;
