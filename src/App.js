import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';

import ChampionFilteringForm from './components/ChampionFilteringForm';
import ChampionDetailsDialog from './components/ChampionDetailsDialog';

import { ROOT_LOL_API } from './constants';
import { retrieveChampions } from './ducks/championsSlice';

function App() {
  const dispatch = useDispatch();
  const { isLoading, isError, items: champions } = useSelector(
    state => state.champions
  );
  const nameCriteria = useSelector(state => state.filtering.nameCriteria);

  const [selectedChampionId, setSelectedChampionId] = React.useState(null);

  const filteredChampions = React.useMemo(
    () =>
      champions.filter(champion =>
        champion.name.toLowerCase().includes(nameCriteria.toLowerCase())
      ),
    [champions, nameCriteria]
  );

  React.useEffect(() => {
    dispatch(retrieveChampions());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Container className="mt-4">
        <h1 className="text-light">Carregando...</h1>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="mt-4">
        <h3 className="text-light">
          Ops... Algum erro ocorreu ao requisitar os dados dos campeões.
        </h3>
      </Container>
    );
  }

  return (
    <>
      <Container as="header" className="my-4">
        <h1 className="text-light">Escolha seu campeão</h1>
      </Container>

      <Container>
        <ChampionFilteringForm />
      </Container>

      <Container>
        <Row>
          {filteredChampions.map(champion => (
            <Col
              className="cursor-pointer"
              key={champion.id}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              onClick={() => setSelectedChampionId(champion.id)}
            >
              <Figure>
                <Figure.Image
                  alt={`Foto de ${champion.name}`}
                  src={`${ROOT_LOL_API}/img/champion/${champion.image.full}`}
                />
                <Figure.Caption className="text-white-50">
                  {champion.name}
                </Figure.Caption>
              </Figure>
            </Col>
          ))}
        </Row>
      </Container>

      {selectedChampionId && (
        <ChampionDetailsDialog
          championId={selectedChampionId}
          onClose={() => setSelectedChampionId(null)}
        />
      )}
    </>
  );
}

export default App;
