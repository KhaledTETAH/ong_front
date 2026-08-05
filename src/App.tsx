import MessageriePage from './pages/MessageriePage'
import PortfolioPage from './pages/PortfolioPage'
import OffersPage from './pages/OffersPage'
import {Routes,Route} from 'react-router-dom'
function App() {
  return (
   <> 
    
     <Routes>
      <Route path="/portfolio" element={<PortfolioPage/>} />
      <Route path="/messagerie" element={<MessageriePage />} />
      <Route path="/offers" element={<OffersPage/>} />

   
    </Routes>
  </>

   
   
  )
}

export default App
