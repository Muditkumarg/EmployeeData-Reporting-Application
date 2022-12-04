import './App.css';
import SignIn from './component/login';
import SignUp from './component/signUp';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import DataTable from './component/DataGrid';
import DonutChartComp from './component/DonutCharComp';
import DoughnutChart from './component/Chart';
import DemoChart from './Donut';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/DataGrid' element={<> <DataTable /></>} />
          <Route path='/DonutChartComp' element={<DonutChartComp/>}/>
          <Route path = '/chart' element={<DoughnutChart/>}/>
          <Route path = '/newchart' element={<DemoChart/>}/>
         
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
