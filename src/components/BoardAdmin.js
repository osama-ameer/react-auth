import PropTypes from 'prop-types';
import React, { useEffect, useRef, useImperativeHandle, useState } from "react";
import Flexmonster from "flexmonster";
import authHeader from '../services/auth-header';

export function BoardAdmin(props, ref) {
    const flexmonsterRef = useRef()
    const [user, setUser] = useState()
    const [checkAdmin, setCheckAdmin] = useState(true)
    const [message, setMessage] = useState('')

    let flexmonster = null;
    useEffect(() => {

      let user = localStorage.getItem('user')
      setUser(user)

        const getData = async () =>{

            const api ="http://localhost:8080/api/test/admin";

            let data = await fetch(api,  { headers: authHeader() });
            let res = await data.json();
            // console.log(data);

            if(res.message == "Require Admin Role!"){
                setCheckAdmin(false)
                setMessage('Require Admin Role!')
            }


          if(res.recordset){
        flexmonster = new Flexmonster({
            ...props,
            container: flexmonsterRef.current,
            componentFolder: "https://cdn.flexmonster.com/",
            toolbar:true,
            width: "100%",
            report: {
                dataSource: {
                        /* URL to the Data Compressor Node.js */
                       // filename: "http://localhost:5000/",
                       data:res.recordset
                   },
                   
                   slice: {

                   columns:[{
                       uniqueName: "MonthNam"

                   }],
                  
                   rows: [{
                       uniqueName: "Team"
                   },
                   
                   {
                    uniqueName: "ProdDesc"

                },
                {
                  uniqueName: "TerritoryCode"

              }
                   ],
                   measures: [{
                    "uniqueName": "TargetUnit",
                       "aggregation": "sum"
                   },{
                       "uniqueName": "SalesUnit",
                       "aggregation": "sum"
                   }
                   
                   
                  ]
                   },      
                }

        })}



    }
    getData()
        if(flexmonster){
        return () =>  flexmonster.dispose() 
        }
    }, [])

    useImperativeHandle(ref, () => ({
        flexmonster: () => {
            return flexmonster;
        }
    }));

    BoardAdmin.propTypes = {
        afterchartdraw: PropTypes.func,
        aftergriddraw: PropTypes.func,
        beforegriddraw: PropTypes.func,
        beforetoolbarcreated: PropTypes.func,
        cellclick: PropTypes.func,
        celldoubleclick: PropTypes.func,
        chartclick: PropTypes.func,
        componentFolder: PropTypes.string,
        customizeAPIRequest: PropTypes.func,
        customizeCell: PropTypes.func,
        customizeChartElement: PropTypes.func,
        customizeContextMenu: PropTypes.func,
        datachanged: PropTypes.func,
        dataerror: PropTypes.func,
        datafilecancelled: PropTypes.func,
        dataloaded: PropTypes.func,
        drillthroughclose: PropTypes.func,
        drillthroughopen: PropTypes.func,
        fieldslistclose: PropTypes.func,
        fieldslistopen: PropTypes.func,
        filterclose: PropTypes.func,
        filteropen: PropTypes.func,
        fullscreen: PropTypes.func,
        global: PropTypes.object,
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        licenseKey: PropTypes.string,
        loadingdata: PropTypes.func,
        loadinglocalization: PropTypes.func,
        loadingolapstructure: PropTypes.func,
        loadingreportfile: PropTypes.func,
        localizationerror: PropTypes.func,
        localizationloaded: PropTypes.func,
        olapstructureerror: PropTypes.func,
        olapstructureloaded: PropTypes.func,
        openingreportfile: PropTypes.func,
        querycomplete: PropTypes.func,
        queryerror: PropTypes.func,
        ready: PropTypes.func,
        report: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        reportchange: PropTypes.func,
        reportcomplete: PropTypes.func,
        reportfilecancelled: PropTypes.func,
        reportfileerror: PropTypes.func,
        reportfileloaded: PropTypes.func,
        runningquery: PropTypes.func,
        sortFieldsList: PropTypes.func,
        toolbar: PropTypes.bool,
        unauthorizederror: PropTypes.func,
        update: PropTypes.func,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }

    // console.log(checkAdmin);
    return <div>
      
      { (user != null) && checkAdmin == true ?
       <div ref={flexmonsterRef}>Loading...</div>
        : <div>
            { !checkAdmin ? 
        <div><h3>{message}</h3></div> 
        :<div><h3>Login to access!</h3></div> }
        </div>  }
    </div> 
}

export default BoardAdmin = React.forwardRef(BoardAdmin);