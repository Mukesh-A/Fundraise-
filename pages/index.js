import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useState } from 'react';
import Link from 'next/link'

import { useRef } from 'react';

export default function Index({AllData, HealthData, EducationData,AnimalData}) {
  const [filter, setFilter] = useState(AllData);

  //scroll to bottom
  const endRef = useRef(null)

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  

  return (
    <HomeWrapper>
      <Bg>
        <BgText>
          <BgMainText>FUND RAISE</BgMainText>
          <BgSubText>Raise funds online for medical emergencies and social causes</BgSubText>
          <BGButton onClick={() => scrollToBottom()}>Campaign</BGButton>
        </BgText>
        <Bgimage>
            <Image width={600}height={550} quality={100} src={"/frontpage.png"}/>
        </Bgimage>
        
      </Bg>
      
      {/* Filter Section */}
      <OuterDiv>
      <FilterWrapper>
        {/* <FilterAltIcon style={{fontSize:40}} /> */}
        <Category onClick={() => setFilter(AllData)}>All</Category>
        <Category onClick={() => setFilter(HealthData)}>Medical</Category>
        <Category onClick={() => setFilter(EducationData)}>Social issue</Category>
        <Category onClick={() => setFilter(AnimalData)}>Business</Category>
      </FilterWrapper>

      {/* Cards Container */}
      <CardsWrapper  ref={endRef}>

      {/* Card */}
      {filter.map((e) => {
        return (
          <Card>
          <CardImg>
            <Image 
              layout='fill' 
              src={"https://ipfs.infura.io/ipfs/" + e.image} 
            />
          </CardImg>
          <CardSubDiv>
          <Title>
            {e.title}
          </Title>
          <CardData>
            {/* <Text>Owner<AccountBoxIcon /></Text>  */}
            <Text>Owner</Text> 
            <Text>{e.owner.slice(0,6)}...{e.owner.slice(39)}</Text>
          </CardData>
          <CardData>
            {/* <Text>Amount<PaidIcon /></Text>  */}
            <Text>Amount</Text> 
            <Text>{e.amount} Matic</Text>
          </CardData>
          <CardData>
            <Text><EventIcon /></Text>
            <Text >{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
          </CardData>
          <Link href={'/' + e.address}><Button>
            Go to Campaign
          </Button></Link>
          </CardSubDiv>
        </Card>
        )
      })}
        {/* Card */}

      </CardsWrapper>
      </OuterDiv>
    </HomeWrapper>
  )
}



export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    CampaignFactory.abi,
    provider
  );

  const getAllCampaigns = contract.filters.campaignCreated();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);
  const AllData = AllCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getHealthCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Medical');
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
  const HealthData = HealthCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getEducationCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Social issue');
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  const getAnimalCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Business');
  const AnimalCampaigns = await contract.queryFilter(getAnimalCampaigns);
  const AnimalData = AnimalCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress
    }
  });

  return {
    props: {
      AllData,
      HealthData,
      EducationData,
      AnimalData
    }
  }
}






const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  // background-color: #023246;
`
const Bg = styled.div`
display: flex;
  flex-direction: row;
  height:100%;
  width: 100%;
  // border:solid red 1px;
`
const OuterDiv = styled.div`
background-color: #f5f5f5;
width:100%;
display:flex;
flex-direction: column;
  justify-content:center;
  align-items: center;
`
const BgText = styled.div`
width:50%;
padding-left:50px;
display: flex;
flex-direction: column;
  justify-content:center;


//  border:solid red 1px;
`
const BgMainText = styled.div`
font-family: 'Lato', sans-serif;
height:100px;
font-size:70px;
font-weight:700;
color:#412b76;
// border:solid red 1px;
`
const BgSubText = styled.div`
font-family: 'Lato', sans-serif;
font-size:larger;
font-weight:700;
color:#287094;
font-style: italic;
`
const Bgimage = styled.div`
margin-left:auto;
width:50%;
// border:solid red 1px;
`
const BGButton = styled.button`
  width: 140px;
  height: 45px;
  font-family: 'Lato', sans-serif;
  font-size: 13px;
  
  margin-top:20px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 800;
  color: #fff;
  background-image: linear-gradient(to bottom right, #a4508b, #5f0a87);
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-left:50px;


  &:hover{
    // background-color: #a4508b;
   box-shadow: 0px 15px 20px rgba(163, 34, 217, 0.4);
  color: #fff;
  transform: translateY(-7px);
}
  
`
const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;

  width: 80%;
  margin-top: 15px;
  background-color: #e7e6e6;
  padding: 0 25px;
  border-radius:20px;
`
const Category = styled.div`
  padding: 10px 25px;
  margin: 0px 15px;
  border-radius: 8px;
  font-family: 'Poppins';
  font-weight: normal;
  cursor: pointer;
`
const CardsWrapper = styled.div`
  min-height:89vh;
  display: flex;
  
  // justify-content: space-between;
  flex-wrap: wrap;
  width: 90%;
  margin-top: 25px;
  //  border:solid red 1px;
`
const CardSubDiv = styled.div`
background-color: #fff;
padding:10px;
border-bottom-left-radius: 10px; 
border-bottom-right-radius: 10px; 
width:280px;
`
const Card = styled.div`
background-color: #fff;

 padding:5px;
  min-width: 280px;
  max-width:60%;
  margin-top: 20px;
  margin-left: 50px;
   border-bottom-left-radius: 10px; 
border-bottom-right-radius: 10px; 
  height:100%;
  


  
`
const CardImg = styled.div`
  position: relative;
  height: 180px;
  width: 100%;
  
`
const Title = styled.h2`
font-family: 'Poppins';
font-weight: 500;
text-transform:capitalize;
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  // font-weight: normal;
`
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  `
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 18px;
  // font-weight: bold;
`
const Button = styled.button`
  padding: 8px;
  text-align: center;
  display:flex;
  justify-content: center; 

  margin: 10px auto;
  width: 70%;
  background-color:#00b712 ;
  border-radius:7px;
  background-image: linear-gradient(to bottom right, #a4508b, #5f0a87);
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  font-weight: bold;


  &:hover{
    transform: translateY(-4px);
    transition: transform 0.4s;
  }
  
  &:not(:hover){
    transition: transform 0.4s;
  }
`