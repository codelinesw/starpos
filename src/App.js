import React from 'react';
import {
 BrowserRouter as Router,
 Switch,
 Route
} from  'react-router-dom';

// Import all Components 
import Header from './Components/Header';
import SideBar from './Components/SideBar';

import Dashboard from './Screens/Dashboard';
import AddProducts from './Screens/AddProducts';
import Products from './Screens/Products';
import Organization from './Screens/Organization';
import AddOrganization from './Screens/AddOrganization';
import Facilities from './Screens/Facilities';
import AddFacilities from './Screens/AddFacilities';
import AddEmployees from './Screens/AddEmployees';
import Employees from './Screens/Employees';
import AddCategories from './Screens/AddCategories';
import Categories from './Screens/Categories';
import Sales from './Screens/Sales';
import Domiciles from './Screens/Domiciles';
import WriteDoc from './Screens/WriteDoc';

function App() {
  return (
      <Router>
        <div className="container-fluid w-100 m-auto p-0 h-100">
          <Header />
          <div className="row w-100 m-auto p-0 h-100">
            <div className="col col-md-2 bg-dark-new p-0">
              <SideBar />
            </div>
            <div className="col col-md-10 p-0">
              <Switch>
                  <Route exact 
                    path="/"
                    component={Dashboard}
                  />
                  <Route exact 
                    path="/dashboard/"
                    component={Dashboard}
                  />          
                  <Route exact 
                    path="/organization/"
                    component={Organization}
                  />
                  <Route exact 
                    path="/addorganization/"
                    component={AddOrganization}
                  />
                  <Route exact 
                    path="/organization/"
                    component={Organization}
                  />
                  <Route exact 
                    path="/facilities/"
                    component={Facilities}
                  />
                  <Route exact 
                     path="/addfacilities/"
                     component={AddFacilities}
                  />
                  <Route exact 
                     path="/addemployees/"
                     component={AddEmployees}
                  />                  
                  <Route exact 
                      path="/employees/"
                      component={Employees}
                  />
                  <Route exact 
                    path="/addcategories/"
                    component={AddCategories}
                  />
                  <Route exact 
                    path="/categories/"
                    component={Categories}
                  />
                  <Route exact 
                    path="/addproducts/"
                    component={AddProducts}
                  />                    
                  <Route exact 
                    path="/products/"
                    component={Products}
                  />            
                  <Route exact 
                    path="/sales/"
                    component={Sales}
                  />
                  <Route exact 
                    path="/domiciles/"
                    component={Domiciles}
                  />
                  <Route exact 
                    path="/writedescription/"
                    component={WriteDoc}
                  />                                                                                                                                                                                              
              </Switch>
            </div>
          </div>
        </div>
      </Router>                 
  );
}

export default App;
