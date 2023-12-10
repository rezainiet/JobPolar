
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import FooterLinks from './components/FooterLinks/FooterLinks'
import { QueryClient, QueryClientProvider } from 'react-query';


function App() {


  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Navbar />
        <Outlet />
        {/* <FooterLinks/> */}
      </div>
    </QueryClientProvider>
  )
}

export default App
