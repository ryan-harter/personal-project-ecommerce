import './App.css';
import routes from './routes'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="star">
      </div>
      {routes}
    </div>
  );
}

export default App;
