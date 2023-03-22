import QuestionAns from './components/QuestionAns';

import './App.css';
import { useState } from 'react';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false)

  function handleGameStart(){
    setGameStarted(!gameStarted)
  }

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }


  return (
    <div className="App">
      <main>
      {gameStarted ?
        <QuestionAns
        handleGameStart={handleGameStart}
        decodeHtml={decodeHtml}
        />
        :
        <section className='intro'>
          <h1 className='game-title'>Quizzical</h1>
          <p className='game-text'>Have knowledge! Have fun!</p>

          <button className="btn-primary" onClick={handleGameStart}>Start Quiz</button>

        </section>
      }
      </main>

    </div>
  );
}
