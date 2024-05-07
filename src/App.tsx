import DataList from './DataList';
import { item } from './data/data';
import './App.css';

const App = () => {

  return (
    <div className="app">
      <DataList items={item} />
    </div>
  );
};

export default App;
