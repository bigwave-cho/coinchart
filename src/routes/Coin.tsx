import { useQuery } from 'react-query';
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import Chart from './Chart';
import Price from './Price';
//react-helmet 사용해보기
import { Helmet } from 'react-helmet';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDartAtom } from '../atoms';
const Container = styled.div`
  width: 560px;
  padding: 0px 20px;
`;

const Header = styled.header`
  position: relative;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .fa-arrow-left {
    position: absolute;
    left: 0;
    font-size: 30px;
    transition: color 0.1s ease-in;

    &:hover {
      color: #d17b7b;
      cursor: pointer;
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Overview = styled.div<{ isDark: boolean }>`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.isDark ? 'rgba(0, 0, 0, 0.5)' : 'lightgrey'};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div<{ isDark: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.isDark ? 'white' : 'black')};

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
  font-weight: 700;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};

  &:hover {
    opacity: 0.7;
  }

  a {
    display: block;
  }
`;

const DarkModeToggleBtn = styled.button<{ isDark: boolean }>`
  position: absolute;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 30px;
  height: 30px;
  color: ${(props) => (props.isDark ? 'white' : 'black')};
  font-size: 25px;
  border: 0px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.bgColor};
  transition: all 0.1s ease-in;

  &:hover {
    color: yellow;
    background-color: ${(props) => (props.isDark ? '' : 'lightgray')};
    cursor: pointer;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: ITag[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const priceMatch = useRouteMatch('/:coinId/price');
  const chartMatch = useRouteMatch('/:coinId/chart');

  const isDark = useRecoilValue(isDartAtom);
  const setDarkAtom = useSetRecoilState(isDartAtom);

  const onToggleDarkMode = () => {
    setDarkAtom((prev: boolean) => !prev);
    window.localStorage.setItem('CoinChartDarkMode', JSON.stringify(!isDark));
  };

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId)
    // { refetchInterval: 5000 }
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId)
  );
  const loading = infoLoading || tickersLoading;

  const history = useHistory();
  const onGoback = () => {
    history.push('/');
  };

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <i onClick={onGoback} className="fa-solid fa-arrow-left" />
        <Title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </Title>
        <DarkModeToggleBtn
          onClick={onToggleDarkMode}
          isDark={JSON.parse(isDark!)}
        >
          {isDark ? (
            <i className="fa-solid fa-sun" />
          ) : (
            <i className="fa-solid fa-moon" />
          )}
        </DarkModeToggleBtn>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview isDark={isDark}>
            <OverviewItem isDark={isDark}>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem isDark={isDark}>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem isDark={isDark}>
              <span>Price:</span>
              <span>{tickersData?.quotes?.USD?.price?.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview isDark={isDark}>
            <OverviewItem isDark={isDark}>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem isDark={isDark}>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;
