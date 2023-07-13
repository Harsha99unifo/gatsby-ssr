import * as React from "react"

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableVirtuoso } from "react-virtuoso";
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

let itemsHeader=["itemSlNo","sequenceNo","hsn","itemDescription","genericDescription","concatenateDescription","qty","uom","customsQty","customsUom","unitPrice","amount"]

const Items = ({ serverData }) => {
  const {lineItems}=serverData

  return (
     <div>
    <TableVirtuoso
    style={{ height: "70vh",backgroundColor:"white",border: "1.5px solid #e7e7e7",overflow: "auto" }}
     data={lineItems.Items}
    fixedHeaderContent={() => (
            <TableRow style={{"backgroundColor":"darkblue"}}>
            {itemsHeader.map((headerItem)=>{
              return(<TableCell style={{"color":"white"}}key={headerItem}>{headerItem}</TableCell>)
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
     </div>
  )

}

export default Items
export async function getServerData() {

  console.time("data")
     //1000
   let response=await fetch('https://api.allegro.sentinel.unifo.in/IMPORT/invoiceLineItems?marketCode=IN&customsBrokerCode=FLYJAC&invoiceCreationDate=1689238353840&jobId=PQJBLU_8LZ_QYPNGCEVN4&jobType=IMPORT')
  //2000
   //let response=await fetch('https://api.allegro.sentinel.unifo.in/IMPORT/invoiceLineItems?marketCode=IN&customsBrokerCode=FLYJAC&invoiceCreationDate=1689238634293&jobId=PQJBLU_8LZ_QYPNGCEVN4&jobType=IMPORT')
  //3000
   //let response=await fetch('https://api.allegro.sentinel.unifo.in/IMPORT/invoiceLineItems?marketCode=IN&customsBrokerCode=FLYJAC&invoiceCreationDate=1689239053298&jobId=PQJBLU_8LZ_QYPNGCEVN4&jobType=IMPORT')
  //4000
  //let response=await fetch('https://api.allegro.sentinel.unifo.in/IMPORT/invoiceLineItems?marketCode=IN&customsBrokerCode=FLYJAC&invoiceCreationDate=1689239499301&jobId=PQJBLU_8LZ_QYPNGCEVN4&jobType=IMPORT')
  //5000
   //let response=await fetch('https://api.allegro.sentinel.unifo.in/IMPORT/invoiceLineItems?marketCode=IN&customsBrokerCode=FLYJAC&invoiceCreationDate=1689244046853&jobId=PQJBLU_8LZ_QYPNGCEVN4&jobType=IMPORT')
  //6000
  //let response=await fetch('https://api.allegro.sentinel.unifo.in/IMPORT/invoiceLineItems?marketCode=IN&customsBrokerCode=FLYJAC&invoiceCreationDate=1688122112630&jobId=KMT0UJQUJCFKCWWLYP4OA&jobType=IMPORT')
  let lineItems = await response.json()
  if(lineItems.Items.length){
    lineItems.Items=lineItems.Items.sort((a,b)=>a.itemSlNo-b.itemSlNo)
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
