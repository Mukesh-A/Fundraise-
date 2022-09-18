import styled from 'styled-components';
import { FormState } from '../Form';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import {TailSpin} from 'react-loader-spinner'
import {create as IPFSHTTPClient} from 'ipfs-http-client';

const client = IPFSHTTPClient("https://ipfs.infura.io:5001/api/v0");

const FormRightWrapper = () => {
  const Handler = useContext(FormState);

  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const uploadFiles = async (e) => {
    e.preventDefault();
    setUploadLoading(true);

    if(Handler.form.story !== "") {
      try {
        const added = await client.add(Handler.form.story);
        Handler.setStoryUrl(added.path)
      } catch (error) {
        toast.warn(`Error Uploading Story`);
      }
    }


      if(Handler.image !== null) {
          try {
              const added = await client.add(Handler.image);
              Handler.setImageUrl(added.path)
          } catch (error) {
            toast.warn(`Error Uploading Image`);
          }
      }

      setUploadLoading(false);
      setUploaded(true);
      Handler.setUploaded(true);
      toast.success("Files Uploaded Sucessfully")
}

  return (
    <FormRight>
      <FormInput>
        <FormRow>
          <RowFirstInput>
            <label>Required Amount</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.requiredAmount} name="requiredAmount" type={'number'} placeholder='Required Amount'></Input>
          </RowFirstInput>
          <RowSecondInput>
            <label>Choose Category</label>
            <Select onChange={Handler.FormHandler} value={Handler.form.category} name="category">
              <option>Medical</option>
              <option>Social issue</option>
              <option>Business</option>
            </Select>
          </RowSecondInput>
        </FormRow>
      </FormInput>
      {/* Image */}
      <FormInput>
        <label>Select Image</label>
        <Image onChange={Handler.ImageHandler} type={'file'} accept='image/*'>
        </Image>
      </FormInput>
      {uploadLoading == true ? <Button><TailSpin color='#fff' height={20} /></Button> :
        uploaded == false ? 
        <Button onClick={uploadFiles}>
          Upload Files to IPFS
        </Button>
        : <Button style={{cursor: "no-drop"}}>Files uploaded Sucessfully</Button>
      }
      <Button onClick={Handler.startCampaign}>
        Start Campaign
      </Button>
    </FormRight>
  )
}

const FormRight = styled.div`
  width:45%;
`

const FormInput = styled.div`
  display:flex ;
  flex-direction:column;
  font-family:'poppins';
  margin-top:10px ;
  
`

const FormRow = styled.div`
  display: flex;
  justify-content:space-between;
  width:100% ;
`

const Input = styled.input`
  padding:15px;
  // background-color:${(props) => props.theme.bgDiv} ;
  // color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;
  border: solid #b1a0a0 1px;
` 

const RowFirstInput = styled.div`
  display:flex ;
  flex-direction:column ;
  width:45% ;
  
`

const RowSecondInput = styled.div`
  display:flex ;
  flex-direction:column ;
  width:45% ;
`

const Select = styled.select`
  padding:15px;
  // background-color:${(props) => props.theme.bgDiv} ;
  // color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;
  border: solid #b1a0a0 1px;
`

const Image = styled.input`
  // background-color:${(props) => props.theme.bgDiv} ;
  // color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;
  border: solid #b1a0a0 1px;

  &::-webkit-file-upload-button {
    padding: 15px ;
    // background-color: ${(props) => props.theme.bgSubDiv} ;
    // color: ${(props) => props.theme.color} ;
    outline:none ;
    border:none ;
    font-weight:bold ;
    
  }  
`

const Button = styled.button`
  display: flex;
  justify-content:center;
  width:70% ;
  padding:15px ;
  color:white ;
  background-color:#00b712 ;
  background-image: linear-gradient(to bottom right, #a4508b, #5f0a87);
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-top:30px ;
  margin-left:70px ;
  font-weight:bold ;
  font-size:large ;
`

export default FormRightWrapper