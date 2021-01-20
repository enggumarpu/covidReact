const countriesData = async () => {
    // const data = axios.get('https://disease.sh/v2/all').then(response => {
    //     // do stuff
    //     console.log('response', response.data);
    //     dispatch({type: 'GLOBAL', payload: response.data })
    //     })
    //     .catch(error => {
    //     // what now
    //     console.log('error', error);
    //     dispatch({type: 'ERROR', payload: error})
    // }) 
  }


  {/* <List>
      {[1, 2, 3].map((value)=>{
          return <ListItem button divider>{`Umar ${value}`}</ListItem>
      })}
    </List> */}

  {/* <ListItemText style={{padding: '0 0', margin: '0 0'}}>
                <img src={country.countryInfo.flag} width="50px" height="33px" alt={country.country}/>
              </ListItemText> */}              




               // <ListItem
                //   key={i}
                //   divider
                //   button
                //   onClick={() => {
                //     handleSelction(country.country);
                //   }}
                //   value={country.country}
                //   className={classes.listItem}
                // >
                //   <ListItemIcon>
                //     <img
                //       src={country.countryInfo.flag}
                //       width="50px"
                //       height="33px"
                //       alt={country.country}
                //     />
                //   </ListItemIcon>
                //   <ListItemText style={{ margin: "0 20px" }}>
                //     {parseInt(country.cases).toLocaleString()}
                //   </ListItemText>
                //   <ListItemText style={{ textAlign: "left" }}>
                //     {country.country}
                //   </ListItemText>
                // </ListItem>


                const urlG = 'https://disease.sh/v2/countries';
                urlG = c.length ? `https://disease.sh/v2/countries/${c}` : 'https://disease.sh/v2/countries' : ;
              



                <Grid item md={12} style={{width: '100%'}}>
               <List
                 style={{ maxHeight: 450, overflow: "auto" }}>
                 {/* {maxHeight: 400} */}
                 {/* {countries.filter((item, i) => ( <ListItem>{item.country}</ListItem> ))} */}
                 {countriesData
                   .filter((item) =>
                     item.country
                       .toLowerCase()
                       .substring(0, searchText.length)
                       .includes(searchText.toLowerCase())
                   )
                   .map((filterName, i) => (
                     <ListItem
                       key={i}
                       divider
                       button
                       onClick={() => {
                         handleSelction(filterName.country);
                       }}
                       value={filterName.country}
                       className={classes.listItem}
                     >
                       <ListItemIcon>
                         <img
                           src={filterName.countryInfo.flag}
                           width="50px"
                           height="33px"
                           alt={filterName.country}
                         />
                       </ListItemIcon>
                       <ListItemText style={{ margin: "0 20px" }}>
                         {parseInt(filterName.cases).toLocaleString()}
                       </ListItemText>
                       <ListItemText style={{ textAlign: "left" }}>
                         {filterName.country}
                       </ListItemText>
                     </ListItem>
                   ))}
               </List>
             </Grid>




 {/* <div style={{ display: "flex", justifyContent: "center" }}>

             <SearchIcon style={{color: '#115293'}} />
               <TextField
                 variant="standard"
                 placeholder="Search Country"
                 fullWidth
                 style={{background: 'white', outline:'none', border: 'none'}}
                 InputLabelProps={{ shrink: true }}
                 onChange={searchedFunction}
               />
               
             </div> */}

              {/* <div className="countriesSelection" style={{margin: '20px 0'}}>
             <FormControl fullWidth={true}>
               <NativeSelect value={selectionCN} onChange={onChangeSelection} variant="outline">
                 {countriesData.map((country) => (
                   <option value={country.country}>{country.country}</option>
                 ))}
               </NativeSelect>
             </FormControl>
           </div> */}