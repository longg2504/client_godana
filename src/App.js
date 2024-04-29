import "./App.css";
import "../src/view/client/place/css/Client.css"
import RoutesClient from "./routes/RoutesClient";
import LoginForm from "./view/client/auth/Login";
function App() {
  return(
    <RoutesClient/>
    // <LoginForm/>
  )
}

export default App;
