import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
// 에러 : TS 가 RRD를 모름;
// 에러에 나온 `npm i --save-dev @types/react-router-dom` 설치
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
