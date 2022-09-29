import ConversionForm from "../../../components/ConversionForm";
import styles from "../../../styles/Home.module.css";

const TableConverterPage = () => {
    return ( 
        <div>
            <h1 className={`${styles.title} text-center`}>
            Welcome to HTML Table converter
                  </h1>
            <ConversionForm></ConversionForm>
        </div>
     );
}
 
export default TableConverterPage;