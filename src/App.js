import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory
} from "react-router-dom"
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(n => n.id === id) 
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>Votes: {anecdote.votes}</div>
      <div>For more info see <Link to={anecdote.info}>{anecdote.info}</Link></div>
    </div>
  )
}



const AnecdoteList = ({anecdotes}) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content.value}</Link>
        </li>
      )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField()
  const author = useField('text')
  const info = useField('text')
  const empty = useField("")
/*  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')  */
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    history.push('/')
  }

  const handleReset = (e) => {
    //document.getElementById("form").reset();
    e.preventDefault()
    content.onClear()
    author.onClear()
    info.onClear()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form id="form">
        <div>
          content:
          <input 
            value={content.value}
            onChange={content.onChange}/>
        </div>
        <div>
          author:
          <input 
            value={author.value}
            onChange={author.onChange} />
        </div>
        <div>
          url for more info:
          <input 
            value={info.value}
            onChange={info.onChange} />
        </div>
        <button onClick={handleSubmit}>Create</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </div>
  )

}




const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    console.log(anecdote)
    setNotification(`a new anecedote was created: ${anecdote.content.value}`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
      </div>
      <Menu />
      <h3>{notification}</h3>
    <Switch>

      <Route path="/anecdotes/:id">
        <Anecdote anecdotes={anecdotes} />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/create">
        <CreateNew addNew={addNew} />
      </Route>

      <Route path="/">
        <AnecdoteList anecdotes={anecdotes} />
      </Route>
    </Switch>
      <Footer />  
    </Router>
  )
}

export default App;