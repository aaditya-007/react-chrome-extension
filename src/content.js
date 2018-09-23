/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer} from 'react-frame-component';
import Form from './form';
import "./content.css";

class Main extends React.Component {
    
    addProfile() {
        console.log( 'name' );
    }

    componentDidMount(){

    }

    render() {
        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}> 
               <FrameContextConsumer>
               {
               // Callback is invoked with iframe's window and document instances
                   ({document, window}) => {
                      // Render Children
                        return (
                           <div className={'my-extension'}>
                               <h1>InterviewBit Plus</h1>
                               <button onClick= { () => { this.addProfile()} } > Add Profile </button>
                               <Form />
                           </div>
                        )
                    }
                }
                </FrameContextConsumer>
            </Frame>
        )
    }
}

const app = document.createElement('div');
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action") {
        toggle();
      }
   }
);

function toggle(){
   if(app.style.display === "none"){
     app.style.display = "block";
   }else{
     app.style.display = "none";
   }
}