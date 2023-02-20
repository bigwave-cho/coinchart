import { useState } from 'react';
import styled from 'styled-components';

function App() {
  const [value, setValue] = useState('');

  // event 타입 지정할 땐 구글링!
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    //TS는 e.currentTarget 사용하기로 정함
    const {
      currentTarget: { value },
    } = e;
    setValue(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('hello', value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={value}
          type="text"
          placeholder="username"
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
