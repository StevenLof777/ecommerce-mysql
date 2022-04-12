import { useParams } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Row, Col, ListGroup, Badge, Container, Button, Card } from 'react-bootstrap';
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAIL } from '../../constants/actionTypes.js';
import Spinner from '../Animations/Spinner'
import AlertBox from '../Animations/AlertBox'
import Rating from './Product/Rating.js';
import {Helmet} from 'react-helmet-async'
import { getError } from '../../utils.js';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    case FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


function ProductScreen() {
  const params = useParams();
  const {slug} = params

  const [{ loading, error, product }, dispatch] = useReducer((reducer), {
    product: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: FETCH_REQUEST });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: FETCH_SUCCESS, payload: result.data });
      } catch (err) {
        dispatch({ type: FETCH_FAIL, payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <Container>
      <Spinner/>
    </Container>
    ) : error ? (
      <Container><AlertBox variant='danger'>{error}</AlertBox></Container>
    ) : (
      <Container>
    <>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>KickBacks: {product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button variant="primary">Add to Cart</Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>)
    </Container>
  )
}
export default ProductScreen;