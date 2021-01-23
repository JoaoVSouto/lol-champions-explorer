import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';

import ChampionFilteringForm from './components/ChampionFilteringForm';
import ChampionDetailsDialog from './components/ChampionDetailsDialog';
import ChampionOrderForm from './components/ChampionOrderForm';

import { ROOT_LOL_API } from './constants';
import { retrieveChampions, orderedChampions } from './ducks/championsSlice';

function App() {
  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector(state => state.champions);
  const champions = useSelector(state => orderedChampions(state.champions));
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
        <h1 className="text-light">Loading...</h1>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="mt-4">
        <h3 className="text-light">
          Ops... Some error occurred while trying to fetch champions data.
        </h3>
      </Container>
    );
  }

  return (
    <>
      <Container as="header" className="my-4">
        <h1 className="text-light">Choose your champion</h1>
      </Container>

      <Container className="d-md-flex">
        <ChampionFilteringForm />

        <ChampionOrderForm />
      </Container>

      <Container>
        <Row>
          {filteredChampions.map(champion => (
            <Col
              key={champion.id}
              className="hero-container"
              xs={6}
              sm={4}
              md={3}
              lg={2}
              onClick={() => setSelectedChampionId(champion.id)}
            >
              <button className="hero-container__button" type="button">
                <Figure className="m-0">
                  <Figure.Image
                    alt={`Foto de ${champion.name}`}
                    src={`${ROOT_LOL_API}/img/champion/${champion.image.full}`}
                  />
                  <Figure.Caption className="text-white-50">
                    {champion.name}
                  </Figure.Caption>
                </Figure>
              </button>
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
