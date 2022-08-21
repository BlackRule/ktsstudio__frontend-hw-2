import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {MultiDropdown, Option} from "./components/MultiDropdown/MultiDropdown";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App=()=>{
    const [options, setOptions]=useState([{ key: 'msk', value: 'Москва' },
        { key: 'spb', value: 'Санкт-Петербург' },
        { key: 'ekb', value: 'Екатеринбург' },])
    const [value,setValue] =useState<Option[]>([])
    return (
        <>
            <MultiDropdown options={options} value={[]} pluralizeOptions={(elements: Option[]) =>
            elements.map((el: Option) => el.key).join()} onChange={console.dir}/>
            <button onClick={()=>{setOptions([{ key: 'msk', value: 'Москва' },
                { key: 'ekb', value: 'Екатеринбург' }])}}>change options</button>
            <button onClick={()=>{setValue([{ key: 'ekb', value: 'Екатеринбург' }])}}>change value</button>
        </>

    )
}

root.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>
);
