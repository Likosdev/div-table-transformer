import KeywordCounterBase from "../../../components/KeywordCounter/KeywordCounterBase";
import styles from "../../../styles/Home.module.css";

const KeywordCounterPage = () => {
  return (
    <div>
      <h1 className={`${styles.title} text-center`}>
        Welcome to Keyword Counter
      </h1>
      <KeywordCounterBase></KeywordCounterBase>
    </div>
  );
}

export default KeywordCounterPage;