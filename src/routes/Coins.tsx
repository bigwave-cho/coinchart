import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { isDartAtom } from '../atoms';
const Container = styled.div`
  min-width: 560px;
  padding: 0px 20px;
`;

const Header = styled.header<{ isDark: boolean }>`
  position: relative;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .fa-rocket {
    position: absolute;
    left: 0;
    font-size: 30px;
    transition: all 0.5s ease-in;
    color: ${(props) => (props.isDark ? 'white' : 'red')};
  }
`;

const CoinList = styled.ul``;

const Coin = styled.li<{ isDark: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 20px;
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => (props.isDark ? 'white' : 'greenyellow')};
  transition: color 0.2s ease-in;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    background-color: rgba(232, 224, 224, 0.5);
    color: ${(props) => props.theme.accentColor};
  }
`;

const Title = styled.h1`
  font-weight: 800;
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
  const isDark = useRecoilValue(isDartAtom);
  const setDarkAtom = useSetRecoilState(isDartAtom);
  const onToggleDarkMode = () => {
    setDarkAtom((prev: boolean) => !prev);
    window.localStorage.setItem('CoinChartDarkMode', JSON.stringify(!isDark));
  };
  return (
    <Container>
      <Helmet>
        <title>Coin Chart</title>
      </Helmet>
      <Header isDark={isDark}>
        <i className="fa-solid fa-rocket" />
        <Title>Coin Chart</Title>
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
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Link
              key={coin.id}
              to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}
            >
              <Coin isDark={isDark}>
                <div>
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                    alt={'coinLogo'}
                  />
                  {coin.name}
                </div>
                <i className="fa-solid fa-arrow-right" />
              </Coin>
            </Link>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;
