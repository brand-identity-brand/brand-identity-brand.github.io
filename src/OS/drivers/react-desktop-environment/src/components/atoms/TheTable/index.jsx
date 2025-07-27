import css from "./index.module.css"
import { useState, memo, createContext } from "react";

// left: [
    // {
        // address,
        // renderHeaderCell,
        // renderDataCell,
        // renderFooterCell
    // }
// ],
        // cells: {
        //     left,
        //     center,
        //     right,
        // },

//! tableState is passed as props because we need to make sure when tableState updates, only the related row of the table gets updated
export default function Table({config, tableData, tableState, className="", style={}}){
    const {
        generateKey,
        renderEmptyTableMessage = () => <EmptyTableMessage/>,
        cells,
        renderChildTable,
    } = config;
console.log(cells)
    return (
        <table className={`${css.Table} ${className}`} style={style}>
            
            <thead>
                <TheadTr cells={cells}/>
                {tableState.toggleFilter && <FilterTr cells={cells}/>}
            </thead>
            { tableData.length === 0 
            ? <tbody>
                {/* { renderEmptyTableMessage() } */}
                <EmptyTableMessage>
                    { renderEmptyTableMessage() }
                </EmptyTableMessage>
            </tbody>
            : <tbody>
                { tableData.map( (rowData)=> { // rowData.parent = tableData;

                    return <TbodyTr  key={generateKey(rowData)} 
                            cells ={cells} 
                            rowData={rowData}
                            renderChildTable={renderChildTable} 
                            tableState ={ tableState}
                            generateKey={generateKey}
                        />
                } ) }
                
            </tbody>}
            <tfoot>
                <TfootTr cells ={cells}/>
            </tfoot>
        </table>
    )
}
            
 
//! factor out {key}. let props handle key assignment. 
//! no reason to enforce key values here in the black box when the users already need to know a key is needed
function TheadTr({cells}) {
    const {
        left,
        center,
        right
    } = cells;
    return (
        <tr> 
            {left.map( ({address,renderHeaderCell})=>{ return renderHeaderCell({address}) } )}
            {center.map( ({address,renderHeaderCell})=>{ return renderHeaderCell({address}) } )}
            {right.map( ({address,renderHeaderCell})=>{ return renderHeaderCell({address}) } )}
            
        </tr>
    )
}
function FilterTr({cells}) {
    const {
        left, 
        center,
        right
    } = cells;
    return <tr> 
            {left.map( ({address,renderFilterCell})=>{ return renderFilterCell({address}) } )}
            {center.map( ({address,renderFilterCell})=>{ return renderFilterCell({address}) } )}
            {right.map( ({address,renderFilterCell})=>{ return renderFilterCell({address}) } )}
            
    </tr>
}
function TbodyTr({cells, rowData, renderChildTable, tableState, generateKey}){
    const {
        left,
        center,
        right
    } = cells;
    const rowState = tableState[generateKey(rowData)];
    return (<>
        <tr className={css.TbodyTr}>
            {left.map( ({address,renderDataCell})=>{ return renderDataCell({address, rowData, rowState}) } )}
            {center.map( ({address,renderDataCell})=>{
                
                return renderDataCell({address, rowData, rowState}) 
            } )}
            {right.map( ({address,renderDataCell})=>{ 
                return renderDataCell({address, rowData, rowState}) 
            } )}
            
        </tr>
        {/* {  rowState.toggleChildTable && renderChildTable({rowData})}ChildTableWrapper */}
         {  rowState.toggleChildTable && <ChildTableWrapper>{renderChildTable({rowData})}</ChildTableWrapper>}
    </>)
}


function TfootTr({cells}){
    const {
        left,
        center,
        right
    } = cells;
    return (
        <tr> 
            {left.map( ({address,renderFooterCell})=>{ return renderFooterCell({address}) } )}
            {center.map( ({address,renderFooterCell})=>{ return renderFooterCell({address}) } )}
            {right.map( ({address,renderFooterCell})=>{ return renderFooterCell({address}) } )}
            
        </tr>
    )
}


function EmptyTableMessage({message="- empty -"}){
    return (
        <tr>
            <td colSpan={"100%"} style={{textAlign:"center", backgroundColor:"white"}}>
                {message}
            </td>
        </tr>
    )
}
// TODO instead of having this struture
// ! maybe <tr><td colspan 999/>
// ! with manually indicated layers
// ! let the childTable handle the bullets.
function ChildTableWrapper({children, className, style={}}){
    return (
        <tr
            className={className? className : ""}
            // style={style? style :{}}
        >
            <td style={{ display: "flex", justifyContent: "end", padding: 0, backgroundColor:"white",...style}}>
                └─
                {/* └ */}
            </td>
            <td colSpan={"100%"} style={{
                padding: 0,
                // backgroundColor:"blue",
            }}>
                {children}               
            </td>
        </tr>
    )
}
Table.ChildTableWrapper = ChildTableWrapper;
Table.CTW = ChildTableWrapper
Table.EmptyTableMessage = EmptyTableMessage;