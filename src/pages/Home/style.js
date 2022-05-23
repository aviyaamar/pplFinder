import styled from "styled-components";

export const Home = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-block-start: 100px;
`;

export const Header = styled.div`
  display: flex;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 400px;
  width: 100%;
`;
export const Spinner = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
 justify-content: center;
  width:120px;
  height:24px;
  -webkit-mask:
    radial-gradient(circle closest-side,#000 94%,#0000) 0 0/25% 100%,
    linear-gradient(#000 0 0) center/calc(100% - 12px) calc(100% - 12px) no-repeat;
  background:
   linear-gradient(#219684 0 0) left/0% 100% no-repeat
   #ddd;
  animation:p7 2s infinite linear;
@keyframes p7 {
    100% {background-size:100% 100%}
}

`;