import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src" : "./img/image1.png", matched:false},
  { "src" : "/img/image2.png", matched:false},
  { "src" : "/img/image3.png", matched:false},
  { "src" : "/img/image4.png", matched:false},
  { "src" : "/img/image5.png", matched:false},
  { "src" : "/img/imageg.png", matched:false}
]

function App() {

  const [cards,setCards] = useState([])
  const [turns,setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled,setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const  shuffleCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() -0.5)
    .map((card) => ({...card,id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
  }

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(preCards => {
          return preCards.map(card =>{
            if (card.src === choiceOne.src){
              return {...card, matched:true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(()=>resetTurn(),1000)
      }
    }
  },[choiceOne,choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1 )
    setDisabled(false)
  }

  //start a new game automatically

  useEffect(()=>{
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1 style={{color:'blue'}}>Memory Magic</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Total Turns : {turns}</p>
    </div>
  );
}

export default App;
