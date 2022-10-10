import { Button, ListGroupItem } from "react-bootstrap";

export interface IKeyPhraseProps {
    phrase: string,
    count: number,
    onKeyPhraseButtonClickCallBack(event: any, phrase: string): any
}


export const SelectedKeyphaseListEntry = (props : IKeyPhraseProps) => {
    return (  
        <>
        <ListGroupItem variant="dark">
            <p><strong>Phrase:</strong> {props.phrase} - <strong>Anzahl</strong>: {props.count} </p>
            <Button variant="dark" onClick={(e) => props.onKeyPhraseButtonClickCallBack(e, props.phrase)}>Im Text Markieren</Button>
        </ListGroupItem>
        </>
     );
}
 
