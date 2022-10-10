import React, { ChangeEvent, ChangeEventHandler, SyntheticEvent, useEffect, useState } from "react";
import { Button, Form, FormSelect } from "react-bootstrap";

interface IKeywordCounterKWInputProps {
  callbackOnSelectedKeyphrasesChanged(text: string | any): any
}

const KeywordCounterKWInput = (props:IKeywordCounterKWInputProps ) => {
  const [currentKeyphrase, setCurrentKeyPhrase] = useState<string>("");
  const [keyphrases, setKeyphrases] = useState<string[]>([])
  const [selectedKeyphrases, setSelectedKeyphrases] = useState<string[]>([]);
  
  
  useEffect(() => {
    const env = process.env.NODE_ENV
    
    if (env == "development" && keyphrases.length == 0 ) {
      setKeyphrases(['Urin','Stressinkontinenz','auf', 'Ursachen für Stressinkontinenz'])
    }
    
  },[keyphrases.length])


  const onAddKWBtnClick = (event :React.MouseEvent) => {    
    if (currentKeyphrase.trim().length > 0) {
      const sanitizedKeyphrase = currentKeyphrase.trim().toLowerCase();
      if (keyphrases.includes(sanitizedKeyphrase)) {
        return
      }
      setKeyphrases(keyphrases => [...keyphrases, currentKeyphrase])
    }
  }
  
  const onSelectedKeyphrasesChanged = (event : any) => {
    const newOptions = [...event.currentTarget.selectedOptions].filter(option => option.selected).map(o => o.value)
    setSelectedKeyphrases(newOptions)
    props.callbackOnSelectedKeyphrasesChanged(newOptions);
    
  }

  const onSelectAllBtnClick = () => {
    setSelectedKeyphrases(keyphrases);
    props.callbackOnSelectedKeyphrasesChanged(keyphrases);
  }

  return ( 
    <>
      <h3>KW Input</h3>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-3" controlId="formKeywordInput" >
          <Form.Label>Add another Keyword</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter another Keyword or Phrase" 
            value={currentKeyphrase}
            onChange={(event => setCurrentKeyPhrase(event.target.value))}
            ></Form.Control>
          <Button onClick={onAddKWBtnClick} className="mt-3 mb-3">Add</Button>
          <br></br>
          <Form.Label>Select one or more Keywords From this List (Control+Click / Shift+Click) </Form.Label>
          <Form.Control as="select" multiple value={selectedKeyphrases} onChange={onSelectedKeyphrasesChanged}>
            {keyphrases.map((phrase, index) => <option key={index} value={phrase} >{phrase}</option>)}
          </Form.Control>
          <Button  className="mt-3 mb-3" onClick={onSelectAllBtnClick}> Select all </Button>
        </Form.Group>
      </Form>
    </>
    

     );
}

export default KeywordCounterKWInput;