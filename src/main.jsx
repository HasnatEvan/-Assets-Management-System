import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Router/Router.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

// Create a new instance of QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
       <HelmetProvider>
       <div className='max-w-screen-xl mx-auto'>
          <RouterProvider router={router} />
        </div>
       </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
