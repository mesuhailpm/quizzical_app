import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import { useMemo } from 'react';
import cross from '../images/cross.svg';
import tick from '../images/tick.svg';


export default function QuestionPart(props){

    const {question,correct_answer,incorrect_answers,selectedAnswer,isGameOver,selectAnswer,id,decodeHtml} = props;

    function shuffleArray(array){
        var currentIndex = array.length,temporaryValue, randomIndex
        while (currentIndex!==0){
            randomIndex = Math.floor(Math.random()*array.length)
            currentIndex-=1
            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
             }
        return array}

    const shuffledAnswers= useMemo(()=>{
    const copyIncorrect=incorrect_answers.slice()
    copyIncorrect.push(correct_answer)
    return shuffleArray(copyIncorrect)
    },// eslint-disable-next-line
    [incorrect_answers])

    const choiceElements=shuffledAnswers.map(answer=>
        {
        return  <button
            id={`${answer===selectedAnswer?'selected':''}`}
                className={`choice ${
                    answer===selectedAnswer && !isGameOver ? ' selected':
                    answer===correct_answer && isGameOver ? ' correct':
                    answer!==correct_answer &&  selectedAnswer !== answer && isGameOver ? 'disabled':
                    answer===selectedAnswer &&  correct_answer !== answer ? 'incorrect':
                    ''}`}
                key={nanoid()}

                onClick={()=>{ !isGameOver && selectAnswer(id,answer)}}
                >
                {decodeHtml(answer)}
                </button>


        }

    )


    return(
    <div className="question-answer-container">
        <p>{decodeHtml(question)}</p>
        <div className='choice-and-validator'>
            <div className="choice-container">{choiceElements}</div>
            { selectedAnswer!==correct_answer && isGameOver &&
                <img className='validator' src={cross} alt=""/>}
            { selectedAnswer===correct_answer && isGameOver &&
                <img className='validator' src={tick} alt=""/>}
        </div>


    </div>

    )
}
