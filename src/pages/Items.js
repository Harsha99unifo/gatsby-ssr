import * as React from "react"

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableVirtuoso } from "react-virtuoso";
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

let itemsHeader=["itemSlNo","sequenceNo","description"]


const Items = ({ serverData }) => {
  const {lineItems}=serverData

  return (
    <main style={pageStyles}>
    <TableVirtuoso
    style={{ height: 900,backgroundColor:"white",border: "black" }}
     data={lineItems}
    fixedHeaderContent={() => (
            <TableRow style={{"backgroundColor":"gray"}}>
            {itemsHeader.map((headerItem)=>{
              return(<TableCell key={headerItem}>{headerItem}</TableCell>)
            })}
                </TableRow>
      )}
      itemContent={(index, row) => {
        return (
          <>
             {itemsHeader.map((headerItem)=>{
              return(<TableCell key={`${row.itemSlNo}${headerItem}`}>{row[headerItem]}</TableCell>)
            })}
         </>
        )}}
    >
         
    </TableVirtuoso>
    </main>
  )

}

export default Items
export async function getServerData() {
  //let response=await fetch('https://api.allegro.sentinel.unifo.in/IMPORT/invoiceLineItems?marketCode=IN&customsBrokerCode=FLYJAC&invoiceCreationDate=1688362596060&jobId=VSB3VBI7ZAJSGR2EXTERQ&jobType=IMPORT')
  //1688540157301
  console.time("data")
  let response=await fetch('https://api.allegro.sentinel.unifo.in/IMPORT/invoiceLineItems?marketCode=IN&customsBrokerCode=FLYJAC&invoiceCreationDate=1688540157301&jobId=VSB3VBI7ZAJSGR2EXTERQ&jobType=IMPORT')
  let lineItems = await response.json()
  if(lineItems.Items.length){
    lineItems=lineItems.Items
  }else{
    lineItems=[]
  }
  console.timeEnd("data")
 return {
   props: {
    lineItems
   },
 };
}
export const Head = () => <title>Sentinel Items</title>
