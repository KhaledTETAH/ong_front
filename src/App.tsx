import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

function App() {
  return (
    <Container className="py-5 text-center">
      <h1>ONG — Front</h1>
      <p className="text-muted">
        Bootstrap est prêt. Développez dans <code>src/</code> en suivant
        l&apos;organisation décrite dans le <code>README.md</code>.
      </p>
      <Button variant="primary">Faire un don</Button>
    </Container>
  )
}

export default App
