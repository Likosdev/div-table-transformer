
import { useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import * as ReactDOMServer from 'react-dom/server';
import KeywordCounterKWInput from "./Fragments/KeywordCounterKWInput";
import KeywordCounterTextInput from "./Fragments/KeywordCounterTextInput";
import { SelectedKeyphaseListEntry } from "./Fragments/SelectedKeyphraseListEntry";

// todo 
// - match all lowercases
// - implement https://www.npmjs.com/package/rita

interface ICountObject {
  phrase: string,
  count: number,
  indexes: number[]
}

const KeywordCounterBase = () => {

  const [selectedKeyphrases, setSelectedKeyphrases] = useState<string[]>([]);
  const [selectedKeyphrasesWithCount, setSelectedKeyphrasesWithCount] = useState<ICountObject[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");

  const onSelectedKeyphrasesChanged = (newPhrases: string[]) => {
    setSelectedKeyphrases(newPhrases);
    countSelectedKeyphrasesInText(newPhrases);
  };

  const countSelectedKeyphrasesInText = (selectedKeyphrases: string[]) => {
    const counted = selectedKeyphrases.map((phrase) => {
      const count: ICountObject = countKeyphrase(phrase);
      return {
        phrase: phrase,
        count: count.count,
        indexes: count.indexes
      }
    })
    setSelectedKeyphrasesWithCount(counted)

  }

  const countKeyphrase = (phrase: string) => {
    var currentPhraseRegex = new RegExp("\\b" + phrase + "\\b", 'g')

    var matches = inputText.matchAll(currentPhraseRegex)

    const indexes: number[] = [];
    let count: number = 0;

    for (const match of matches) {
      indexes.push(match.index || 0)
      count++;
    }

    return {
      phrase: phrase,
      count: count,
      indexes: indexes
    };
  }

  function textInputChanged(text: string) {
    setInputText(text);
    setOutputText(text);
  }

  const phraseButtonClickCallback = (pEvent: any, pPhrase: string) => {
    const phraseData: ICountObject = selectedKeyphrasesWithCount.filter(phrase => {
      return phrase.phrase == pPhrase
    })[0]

    highlightPhraseInOutputText(phraseData);
  }

  const sourroundKeyWord = (phraseData: ICountObject, input: string) => {
    let output = input;
    const openingTag = '<span style="color: red;"><strong>';
    const closingTag = '</strong></span>';

    const currentRegex = RegExp("\\b" + phraseData.phrase + "\\b", 'g');
    output = output.replace(currentRegex, (match) => {
      return `${openingTag}${match}${closingTag}`;
    });

    return output;
  }

  const highlightAllKeywordsClickCallback = (event: any) => {
    let output = inputText;
    selectedKeyphrasesWithCount.forEach(phrase => {
      output = sourroundKeyWord(phrase, output)
    });

    setOutputText(output);
  }

  const highlightPhraseInOutputText = (phraseData: ICountObject) => {
    setOutputText(sourroundKeyWord(phraseData, inputText));
  }


  return (
    <>
      <Container>
        <Row id="TextInputRow">
          <Col lg={4} ><h3>Input The Text you would like to analyze</h3></Col>
          <Col lg={8}><KeywordCounterTextInput onChangedCallback={textInputChanged}></KeywordCounterTextInput></Col>
        </Row>
        <Row id="KeywordInputSelectionRow">
          <Col lg={4}><h3>Select Keywords</h3></Col>
          <Col lg={8}>
            <KeywordCounterKWInput
              callbackOnSelectedKeyphrasesChanged={onSelectedKeyphrasesChanged} />
          </Col>
        </Row>
        <Row id="OutputRow" className="border p-4">
          <Col lg={4} >
            <Container>
              <h4>Selected Keyword Data</h4>
              <Button className="mb-3" onClick={(e) => highlightAllKeywordsClickCallback(e)}  >Highlight all Keywords</Button>
              <ListGroup variant="dark">

                {(selectedKeyphrasesWithCount as ICountObject[]).map((phrase, index) => {
                  return <SelectedKeyphaseListEntry
                    key={index}
                    phrase={phrase.phrase}
                    count={phrase.count}
                    onKeyPhraseButtonClickCallBack={phraseButtonClickCallback} />
                })}

              </ListGroup>
            </Container>
          </Col>
          <Col className="" lg={8}>
            <h4>Output</h4>
            <div className="border p-4" dangerouslySetInnerHTML={{ __html: outputText }} />
          </Col>

        </Row>
      </Container>
    </>

  );
}

export default KeywordCounterBase;


