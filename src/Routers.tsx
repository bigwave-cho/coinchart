import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

interface IRouterProps {
  toggleDart: () => void;
  isDark: boolean;
}

function Router({ toggleDart, isDark }: IRouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin isDark={isDark} />
        </Route>
        <Route path="/">
          <Coins toggleDark={toggleDart} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
