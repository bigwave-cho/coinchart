import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';

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
  //useQuery 첫 인자 쿼리키: query의 고유 식별자
  // 두 번째 인자 : 페치함수
  // useQuery는 알아서 페치함수가 로딩중이면 isLoading
  // 데이터는 data 프로퍼티로 반환
  const { isLoading, data } = useQuery<CoinIterface[]>('allCoins', fetchCoins);
  // 아래의 여러 줄의 코드가 단 한 줄로 줄여짐.
  // ## 또한 react-query가 데이터를 캐싱해두기에 페이지로 돌아와도
  // 로딩을 하지 않는다.

  // const [coins, setCoins] = useState<CoinIterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('https://api.coinpaprika.com/v1/coins');
  //     const json = await response.json();
  //     setCoins(json.slice(0, 99));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
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
