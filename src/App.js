import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Row, Button, Jumbotron, Card, Accordion, Container, ListGroup, Form, Navbar, Nav, FormControl, Col } from 'react-bootstrap';
// const APIalunoListar = 'https://crudformapi.herokuapp.com/tarefas/';
const APIalunoListar = 'http://localhost:3001/alunos'; //lista de alunos
const APIalunoInsert = 'http://localhost:3001/alunoInsert';
const APIalunoUpdate = 'http://localhost:3001/aluno/6';
// const APIaluno = 'http://localhost:3001/aluno/6'; //aluno por id
const APIalunoDelete = 'http://localhost:3001/aluno-delete/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      act: 0,
      index: '',
      datas: []
    }
  }
  async componentDidMount() {
    this.refs.nome.focus();
    this.listar(1);
  }
  async listar(n) {
    const { data: datas } = await axios.get(APIalunoListar);
    if (n === 1) {
      return this.setState({ datas });
    } else {
      n++;
      return this.listar(n);
    }
  }

  cadastrar = (event) => {
    event.preventDefault();
    const obj = {
      nome_pessoa: this.refs.nome.value,
      CPF_aluno: this.refs.CPF.value,
      RG_pessoa: this.refs.RG.value,
      data_nascimento_pessoa: this.refs.dataNasc.value,
      endereco_aluno: this.refs.endereco.value,
      bairro_aluno: this.refs.bairro.value,
      nome_cidade: this.refs.cidade.value,
      email_pessoa: this.refs.email.value,
      numero_telefone_pessoa: this.refs.telefone.value
    };
    console.log(obj);

    if (obj.nome_pessoa === "" || obj.CPF_aluno === "" || obj.RG_pessoa === "" || obj.data_nascimento_pessoa === "" || obj.endereco_aluno === "" || obj.nome_cidade === "" || obj.email_pessoa === "" || obj.numero_telefone_pessoafone === "") {
      alert("Campo(s) não preenchidos!");
    } else {
      if (this.state.act === 0) {
        axios.post(APIalunoInsert, obj);
      } else {
        axios.put(APIalunoUpdate + this.state.index, obj);
      }
      this.setState({
        act: 0
      });

      this.refs.formTarefas.reset();
      this.refs.nome.focus();
      this.componentDidMount();
    }
  }

  remover = (event, tarefas) => {
    event.preventDefault();
    axios.delete(APIalunoDelete + tarefas);
    this.refs.formTarefas.reset();
    this.listar(0);
  }

  editar = (event, tarefa, i) => {
    event.preventDefault();

    let data = this.state.datas[i];
    this.refs.nome.value = data.nome_pessoa;
    this.refs.CPF.value = data.CPF_aluno;
    this.refs.RG.value = data.RG_pessoa;
    this.refs.dataNasc.value = data.data_nascimento_pessoa;
    this.refs.endereco.value = data.endereco_aluno;
    this.refs.bairro.value = data.bairro_aluno;
    this.refs.cidade.value = data.nome_cidade;
    this.refs.email.value = data.email_pessoa;
    this.refs.telefone.value = data.numero_telefone_pessoa;

    this.setState({
      act: 1,
      index: tarefa
    });

    this.refs.nome.focus();
  }

  dateFormat(date) {
    let format = date.replace(/T/, " ").split(" ");
    let d = format[0].split("-").reverse().join("-");
    d += " " + format[1];
    return d;
  }

  

  render() {
    let datas = this.state.datas;
    return (
      <Container className="App">
        <Jumbotron className="ligth-g shadow bordaJumbotron">
          <Accordion defaultActiveKey="1">
            <Navbar bgh="ligth" expand="lg" className="navBar shadow">
              <Navbar.Brand><h2>LISTA DE ALUNOS</h2></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Form inline>

                    <FormControl type="text" placeholder="Insira o nome do aluno" className="mr-sm-2" />
                    <Button variant="outline-success"><p className="p-form">Pesquisar</p></Button>
                  </Form>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

            <Container align="Right">
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                <p id="linkCadastro" className="border-link">Cadastrar novo aluno</p>
              </Accordion.Toggle>
            </Container>

            <Accordion.Collapse eventKey="0">
              <Container>
                <Form ref="formTarefas">
                  <Form.Group>
                    <Form.Label><p className="p-form">Nome</p></Form.Label>
                    <Form.Control type="text" name="nome" ref="nome" placeholder="Nome do aluno" required="required"></Form.Control>
                  </Form.Group>

                  <Form.Row>
                    <Col>
                      <Form.Label><p className="p-form">CPF</p></Form.Label>
                      <Form.Control type="text" name="CPF" ref="CPF" placeholder="000.000.000-00" required="required"></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label><p className="p-form">RG</p></Form.Label>
                      <Form.Control type="numeric" name="RG" ref="RG" placeholder="Rg do aluno" required="required"></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label><p className="p-form">Data de nascimento</p></Form.Label>
                      <Form.Control type="Date" name="dataNasc" ref="dataNasc" required="required"></Form.Control>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Label><p className="p-form">Endereço</p></Form.Label>
                      <Form.Control type="text" name="endereco" ref="endereco" placeholder="Endereço do aluno" required="required"></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label><p className="p-form">Cidade</p></Form.Label>
                      <Form.Control type="text" name="cidade" ref="cidade" placeholder="Cidade do aluno" required="required"></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label><p className="p-form">Bairro</p></Form.Label>
                      <Form.Control type="text" name="bairro" ref="bairro" placeholder="Bairro do aluno" required="required"></Form.Control>
                    </Col>
                  </Form.Row>

                  <Form.Group>
                    <Form.Label><p className="p-form">E-mail</p></Form.Label>
                    <Form.Control type="email" name="email" ref="email" className="form-group" placeholder="exemplo@exemplo.com" required="required"></Form.Control>
                    <Form.Label><p className="p-form">Telefone</p></Form.Label>
                    <Form.Control type="text" name="telefone" ref="telefone" className="form-group" placeholder="Telefone do aluno" required="required"></Form.Control>
                  </Form.Group>
                  <Container className="text-center">
                    <Button variant="btn btn-estagia" onClick={(e) => this.cadastrar(e)}>Adicionar</ Button>
                  </Container>
                </Form>
              </Container>
            </Accordion.Collapse>
          </Accordion>

          <Jumbotron className="jumbo">
            <pre>
              {datas.map((data, i) =>
                <ListGroup key={i}>
                  <ListGroup.Item className="card">
                    <Accordion defaultActiveKey="1">
                      <Card >

                        <Card.Header  className="card-head sombra" >
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            <h5 className="h5-form">{data.nome_pessoa}</h5>
                          </Accordion.Toggle>
                        </Card.Header>

                        <Accordion.Collapse eventKey="0">
                          <Card.Body c>
                            <Container>
                              <ListGroup.Item>
                                <Row>
                                  <Col xs={4} className="coluna">
                                    <p className="p-lista">{`CPF: ${data.CPF_aluno}`}</p>
                                  </Col>

                                  <Col xs={2} className="coluna">
                                    <p className="p-lista">{`RG: ${data.RG_pessoa}`}</p>
                                  </Col>

                                  <Col className="coluna">
                                    <p className="p-lista">{`Data de nascimento: ${this.dateFormat(data.data_nascimento_pessoa)}`}</p>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            </Container>

                            <Container>
                              <ListGroup.Item>
                                <Row>
                                  <Col className="coluna">
                                    <p className="p-lista">{`Endereço: ${data.endereco_aluno}`}</p>
                                  </Col>

                                  <Col className="coluna">
                                    <p className="p-lista">{`Cidade: ${data.nome_cidade}`}</p>
                                  </Col>

                                  <Col className="coluna">
                                    <p className="p-lista">{`Bairro: ${data.bairro_aluno}`}</p>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            </Container>

                            <Container>
                              <ListGroup.Item>
                                <Row>
                                  <Col className="coluna">
                                    <p className="p-lista">{`E-mail: ${data.email_pessoa}`}</p>
                                  </Col>

                                  <Col className="coluna">
                                    <p className="p-lista">{`Telefone: ${data.numero_telefone_pessoa}`}</p>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            </Container>

                            <Container className="text-center">
                              <ListGroup.Item>
                                <Button id="btnRemover" variant="btn btn-danger-list" onClick={(e) => this.remover(e, data.id)}>Remover</ Button>
                                <Button variant="btn btn-list" onClick={(e) => this.editar(e, data.id, i)}>Editar</ Button>
                              </ListGroup.Item>
                            </Container>

                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </ListGroup.Item>
                </ListGroup>
              )}
            </pre>
          </Jumbotron>
        </Jumbotron>
      </Container>
    );
  }
}
export default App;
