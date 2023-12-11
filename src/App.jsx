
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';

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
