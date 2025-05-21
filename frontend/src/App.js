import { Routes, Route } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar"; 
import Ofertas from "./pages/Ofertas";
import Alerts from "./pages/Alerts";


function App(){
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" p={6}>
        <Routes>
          <Route path="/" element={<Ofertas />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </Box>
    </Flex>
  );
}

export default App;