import styled from "styled-components"

export const Wrap = styled.div`
  max-width: 1080px;
  width: 90%;
  margin: 0 auto;
`

export const Widget = styled.div`
  display: ${props => (props.center ? "flex" : "block")};
  flex-direction: column;
  align-items: center;
  text-align: ${props => (props.center ? "center" : "inherit")};
  background: ${props => (props.block ? "var(--bg-pop)" : "transparent")};
  padding: ${props => (props.block ? "2rem" : "0px")};
  margin-bottom: 2rem;
`
