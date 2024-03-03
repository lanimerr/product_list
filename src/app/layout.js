'use client';
import { Inter } from "next/font/google";
import React from 'react';
import { store } from '../store/configureStore';
import { Provider } from 'react-redux';
import App from '../componnents/App';


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>{children}<App/></Provider>
      </body>
    </html>
  );
}
