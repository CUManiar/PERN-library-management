import React from 'react';


const DataTable = ({ headers = [], data = [], actionHeaders = [], actions = [] }) => {
    return (
        <table className="f6 w-100 mw8 center" cellSpacing="0">
            <thead>
                <tr>
                    {
                        headers.map((item, i) => (
                            <th key={i} className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">{item}</th>
                        ))
                    }
                    {
                        actionHeaders.map((ac, i) => (
                            <th key={i} className="fw4 tc bb b--black-20 tl pb3 pr3 bg-white f4">{ac}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody className="lh-copy">
                {
                    data.map((item, i) => (
                        <tr key={i} className="hover-bg-black hover-white pointer">
                            {
                                Object.values(item).map((d, i) => (
                                    <td key={i} className="pv3 pr3 bb b--black-20 ttc tl"> {d} </td>
                                ))
                            }
                            {
                                actions.map((action, i) => (
                                    <td className={`pv3 ttc pr3 bb b--black-20`}> {action} </td>
                                ))
                            }

                            {/* <td className='pv3 pr3 bb b--black-20 ttc tl'>{item['book_name']}</td>
                                <td className='pv3 pr3 bb b--black-20 ttc'>{item['author']}</td>
                                <td className='pv3 pr3 bb b--black-20'>{item['pages']}</td>
                                <td className='pv3 pr3 bb b--black-20 ttc'>{item['publication']}</td>
                                <td className={`pv3 pr3 bb b--black-20 b ${item['book_count'] > 0 ? 'underline link dark-blue pointer' : 'mid-gray'}`}
                                    onClick={() => this.borrowBook(item['book_name'])}
                                >{item['book_count'] > 0 ? 'Borrow' : 'Not Available'}
                                </td> */}
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}


export default DataTable;