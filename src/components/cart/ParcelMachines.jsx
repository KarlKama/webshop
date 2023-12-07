import React, {useEffect, useState} from 'react'

const ParcelMachines = () => {
    const [parcelMachines, setParcelMachines] = useState([]); // paneme algse tühja seisu pakiautomaatidele
    const url = "https://www.omniva.ee/locations.json";
    
    // uef
    useEffect(() => {
        fetch(url)          // küsib async urlist andmeid, jätkab lehe laadimist, kui on andmed olemas siis läheb edasi (nagu await)
          .then(response => response.json())
          .then(json => {
            const result = json.filter(pm => pm.A0_NAME === "EE" && !pm.NAME.includes("1. eelistus")); // filterdan ainult eesti omad
            setParcelMachines(result);
          })
        console.log("Fetching done!");
      }, []); // [] vahele pannes see muutuja saab muutuda. Kui seal pole midagi, siis re-renderdust useEffectiga ei tule!
    

    return (
        <select>
            {parcelMachines.map(pm => <option key={pm.NAME}>{pm.NAME}</option>)}
        </select>
    )
}

export default ParcelMachines