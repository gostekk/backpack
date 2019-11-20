import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import { AppContext } from '../context/AppContext';
import Navigation from '../components/Navigation';
import Home from '../pages/Home';
import ItemAdd from '../pages/ItemAdd';
import ItemEdit from '../pages/ItemEdit';

function App() {
  const { items } = useContext(AppContext);
  console.log(items);

  return (
    <Router>
      <CssBaseline />
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/add" exact component={ItemAdd} />
        <Route path="/edit/:id" exact component={ItemEdit} />
        {/* <Route path="/info" exact component={ItemInfo} /> */}
        {/* <Route path="/about" exact component={About} /> */}
      </Switch>
    </Router>
  );
}

export default App;
