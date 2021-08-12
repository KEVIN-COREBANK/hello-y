    /*
    (function() {
      var _old_alert = window.alert;
      
      window.alert = function() {
                       // run some code when the alert pops up
          document.body.innerHTML += "<br>alerting";
          _old_alert.apply(window,arguments);
                       // run some code after the alert
          document.body.innerHTML += "<br>done alerting<br>";
      };
    })();
    */  
    const vscode = acquireVsCodeApi(); 
    function moduleAdd(){
      alert("clicked!");
      var name = prompt("Enter Your Name", "Jon");
      vscode.postMessage({command: "alert", text: "BUTTON PRESSED!"});
    }