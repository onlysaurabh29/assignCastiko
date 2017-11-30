import React from 'react'
import ReactDOM from 'react-dom'
import { newDeck, shuffle, serializeCards } from '52-deck'

/*
  Here is where we're going to put our front-end logic
*/
const styles = {
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%'
  },
  placeholder: {
    borderTop: '1.5px solid black',
    padding: '5px',
    marginBottom: '0.5%',
    width: '100%'
  },
  textRight: {
    textAlign: 'right'
  },
  smallMargin: {
    marginBottom: '0',
    marginTop: '0'
  }
}

// const deck = newDeck()
// console.log(deck);

// const deck2 = shuffle(newDeck());
// console.log(deck2);

// const [firstCard, secondCard] = serializeCards('♦K ♦2');
// console.log(firstCard, secondCard);

class LoadShuffledCards extends React.Component {
  // constructor of the class/component
  constructor(props) {
    super(props)

    this.state = {
      cards: []
    }

    this.loadList = this.loadList.bind(this);
  }
  // funciton that loads our list of cards
  loadList() {
    let deck2 = shuffle(newDeck());
    this.setState({ cards: deck2 });
  }

   // This function comes from React ecosystem
  // the function is called after the component renders for the first time
  componentDidMount() {
    // loading the list for the first time
    this.loadList();
  }



  // Main rendering function
  render() {
    let {cards} = this.state;
    console.log(this.state);
    return <div>
      {cards.length >= 1 && <h3 className="text-center">Deck of cards</h3>}
      {cards.map(({ text, suite }) => <div key={text + suite} style={styles.center}>
        {text} {suite}
      </div>)}
    </div>
  }
}

ReactDOM.render(
  <LoadShuffledCards />,
  document.getElementById('root')
);
