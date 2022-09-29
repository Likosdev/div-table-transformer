import React, { Children, ReactElement, useEffect, useState } from "react";
import "beautify";
import beautify from "beautify";
import { table } from "console";
import styles from "../styles/Home.module.css";

interface IMyProps {
  children?: ReactElement
}

interface IWindowSize {
  width: number ,
  height: number 
}

interface IFormString {
  formOutput:string
}
const ConversionForm = (props: IMyProps) => {
  const [formInput, setFormInput] = useState('');
  const [formOutput, setFormOutput] = useState('');
  const [selectedColOption, setSelectedColOption] = useState({ option: '1:1', firstCol: 6, secondCol: 6 });
  const [colOptions] = useState(
    [
      { option: '1:1', firstCol: 6, secondCol: 6 },
      { option: '2:1', firstCol: 8, secondCol: 4 }
    ]
  );
  const [smartDetectionOption, setSmartDetectionOption] = useState("off")
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: 0,
    height: 0,
  });


  /**
   * maps col option
   * @param event change event of a select box
   */
  const handleColOptionsSelectionChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {

    var temp = colOptions.filter(option => { return option.option == event.target.value })[0]
    setSelectedColOption(temp);
  }

  const handleFormInputChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormInput(event.target.value);
  }

  const adjustColRatioSmart = (html: String) => {
    return html
  }

  /**
   * 
   * @param html html string to be converted to elements
   * @returns HtmlDivElement containing the Table
   */
  const htmlToElement = (html: string) => {
    var template = document.createElement('div');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template;
  }

  /**
   * 
   * @param html a string containing html
   * @returns true if html string contains valid table elements
   */
  const htmlIsTable = (html: string) => {

    return htmlToElement(html).querySelectorAll('table').length >= 1;
  }

  /**
   * 
   * @param html string of html with columns to be converted
   * @returns html string with adjusted columns
   */
  function adjustColRatio(html: string) {
    var template = htmlToElement(html);
    var columns = template.querySelectorAll('.ratioColumn');

    columns[0].classList.add(`col-md-${selectedColOption.firstCol}`)
    columns[1].classList.add(`col-md-${selectedColOption.secondCol}`)



    console.log(template);


    return template.innerHTML;
  }

  /**
   * Converts HTML Table to Bootstrap Grid
   * @returns a bootstrap grid converted from input html
   */
  const convert = () => {
    // todo - Maybe dom manipulation would be less volatile
    var temp = formInput.replace(/<table.+?>/g, '<div>').replace(/<\/table>/g, '</div>');

    temp = temp.replace(/<tbody.?>/g, '<div class="container">').replace(/<\/tbody>/g, '</div>');

    temp = temp.replace(/<tr.?>/g, '<div class="row">').replace(/<\/tr>/g, '</div>');

    temp = temp.replace(/<td.?>/g, '<div class="ratioColumn">').replace(/<\/td>/g, '</div>');

    return beautify(temp, { format: 'html' })
  }

  /**
   * Tests if html contains table
   * - if false: nothing happenes
   * - if true: convert and adjust col ratio
   * @param event input event 
   */
  const handleConversion = (event: React.MouseEvent<HTMLButtonElement> | null) => {
    event?.preventDefault();
    console.log("Handling conversion");
    console.log("Testing for HTML table in input");
    if (htmlIsTable(formInput)) {
      console.log("Html is a table indeed");
      console.log("beginning conversion")
      var converted = convert();
      if (smartDetectionOption == "on") {
        const smartHtmlWithColRatio = adjustColRatioSmart(converted);
        setFormOutput(smartHtmlWithColRatio.toString());
      }
      else {
        const htmlWithColRatio = adjustColRatio(converted)
        setFormOutput(htmlWithColRatio);
      }

    } else {
      console.log("html does not seem to be a table");

    }
  }

  /**
   * Copys Form Output to Clipbord
   */
  const copyFormOutput = () => {
    if (formOutput) {
      navigator.clipboard.writeText(formOutput)
    }
  }

  useEffect(() => {
    // only execute all the code below in client side
    
      // Handler to call on window resize
      function handleResize() {
        if (typeof window !== 'undefined') {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }}
    
      // Add event listener
      window.addEventListener("resize", handleResize);
     
      // Call handler right away so state gets updated with initial window size
      handleResize();
    
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  , []); // Empty array ensures that effect is only run on mount
  //col-lg-12 text-center options-area
  return (
    <div className="container">
      {props.children}
      <div className="row">
        <div className={`col-lg-4 `}>
          <h3 className="text-center">How to use:</h3>
          <ol>
            <li>past html containing a table info the first textbox</li>
            <li>adjust your options</li>
            <li>click convert</li>
          </ol>
          <p>Please note - Images might not be rendered due to relative paths</p>
        </div>
        <div className={`${styles.optionsArea} col-lg-4 text-center`}>
          <h2 className={"text-center"}>Options</h2>
          <label htmlFor="column-seperation-selector">Select Columnt Seperation</label><br />
          <select name="column-seperation-selector" id="column-seperation-selector" value={selectedColOption.option} onChange={handleColOptionsSelectionChanged}>
            {colOptions.map(option => {
              return <option key={option.option}>{option.option}</option>
            })}
          </select><br />
          <label htmlFor="smartDetectionCheckBox">Try to detect column ratio?   </label> <br />
          <input type="checkbox" name="smartDetectionCheckBox" id="smartDetectionCheckBox" onChange={e => {
            console.log(e.target.value);

            setSmartDetectionOption(smartDetectionOption == "on" ? "off" : "on")
          }} /><br />
        </div>

      </div>
      <div className="row">
        <div className={"col-lg-6 text-center"}>
          <label htmlFor="htmlInput">Paste your HTML Table</label><br />
          <textarea onChange={handleFormInputChanged} name="htmlInput" id="htmlInput" rows={15} cols={windowSize.width <= 500? 35 : 65} value={formInput} /><br />
          <button onClick={handleConversion}>Convert</button><br />
        </div>
        <div className={"col-lg-6 text-center"}>
          <label htmlFor="htmlOutput">Output</label><br />
          <textarea id="htmlOutput" name="htmlOutput" readOnly rows={15} cols={windowSize.width <= 500? 35 : 65} className="code" value={formOutput}></textarea>
          <br />
          <button onClick={copyFormOutput}>Copy all</button>

        </div>
      </div>
      <hr />
      <h2>Preview</h2>
      <div className="container">
        <div className="row" dangerouslySetInnerHTML={{ __html: formOutput }}>
        </div>
      </div>
    </div>
  );
}

export default ConversionForm;


