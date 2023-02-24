import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { isDartAtom } from '../atoms';
const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 20px;
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  transition: color 0.2s ease-in;

  &:hover {
    color: ${(props) => props.theme.accentColor};
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

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface CoinIterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<CoinIterface[]>('allCoins', fetchCoins);
  const setDarkAtom = useSetRecoilState(isDartAtom); //setState

  const toggleDarkAtom = () => {
    setDarkAtom((prev) => !prev);
  };
  return (
    <Container>
      <Helmet>
        <title>Coin Chart</title>
      </Helmet>
      <Header>
        <Title>Coin Chart</Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Link
              key={coin.id}
              to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}
            >
              <Coin>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                  alt={'coinLogo'}
                ></Img>
                {coin.name} &rarr;
              </Coin>
            </Link>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;
