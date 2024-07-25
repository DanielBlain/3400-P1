import { useContext, useReducer } from 'react'
import { CustomContext } from '../components/CustomContext'
// import useReducerManager from '../customhooks/useReducerManager'

const initialTodos = [
    {
      id: 1,
      title: "Todo 1",
      complete: false,
    },
    {
      id: 2,
      title: "Todo 2",
      complete: false,
    },
  ];


  const reducer = (state, action) => {
    switch (action.type) {
      case "COMPLETE":
        return state.map((todo) => {
            return (todo.id === action.id) ?
                { ...todo, complete: !todo.complete } 
                : todo;
          }
        );
      default:
        return state;
    }
  };

const PageHome = () => {

    const [ message, setMessage ] = useContext(CustomContext)
    const [ todos, dispatch ] = useReducer(reducer, initialTodos)

    const handleComplete = (todo) => {
        dispatch({ type: "COMPLETE", id: todo.id });
      };

    return (
        <>
            <div>
                <div className='testing'>
                    {/*<!-- TESTING -->*/}

                    <button onClick={() => {console.log('damn')}}>
                        Console Logger
                    </button>
                    {todos.map((todo) => (
                        <div key={todo.id}>
                        <label>
                            <input
                            type="checkbox"
                            checked={todo.complete}
                            onChange={() => handleComplete(todo)}
                            />
                            {todo.title}
                        </label>
                        </div>
                    ))}

                    <button onClick={() => {
                        localStorage.setItem('beeswax', 'potato')
                        setMessage('potato')
                    }}>
                        Click to potato, and to local storage potato under &quot;beeswax&quot;
                    </button>
                    <button onClick={() => {
                        localStorage.clear()
                    }}>
                        Click to clear local storage
                    </button>
                    <div>{message}</div>
                </div>
                    {/*<!-- LIVE CONTENT .. eventually -->*/}
                    <p>
                        PageHome
                    </p>
            </div>
        </>
    )
}

export default PageHome