import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  background-color: white;
  padding: 20px;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
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
  const [coins, setCoins] = useState<CoinIterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins');
      const json = await response.json();
      setCoins(json.slice(0, 99));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {coins.map((coin) => (
            <Link
              // ## React Router 6버전에서 Link컴포넌트를 이용해서 state보내기
              // useParams사용하면 해당 path를 이용해서 api를 요청하는 과정을 거쳐야하지만
              // Link에 state를 담아보낸 정보로 컴포넌트를 구성하면 더 빨리 렌더링할 수 있다.

              //## 주의
              // Home을 거치지 않고 해당 코인 페이지로 바로 접속하게 된다면
              // Link로 state를 전달하는 과정을 거치지 않아 해당 코인 정보를 받아볼 수 없다.

              // ## React Router 5버전
              //< Link to={{ pathname: "/home", state: state }} / >

              // ## React Router 6버전
              //< Link to="/home" state={state} / >
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
