import { useEffect, useState } from "react";


interface ITextInputProps {
  onChangedCallback(text: string): any
}

const KeywordCounterTextInput = (props:ITextInputProps) => {
  const [inputContent, setInputContent] = useState("")

  useEffect(() => {
    const env = process.env.NODE_ENV
    
    if (env == "development" && inputContent=="") {
      const devInput = "<p>Harninkontinenz ist der ungewollte Verlust von Urin. Stressinkontinenz tritt auf, wenn körperliche Bewegungen oder Aktivitäten - wie Husten, Lachen, Niesen, Laufen oder schweres Heben - Druck (Stress) auf die Blase ausüben, wodurch Urin austritt. Bei Frauen sind Schwangerschaft, Geburt, Übergewicht und Wechseljahre die häufigsten Ursachen für Stressinkontinenz, die auf einen unzureichenden Verschluss des Harnröhrenschließmuskels aufgrund einer Schwäche des Beckenbodens oder einer direkten Schädigung des Schließmuskels zurückzuführen ist</p>";       
      setInputContent(devInput)
      props.onChangedCallback(devInput)
    }
  },[inputContent, props])

  const onKeywordInputChanged = (event : any) => {
    setInputContent(event.target.value)
    props.onChangedCallback(event.target.value)
  }

  return (
    <textarea name="keywordInput" id="" cols={80} rows={10} value={inputContent} onChange={onKeywordInputChanged} />
  );
}

export default KeywordCounterTextInput;