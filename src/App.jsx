import React, { useState, useEffect } from 'react';
import './App.scss';
import Chart from "react-apexcharts";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const graph_config = {
  chart: {
    id: "basic-bar"
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
  }
}

const Login = () => {

  return (
    <>
      <div class="modal" id="myModal" data-backdrop="static">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">Login</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
              <div>

              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

const Childcomponent = (props) => {
  return (
    <>
      <p>Iam a Childcomponent Iam accessing my parent's (Main component's) state, ie. <br />state: Graph name: {props.dadsprop[0]["name"]}<br />Grapg values: {props.dadsprop[0]["data"]} 
       (Parent sent me this as props)
      </p>
      <br /><br />

      <button className="btn btn-danger" onClick={() => { props.func("I Love My Mama and Papa") }}>Send data back to PARENT  from CHILD</button>
    </>
  )
}

const Nextcomponent = () => {
  return (<><a href="/">Go back to Main component</a>
    <p>Iam Next component. You just navigated from Mian component to me.</p>
  </>

  )
}
const Not_found = () => {
  return (<><h2>Iam Not found component!</h2><br /><br />
    <a href="/">Goto main component</a><br /><br />
    <a href="/next">Goto Next component</a>
  </>)
}

const Routercomponent = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">    {/*exact is must for "/" path or esle othefr components will not load.*/}
          <Main />
        </Route>
        <Route path="/next">
          <Nextcomponent />
        </Route>
        <Route>
          <Not_found />
        </Route>
      </Switch>
    </Router>
  )

}

const Main = (props) => {
  const [fire, inthehole] = useState(0)
  const [display, loadersh] = useState("show")
  const [series, changegraphstate] = useState([{ name: "series-1", data: [0, 0, 0, 0, 0, 0, 0, 0] }])
  const [msg, setmsg] = useState("")
  const ele = `you have clicked ${fire} times`

  const Iamcallingfromchild = (argfromchild) => {

    setmsg(<p>Mychild sent me this : {argfromchild}. <div>(I sent one of my function to my child as props and he called that)</div></p>)

  }

  useEffect(() => { document.title = ele + " " + display; alert("title WillUpdate");}, [fire, display]) /*componentWillUpdate for fire and display */
  useEffect(() => { return alert("Main componentDidMount!")}, [])               /*componentDidMount*/
  useEffect(()=>{ return ()=>{ alert("Main componentWillUnmount!")}},[])     /*componentWillUnmount */


  const toggle = () => {
    if (display === "hide") {
      loadersh("show")
    }
    else {
      loadersh("hide")
    }
  }
  const generategraph = () => {
    changegraphstate([{ name: "series-1", data: [10, 20, 40, 60, 80, 85, 90, 100] }])
  }
  return (
    <div>
      <Login />
      <div className=".container-fluid parentclass" style={{ backgroundColor: '#d7cece' }}>
        <div className="navbar"><div>Navbar</div> <div><button className="btn-success btn login-btn" data-toggle="modal" data-target="#myModal">Login</button></div></div>
        <div className="row" style={{ padding: '5px', display: 'flex', justifyContent: 'space-arround' }}>
          <div className="col-md-2 box" style={{ backgroundColor: '#ffffff', height: '400px' }}>
            Created by {props.name}<br />
            <Loader display_status={display} />
          </div>
          <div className="col-md-5 box" style={{ backgroundColor: '#ffffff', height: '400px' }}>
            <div className="col-md-12">
              <p>{fire === 0 ? "Zero" : fire}</p>
              <Childcomponent dadsprop={series} func={Iamcallingfromchild} /><br /><br />
              <p>Waiting for message from child: {msg}</p>
            </div>
          </div>
          <div className="col-md-5 box" style={{ backgroundColor: '#ffffff', height: '400px' }}>
            <div className="Jschart">
              <div className="row">
                <div className="mixed-chart">
                  <Chart
                    options={graph_config}
                    series={series}
                    type="bar"
                    width="500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <button className="btn btn-success" onClick={() => inthehole(fire + 1)}>Increment (Observe page title)</button>&nbsp;
        <button className="btn btn-success" onClick={() => toggle()}>Start/Stop loader</button>&nbsp;
        <button className="btn btn-success" onClick={() => generategraph()}>Generate graph</button><br/>
        <a href="/next">1. Goto Next component(using anchor tag href="/path":&nbsp;componentWillUnmount not works!!)</a> <br />
        <Link to="/next">2. Goto Next component(using Link tag to="/path":&nbsp;componentWillUnmount works!!)</Link><br/>
        <button className="btn btn-success" onClick={() => window.location.assign("/next")}>Goto Nextcomponent using window.location.assign():<br/>componentWillUnmount not works!</button>&nbsp;
        <button className="btn btn-success" onClick={() => window.open("/next")}>Goto Nextcomponent using window.open():<br/>componentWillUnmount not works!</button>
        <br/><br/><br/>
      </div>
    </div>


  )


}

const Loader = (props) => {
  if (props.display_status === "show") {
    return (<img src={require('./images/loader.gif')} alt="loaderimg" heiht="100px" width="100px" />)
  }
  else if (props.display_status === "hide") {
    return (<span>Loader stoped !</span>)
  }
}

export default Routercomponent;
