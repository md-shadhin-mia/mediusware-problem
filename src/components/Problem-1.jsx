import React, {useState} from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [list, setList] = useState([]);
    const [inputFields, setInputFields] = useState({name:"", status:""});
    const handleClick = (val) =>{
        setShow(val);
    }
    const addNew=(e)=>{
        e.preventDefault();
        setList((preList)=>{
            const newList = [...preList, inputFields];
            setInputFields({name:"", status:""});
            newList.sort(compareStatus)
            return newList;
        });
    }

    const compareStatus=(a, b)=>{
        const order = ['Completed','Active'];
      
        // if (order.indexOf(a.status) < order.indexOf(b.status)) {
        //   return -1;
        // }
        // if (order.indexOf(a.status) > order.indexOf(b.status)) {
        //   return 1;
        // }
        return order.indexOf(b.status) - order.indexOf(a.status);
      }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={addNew}>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name" 
                            value={inputFields.name} onChange={(e)=> setInputFields({...inputFields, name:e.target.value})}/>
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status"
                            value={inputFields.status} onChange={(e)=> setInputFields({...inputFields, status:e.target.value})}/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>{
                            list.filter(v=>{
                                if(show==='all')
                                    return true;
                                else if(show==='active')
                                    return v.status === 'Active';
                                else if(show==='completed')
                                    return v.status === 'Completed';
                            })
                            .map((data, index)=>(
                                <tr key={index}>
                                    <td>{data.name}</td>
                                    <td>{data.status}</td>
                            </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;