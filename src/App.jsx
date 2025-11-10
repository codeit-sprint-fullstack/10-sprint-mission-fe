import { useState } from 'react'
import "./global.css";
import "./styleItems.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ItemLists from './pages/ItemLists.jsx';

function App() {
  return (
    <>
      <Header />
      <ItemLists />
      <Footer />
    </>
  )
}

export default App
