import styled from 'styled-components';

const HeaderLogo = () => {
  return (
    <Logo>Fund Raise</Logo>
  )
}

const Logo = styled.h1`
  font-weight: normal;
  font-size: 40px;
  margin-left: 11px;
  font-family: 'Roboto';
  color:#EEEEEE;
  letter-spacing: 3px;
  cursor: pointer;
`

export default HeaderLogo