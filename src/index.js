import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { Provider } from "./components/ui/provider"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Container } from '@chakra-ui/react';
import Navbar from './pages/Navbar.tsx';
import NpmPage from './pages/NpmPage.tsx';
import TodoPage from './pages/TodoPage.tsx';
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <Navbar />
        <Container maxW="6xl" py={6}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/npm" element={<NpmPage />} />
         {/* <Route path="/news" element={<NewsPage />} /> */}
          <Route path="/todo" element={<TodoPage />} /> *
          </Routes>
        </Container> </BrowserRouter>
        </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
