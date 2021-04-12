import { Switch, Route } from "react-router";
import "./App.css";
import Home from "./components/Home/Home";
import AddCard from "./components/AddCard/AddCard";
import { useEffect } from "react";
import { getUser } from "./components/Cards/cardsSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.cards.user.name);
  const userStatus = useSelector((state) => state.cards.user.status);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div className="App">
      <Switch>
        <Route
          path="/addcard"
          render={() => <AddCard userName={userName} userStatus={userStatus} />}
        />
        <Route path="/" render={() => <Home />} />
      </Switch>
    </div>
  );
}

export default App;
