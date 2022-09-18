import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

const HeaderNav = () => {
  const Router = useRouter();

  return (
    <HeaderNavWrapper>
     <Link passHref href={'/'}><HeaderNavLinks active={Router.pathname == "/" ? true : false}>
          Campaign
      </HeaderNavLinks></Link>
      <Link passHref href={'/createcampaign'}><HeaderNavLinks active={Router.pathname == "/createcampaign" ? true : false}>
        createcampaign
      </HeaderNavLinks></Link>
      <Link passHref href={'/dashboard'}><HeaderNavLinks active={Router.pathname == "/dashboard" ? true : false}>
        dashboard
      </HeaderNavLinks></Link>
    </HeaderNavWrapper>
  )
}

const HeaderNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // background-color:#393E46;
  padding: 6px;
  height: 50%;
  border-radius: 10px;
  `

const HeaderNavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color:#EEEEEE; 
  background-color:${(props) => props.active ? `#393E46` :``};
  height: 100%;
  font-family: 'Roboto';
  margin: 5px;
  border-radius: 10px;
  padding: 0 25px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  font-size: small;
`

export default HeaderNav