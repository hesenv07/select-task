
import { useEffect, useReducer } from 'react';
import './App.css'
interface Option {
  value: string,
  id: string
}
function App() {

  function reducer(state, action) {
    switch (action.type) {
      case 'select': {
        return {
          ...state,
          value: action.payload.value,
          id: action.payload.id
        };
      }
      case 'show': {
        return {
          ...state,
          show: !state.show
        };
      }


    }
    throw Error('Unknown action: ' + action.type);
  }
  const [state, dispatch] = useReducer(reducer, { value: '', id: '', show: false });

  const options = [
    {
      value: "Arif",
      id: '1'

    },
    {
      value: "Camal",
      id: '2'
    }
  ]

  const handleSelect = (item: Option) => {
    dispatch({
      type: 'select',
      payload: item
    });
    dispatch({
      type: 'show',
    });
  }
  const handleShow = () => {
    dispatch({
      type: 'show',
    });
  }
  const handleClick = () => {
    dispatch({
      type: 'show',
      payload: false
    });
  }
  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);
  return (
    <>
      <button onClick={() => handleShow()}>{state?.value || 'Select ...'}</button >
      <div style={{ border: "1px solid black" }}>
        {state?.show ? options?.map((item) => {
          return <div style={{ cursor: "pointer" }} onClick={() => handleSelect(item)} key={item.id}>{item.value}</div>
        }) : null}
      </div>

    </>
  )
}

export default App
