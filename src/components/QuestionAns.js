import { useEffect, useState } from "react"
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import getQuestions from "../services/getQuestions";
import QuestionPart from "./QuestionPart";
import './QuestionAns.css'


export default function QuestionAns(props){
    const {handleGameStart,decodeHtml}=props
    const [questionArray,setQuestionArray] = useState([]);
    const [correctAnswersCount,setCorrectAnswersCount] = useState(0);
    const [isGameOver,setIsGameOver] = useState(false);
    const allQuestionsAnswered = questionArray.every(question=> question.selectedAnswer!=="")

    function startNewgame(){
        setQuestionArray([])
        setIsGameOver(false)
        handleGameStart()

    }
    function selectAnswer(questionID,answer){

        setQuestionArray(prevQuestionArray =>
            prevQuestionArray.map(question=>
                (
                 question.id===questionID
                    ?
                    {...question,
                        selectedAnswer: answer
                    }
                    :question
            )) )



    }

    function endGame(){
        setIsGameOver(true)
    }



    useEffect(
        ()=>{if(allQuestionsAnswered && !isGameOver){
            let correctAnswers=0
            questionArray.forEach(question=>
                {if(question.correct_answer===question.selectedAnswer){correctAnswers++}})
                setCorrectAnswersCount(correctAnswers)
        }}
    )
    useEffect(function(){
        getQuestions(5).then(questions=>{
            return setQuestionArray(questions.map(
                question=>{
                    return{
                        ...question,
                        id:nanoid(),
                        selectedAnswer:"",
                    }
                }
            ))
        })

    },[])

    const questionPartElements =questionArray.map(question=>(
        <QuestionPart
            key={question.id}
            question={question.question}
            decodeHtml={decodeHtml}
            correct_answer={question.correct_answer}
            incorrect_answers={question.incorrect_answers}
            selectedAnswer={question.selectedAnswer}
            selectAnswer={selectAnswer}
            id={question.id}
            isGameOver={isGameOver}
        />
    )



    )


    return(
        <div className="question--page">

        <div>{questionPartElements}</div>
        {allQuestionsAnswered && !isGameOver &&
        <button
                className="submit-answer"
                onClick={endGame}
        >
                See Results

        </button>}

        {isGameOver &&
        <div className="score-card">
            <p>You scored {correctAnswersCount} out of {questionArray.length}</p>
            <button
                className="new-game"
                onClick={startNewgame}
            >
                Play again
            </button>
        </div>
        }

        </div>
    )
}
