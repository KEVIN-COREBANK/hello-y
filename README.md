# hello-Y README
Y[wai] IDE for VS Code  Connsiderations (Just as an idea)

## Usage

 - Install hello-Y by KEVIN-COREBANK
 - Open any html / or copy below 

   <pre>
   &lt!DOCTYPE html&gt
    &lthtml lang="en"&gt
    &lthead&gt
    &ltmeta charset="UTF-8"&gt
    &ltmeta name="viewport" content="width=device-width, initial-scale=1.0"&gt
    &lttitle&gtModule Manager&lt/title&gt
    &ltstyle&gt h1 {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -100px;
        margin-left: -200px;}
    &lt/style&gt
    &lt/head&gt
    &ltbody style="background-color:rgb(60,99,201);"&gt&lth1&gtThis is Test4 KEVIN-COREBANK&lt/h1&gt
    
    &ltbutton onclick="moduleAdd()"&gtClick me&lt/button&gt
    
    &ltscript&gt
        const vscode = acquireVsCodeApi();
        function moduleAdd() {
            alert("clicked!")
            vscode.postMessage({ command: "alert", text: "BUTTON PRESSED!" });
        }
    &lt/script&gt 
    &lt/body&gt
    &lt/html&gt
    </pre>

 - ctrl+y in activeTextEditor
 -   or, 'helloY ideA' on command box

 - then you can see WebView(treated Y[wai]IDE)tab on right side of the window
 - and how to communicate between html and WebView by extension (like eclipse plugin)

 - You could consider how to make Y[wai] IDE extensions for VS Code..............
 - Be Helpful !
 
by Kevin Lee at COREBANK

### For more information

* [Y Product HomePage](http://www.uitool.org)
* [COREBANK HomePage](http://www.corebank.net)
