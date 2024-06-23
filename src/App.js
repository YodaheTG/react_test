import React, { useState, useMemo } from 'react';

import Select from 'react-select';

import { MapContainer, TileLayer, Marker, Popup, useMap, } from 'react-leaflet'
import './App.css';
const SearchDropdown = () => {
  //data to be searched, queried
  const options = [
    { value: "value1", label: "label1", y: 55.94917314520992, x: -3.2637150403598616 },
    { value: "value2", label: "label2", y: 55.93379120610919, x: -3.2074101119831284 },
    { value: "value3", label: "label3", y: 55.91378555144489, x: -3.22594953961937 },
    { value: "value4", label: "label4", y: 55.918253766258665, x: -3.2385420513214096 },
    { value: "value5", label: "label5", y: 55.966086223371555, x: -3.177197711390735 }
  ];
  //create state to store selections
  const [users, setUsers] = useState([]);
  const [choice, setChoice] = useState([])
  const outerBounds = [
    [52.505, 29.09],
    [52.505, -29.09],
  ]


  const [outerBounds2, setOuterBounds2] = useState([552.505, 29.09, 52.505, -29.09]);
  const corner1 = [outerBounds2[1], outerBounds2[0]];
  const corner2 = [outerBounds2[3], outerBounds2[2]];
  const outerBounds3 = [corner1, corner2];
  //funciton triggered whne a search parameter is slected 
  function handleChange(e) {

    const addElement = (newElement) => {

      setUsers([...users, newElement]);

    };

    addElement({ 'x': e.x, 'y': e.y, 'label': e.label })
    setChoice(e.label)

  }
  //delete choice or selection
  const deleteItem = (event) => {
    event.preventDefault();
    const newItems = users.filter((item) => item.label !== choice);
    setUsers(newItems);
  };

  //filter through selection to avoid marking repeated search entries
  let res = Array.from(new Set(users.map(JSON.stringify)))
    .map(JSON.parse);

  function SetBoundsRectangles() {
    const [bounds, setBounds] = useState(outerBounds)
    const map = useMap()

    const innerHandlers = useMemo(
      () => {

        if (outerBounds2[0] !== null) {
          setBounds(outerBounds3)
          map.fitBounds(outerBounds3)
        }

      },
      [map],
    )
  }
  //create a function for your new component with the component name
  function PrintPage() {

    function handlePrint(event) {
      event.preventDefault();
      window.print()
      //the window.print() command is what is telling the browser to print the page
    }
    return (
      <button className = 'print'onClick={handlePrint} > Print </button>
    )

  }
  //set default bounds for map frame   
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //  // console.log('hi yoda')
  //  console.log(choice)
  //  res.map((item, idx) => {
  //   //console.log(item.label)
  //   res = res.filter(obj => obj.label !== choice);

  // })

  //   //delete res[choice]
  //   //res = res.filter(obj => obj.label !== choice);
  //   //console.log(res);
  //   //alert("The browser will not reload when the alert box is closed.");
  // };
  return (
    <div className='wrapper'>
      <form>
        <div className='search'>
          <Select
            // value={selectedOption}
            onChange={handleChange}
            options={options}
          // setSelectedOption(selectedOption)
          />
        </div>
        <button className='button' type="submit" onClick={deleteItem}>Delete selection</button>
        <PrintPage />
      </form>
       
       
      <MapContainer center={[55.941482927245765, -3.2074092682066007]} zoom={11} scrollWheelZoom={false}>
        {/* <SetBoundsRectangles/> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[55.941482927245765, -3.2074092682066007]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {
          res.map((item, idx) => {
            //console.log(item.x)
            // <button className='button' onClick={() => deleteItem(item.idx)}>Delete</button>
            return (
              <Marker key={idx} position={[item.y, item.x]}>
                <Popup>{item.label}</Popup>
              </Marker>
            );
          })
        }

      </MapContainer>


    </div>

  );
}



export default SearchDropdown;