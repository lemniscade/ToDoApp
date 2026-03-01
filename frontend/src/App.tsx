import './App.css'
import LoginRegister from './pages/loginRegister'
import { useUser } from './contexts/UserContext';
import HomePage from './pages/HomePage';

function App() {
  const{state} = useUser();

  return (
    <>
      {state.id ? <HomePage /> : <LoginRegister />}
    </>
  )
}

export default App
