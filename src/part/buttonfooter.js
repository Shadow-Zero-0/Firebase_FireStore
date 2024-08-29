import { useTranslation } from "react-i18next";



const Buttonfooter = ({button,setaddtask}) => {
  const { t } = useTranslation();

    return (
        <>
             <button
            onClick={() => {
              setaddtask(true);
              
            }}
            className="addnew"
          >
            {t('Add Task')}
          </button>
          <button onClick={async() => {
           button()
          
        
          }} className="addnew">{t('Delet Task')}</button>
        </>
    );
}

export default Buttonfooter;
