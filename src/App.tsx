import FloorPlan from "./components/FloorPlan"
import { ModalProvider } from "./context/ModalContext"
import Layout from "./layout/Layout"



function App() { 

  return (
    <> <ModalProvider>
      <Layout>
        <FloorPlan/>
      </Layout> 
      </ModalProvider>
    </>
  )
}

export default App
