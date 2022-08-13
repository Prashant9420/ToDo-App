import React,{useState} from 'react';
import style from './Content.module.css';

const Content = () => {
  let [display,editDisplay]=useState("")
  const [resultDisplay,scrDisplay]=useState("0")
  const handleClick=(value)=>{
    if(value==="clr"){editDisplay("");}
    else if(value==="="){
      if(display.includes("π")){
        let len=display.split("π").length;
        while(len--){
          display=display.replace("π",Math.round(Math.PI*100)/100);
        }
      }

      // for underroot

      if(display.includes("√")){
        for(let i=display.length-1;i>=0;i--)
        {
          if(display[i]==="√"){
            let ind;
            if(display[i+1]==="("){
              for(ind=i+1;display[ind]!==")";ind++);
              display=display.replace(display.substring(i,ind+1),Math.sqrt(eval(display.substring(i+2,ind))));
            }
            else{
              for(ind=i+1;display[ind]!=="+" && display[ind]!=="-" && display[ind]!=="*" && display[ind]!=="/" && ind!==display.length && display[ind]!==")";ind++);
              display=display.replace(display.substring(i,ind),Math.sqrt(eval(display.substring(i+1,ind))));

            }
          }
        } 
      }

      // for square
      if(display.includes("²"))
      {
        // let n=display.split("²").length;
        for(let i=0;i<display.length;i++)
        {
          if(display[i]==="²"){
            let ind;
            if(display[i-1]===")")
            { 
              for(ind=i-1;display[ind]!=="(";ind--);
              display=display.replace(display.substring(ind,i+1),Math.pow(parseFloat(eval(display.substring(ind,i))),2))
            }
            else{
              for(ind=i-1;display[ind]!=="+" && display[ind]!=="-" && display[ind]!=="*" && display[ind]!=="/" && ind!==-1 && display[ind]!=="(";ind--);
              display=display.replace(display.substring(ind+1,i+1),Math.pow(parseFloat(eval(display.substring(ind+1,i))),2));
            }
          } 
        }
      }

      // to evaluate
      try{scrDisplay(eval(display))}
      catch(e){
        scrDisplay("Invalid Input");
      }
    }
    else if(value==="X"){
      editDisplay(display.substring(0,display.length-1))
    }
    else{
    editDisplay(display+value);}
  }
  return (
    <div className={style.outerContainer}>
    <div className={style.container}>
    <div className={style.banner}></div>
    <div className={style.screen}>
      {resultDisplay}
    </div>
    <div className={style.editor}>
    {display}
    </div>
    <div className={style.keypad}>
    <table cellSpacing="7px">
  <tr>
    <td onClick={()=>handleClick("X")}>X</td>
    <td onClick={()=>handleClick("(")}>(</td>
    <td onClick={()=>handleClick(")")}>)</td>
    <td onClick={()=>handleClick("clr")}>clr</td>
    <td onClick={()=>handleClick("π")}>π</td>
  </tr>
  <tr>
    <td onClick={()=>handleClick("7")}>7</td>
    <td onClick={()=>handleClick("8")}>8</td>
    <td onClick={()=>handleClick("9")}>9</td>
    <td onClick={()=>handleClick("/")}>/</td>
    <td onClick={()=>handleClick("√")}>√</td>
  </tr>
  <tr>
    <td onClick={()=>handleClick("4")}>4</td>
    <td onClick={()=>handleClick("5")}>5</td>
    <td onClick={()=>handleClick("6")}>6</td>
    <td onClick={()=>handleClick("*")}>*</td>
    <td onClick={()=>handleClick("²")}>x²</td>
  </tr>
  <tr>
    <td onClick={()=>handleClick("1")}>1</td>
    <td onClick={()=>handleClick("2")}>2</td>
    <td onClick={()=>handleClick("3")}>3</td>
    <td onClick={()=>handleClick("-")}>-</td>
    <td rowSpan={2} onClick={()=>handleClick("=")}>=</td>
  </tr>
  <tr>
    <td onClick={()=>handleClick("0")}>0</td>
    <td onClick={()=>handleClick(".")}>.</td>
    <td onClick={()=>handleClick("%")}>%</td>
    <td onClick={()=>handleClick("+")}>+</td>
  </tr>
</table>
    </div>
    </div>
    </div>
  )
};

export default Content;