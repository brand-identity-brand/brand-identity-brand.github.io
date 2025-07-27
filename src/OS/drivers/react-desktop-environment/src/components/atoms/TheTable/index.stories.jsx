import css from "./index.module.css"
import { useState } from "react";
import Table from ".";

export default {
    title: 'Mock/TheTable',
    component: Table,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen', // 'centered' or 'padded' or 'fullscreen'
    },
}

const Template = (args) => ( <Table {...args} /> );

const tableData = [{
        id: "1",
        title: "Book"
    },{
        id: "2",
        title: "Shirt"
    },{
        id: "3",
        title: "A Long Name For No Reasons"
    }];

export const Default = Template.bind({});
Default.args = {
    config: {
        bullet: {
            renderTheadThBullet:()=> <th>  </th>,
            renderTbodyTdBullet:(rowData, showChild,toggleShowChild, config)=> (
                <td onClick={()=>{toggleShowChild()}}> 
                { config.renderChildTable 
                    ?  <button> {showChild? " = " : " > "} </button> 
                    :  <button> {" - "} </button> 
                }
                </td>
            ),
            renderTfootTdBullet:()=> <td> + </td>,
        },
        cells: [
            {
                address: 'id',
                title: "sku",
                renderTitle: (cellData)=><th>{cellData}</th>,
                renderData: (cellData)=>cellData,
                renderFooter: (cellData)=>cellData,

            },
            {
                address: 'title',
                title: "title",
                renderTitle: (cellData)=>cellData,
                renderData: (cellData)=>cellData,
                renderFooter: (cellData)=>cellData,
            }
        ],
        actions: {
            renderTheadThActions: ()=><th> -actions- </th>,
            renderTbodyTdActions: (rowData) => <td>
                <button>edit</button>
            </td>,
            renderTfootTdActions: (rowDataOfTheCurrentFooterRow)=><td>
                <button>edit</button>
                <button>delete</button>
            </td>,
        },
        renderChildTable: (rowData)=>{ 
            // return JSON.stringify(rowData)
            return (
                <Table tableData={[rowData]} 
                    config = {{
                        bullet: {
                            renderTheadThBullet:()=> <th>  </th>,
                            renderTbodyTdBullet:(rowData, showChild,toggleShowChild, config)=> (
                                <td onClick={()=>{toggleShowChild()}}> 
                                { config.renderChildTable 
                                    ?  <button> {showChild? " = " : " > "} </button> 
                                    :  <button> {" - "} </button> 
                                }
                                </td>
                            ),
                            renderTfootTdBullet:()=> <td> + </td>,
                        },
                        cells: [
                            {
                                address: 'id',
                                title: "sku",
                                renderTitle: (cellData)=><th>{cellData}</th>,
                                renderData: (cellData)=>cellData,
                                renderFooter: (cellData)=>cellData,

                            },
                            {
                                address: 'title',
                                title: "title",
                                renderTitle: (cellData)=>cellData,
                                renderData: (cellData)=>cellData,
                                renderFooter: (cellData)=>cellData,
                            }
                        ],
                        actions: {
                            renderTheadThActions: ()=><th> -actions- </th>,
                            renderTbodyTdActions: (rowData) => <td>
                                <button>edit</button>
                            </td>,
                            renderTfootTdActions: (rowDataOfTheCurrentFooterRow)=><td>
                                <button>edit</button>
                                <button>delete</button>
                            </td>,
                        },
                    }}
                />
            )
        }
    },
    tableData
};

// export const WithTabs = Template.bind({});



