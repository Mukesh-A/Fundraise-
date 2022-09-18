import styled from 'styled-components';
import { FormState } from '../Form';
import { useContext } from 'react';

const FormLeftWrapper = () => {
  const Handler = useContext(FormState);

  return (
    <FormLeft>
      <FormInput>
        <label>Campaign Title</label>
        <Input onChange={Handler.FormHandler} value={Handler.form.campaignTitle} placeholder='Campaign Title' name='campaignTitle'>
        </Input>
      </FormInput>
      <FormInput>
        <label>Discription</label>
        <TextArea onChange={Handler.FormHandler} value={Handler.form.story} name="story" placeholder='Start Writing'>
        </TextArea>
      </FormInput>
    </FormLeft>
  )
}

const FormLeft = styled.div`
  width:48%;
  
`

const FormInput = styled.div`
  display:flex ;
  flex-direction:column;
  font-family:'poppins';
  margin-top:10px ;
  
`
const Input = styled.input`
  padding:15px;
   background-color:#ebecf3 ;
  // color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  max-width:100% ;
  min-width:90%;
  border: solid #b1a0a0 1px;
`

const TextArea = styled.textarea`
  padding:15px;
  background-color:#ebecf3 ;
    // color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none;
  border-radius:8px ;
  outline:none;
  font-size:large;
  max-width:100%;
  min-width:90%;
  overflow-x:hidden;
  min-height:160px ;
  border: solid #b1a0a0 1px;
`

export default FormLeftWrapper;