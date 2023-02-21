import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

//참고) interface 명 지을 때 앞에 I를 붙이는 컨벤션이 있음.

//배열이나 오브젝트는 구분이 안되게 복붙되니 손수 지정해줘야 함.
//필요없지만 예시.
interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

/*
쉽게 긁어오는 법.
1. 콘솔창 간다.
2. 해당 데이터 객체 우클릭-> 전역변수로 저장
3. Object.keys(temp1).join() 
4. 복붙 -> cmd+d 로 쉼표 선택하고 삭제 후 엔터
5. 전체 드래그 -> 옵션 + shift + i -> : 입력해주기
6. Object.values(temp1).map(value=>typeof value)
7. 배열 쉼표 없애고 엔터 해준담에 기존 키 나열 된것 드래그해서 option+shift+i한담에 붙이기

주의!! 배열이나 객체는 똑같이 객체로 타입이 들어오기 때문에 확인하고 필요한 데이터라면
손수 타입지정해주면 됩니다.
*/
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
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      console.log(infoData);
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/ticker/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      console.log(priceData);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>코인 {state?.name || 'Loading'}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : <span>{}</span>}
    </Container>
  );
}
export default Coin;
