// Things to do
// applyEdit not affected immediately (getText() remain old contents)
// html in webview - alert() not working some scripts would not working ... more tests needed
// - solved 0717 (only in extension development host) external scripts not loaded(working) .... also css may be
// when debugging..... in child vscode, extension debugging message(console.log) displayed even after close webview (deactivate)
//

/*
        
        -- remote vs code  https://towardsdatascience.com/the-only-vs-code-extension-you-will-ever-need-e095a6d09f24
        -- how to communicate with : https://www.programmersought.com/article/37136325636/
        -- events list here https://developer.mozilla.org/ko/docs/Web/Events
        https://linuxism.ustd.ip.or.kr/1705
        https://stackoverflow.com/questions/5107232/is-it-possible-to-programmatically-catch-all-events-on-the-page-in-the-browser
        https://codepen.io/phreaknation/pen/QmJjEa
        
        https://marketplace.visualstudio.com/items?itemName=NicholasHsiang.vscode-javascript-snippet
        
        https://www.freecodecamp.org/news/javascript-addeventlistener-example-code/
        
        https://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick
        
        https://github.com/microsoft/vscode/issues/48540
        
        https://stackoverflow.com/questions/57557684/is-there-any-way-to-navigate-from-visual-studio-code-extensions-webview-to-exte
        
        https://stackoverflow.com/questions/59233387/why-is-js-css-not-loaded-in-my-vsc-extension-webview
        
        https://stackoverflow.com/questions/56830928/calling-vscode-extension-for-data-from-webview
        
        https://stackoverflow.com/questions/56182144/vscode-extension-webview-external-html-and-css
        
        If a webview accesses localhost content, we recommend that you specify port mappings even if the webviewPort and extensionHostPort ports are the same.
        Note that port mappings only work for http or https urls. Websocket urls (e.g. ws://localhost:3000) cannot be mapped to another port.

        https://stackoverflow.com/questions/59233387/why-is-js-css-not-loaded-in-my-vsc-extension-webview

        const subscriptions = [];

        subscriptions.push(vscode_1.window.onDidChangeVisibleTextEditors(system_1.Functions.debounce(this._onVisibleTextEditorsChanged, 100), this));
        subscriptions.push(vscode_1.window.onDidChangeTextEditorViewColumn(this._onTextEditorViewColumnChanged, this));
        subscriptions.push(vscode_1.workspace.onDidCloseTextDocument(this._onTextDocumentClosed, this));
        subscriptions.push(this.blameabilityTracker.onDidChange(this._onBlameabilityChanged, this));
        this._blameAnnotationsDisposable = vscode_1.Disposable.from(...subscriptions);
     */

//const opn = require('opn');
const vscode = require('vscode');
const fs = require('fs');
const os = require('os');
const path = require('path');
const log = (...txt) => vscode.window.showInformationMessage(txt.join(' '));

var panelA = new Array();

function activate(context) {

  context.subscriptions.push(
    vscode.commands.registerCommand('helloY.ide', () => {
      console.log("registerCommand  helloY.ide Starting...");
      var panel;
      var fullText;
      var fullText1;
      var fullText2;

      vscode.env.openExternal(
        //vscode.Uri.parse('http://www.uitool.org')
        vscode.Uri.parse(vscode.window.activeTextEditor.document.uri.path)
      );
      

      let te = vscode.window.activeTextEditor;
      let doc = te.document;
      let editor = te;
      let ts_doc=vscode.window.activeTextEditor.document;
      let count = 0;
      let ts_path=doc.uri.path.substring(doc.uri.path.lastIndexOf('/')+1);
      clog('b');
      for (const editor of vscode.window.visibleTextEditors) {  // only showing contents
        count++;
        clog(editor.document.uri.path + ' visible')
      }
      if (count == 0) {
        vscode.window.showErrorMessage('This Content is not fit for Y[wai]');
        return;
      }

      for (const doc of vscode.workspace.textDocuments) {    // all tabs but text only
        count++;
        clog(doc.uri.path + ' textDocuments')
      }

      vscode.window.showInformationMessage(ts_path + ' ' + 'activated ' + count);
      clog(ts_path + ' ' + 'activated ' + count);

      fs.appendFileSync('c:\\message.txt', ts_path + ' ' + 'StartIDE...' + Date.now() + '\n', function (err) {
        if (err) {
          clog('appendError');
        }
        clog('Saved!');
      });
      clog('Append Start log on c:\message.text Fin');

      if (!te || !te.document) {
        vscode.window.showInformationMessage(te.document.uri.path + "Not a Proper document.");
        return;
      }
      clog(vscode.window.activeTextEditor.document.languageId);

      if (!te || !te.document) {
        vscode.window.showInformationMessage(te.document.uri.path + "Not a Proper document.");
        return;
      }
      let result1 = te.document.languageId.toLowerCase() === "html";
      let result2 = te.document.languageId.toLowerCase() === "htm";
      if (!result1 && !result2) {
        vscode.window.showInformationMessage(te.document.uri.path + "Not a HTML document.");
        return;
      }

      vscode.workspace.textDocuments;
      panel = vscode.window.createWebviewPanel('kevin', '[ ' + ts_path+ ' ]', -2, {
        enableScripts: true,
        enableModals: false
      });
       
      //panel.iconPath={
      //  light: 'kevin-corebank.png',
      //  dark: 'kevin-corebank.png'
      //}
      
      const onDiskPath = vscode.Uri.file( path.join(context.extensionPath, ".", "y.png"));
      panel.iconPath = onDiskPath;
      panel.docFullPath = doc.uri.path; 
      panelA[panelA.length]=panel;
      
      clog(panelA[(panelA.length==0) ? 0 : panelA.length-1].docFullPath);

      clog('a');

      panel.onDidDispose(
        () => {
          // When the panel is closed, cancel any future updates to the webview content
          clog('WebView disposed');
          panel = undefined;
          deactivate();
        },
        null,
        context.subscriptions
      );
      panel.onDidChangeViewState(
        e => {
          const panel = e.webviewPanel;
          switch (panel.viewColumn) {
            case vscode.ViewColumn.One:
              clog( 'Coding Cat');
              return;

            case vscode.ViewColumn.Two:
              clog('Compiling Cat');
              return;

            case vscode.ViewColumn.Three:
              clog('Testing Cat');
              return;
          }
        },
        null,
        context.subscriptions
      );
      

      // handle recieving messages from the webview
      panel.webview.onDidReceiveMessage(message => {
        switch (message.command) {
          case 'alert':
            vscode.window.showErrorMessage(ts_path + ' ' + message.text + ' ' + Date.now());
            clog(ts_path + ' Line=' + doc.lineCount);
            var range = editor.selection;

            //editor.edit(editBuilder => editBuilder.replace(range, 'ReplacedText'+count));


            //closeAllEditors();       // Test OK


            fs.appendFileSync('c:\\message.txt', ts_path + ' ' + 'data to append' + count + ' ' + Date.now() + '\n', function (err) {
              if (err) {
                clog('appendError');
              }
              clog('Saved!');
            });
            clog('log Appended.... Why Saved! not displayed?');

            fullText = doc.getText();
            clog('before insert, len=' + fullText.length);
            //vscode.window.showErrorMessage(ts_path+' '+'before insert, len='+fullText.length +' '+Date.now());

            const edit = new vscode.WorkspaceEdit();
            edit.insert(te.document.uri.path, new vscode.Position(0, 0), '<!--INSERT' + count + ' ' + Date.now() + '-->\n');
            vscode.workspace.applyEdit(edit);

            doc = te.document;
            fullText2 = doc.getText();
            clog('after insert, len=' + fullText2.length);
            //vscode.window.showErrorMessage(ts_path+' '+'after insert, len='+fullText2.length +' '+Date.now());  


            /*
            panel.updateHTML = () => {
              panel.webview.html = te.document
                .getText()
                .replace(/((?:src|href)=['"])((?!http|\/).*?)(['"])/gim, (_, s, src, e) => {
                  const fpath = path.join(path.dirname(te.document.fileName), src);
                  const wvPath = panel.webview.asWebviewUri(vscode.Uri.file(fpath));
                  return [s, wvPath, `?ts=${Date.now()}`, e].join('');
                });
            };      
            */

            const fullRange = new vscode.Range(
              doc.positionAt(0, 0),
              doc.positionAt(fullText.length - 0)
            );
            fullText1 = fullText.replace('KEVIN-', 'KEVIN-' + ++count + ' ');
            clog('KEVIN- changed ' + count);

            //edit = new vscode.WorkspaceEdit();
            edit.replace(te.document.uri.path, fullRange, fullText1);
            vscode.workspace.applyEdit(edit);



            /*  
            panel.updateHTML = () => {
              panel.webview.html = te.document
                .getText()
                .replace(/((?:src|href)=['"])((?!http|\/).*?)(['"])/gim, (_, s, src, e) => {
                  const fpath = path.join(path.dirname(te.document.fileName), src);
                  const wvPath = panel.webview.asWebviewUri(vscode.Uri.file(fpath));
                  return [s, wvPath, `?ts=${Date.now()}`, e].join('');
                });
            };
            */

            clog('on message received Process end !!');
            //panel.dispose();
            //deactivate();
            return;
        }
      }, undefined, context.subscriptions);


      panel.updateHTML = () => {
        panel.webview.html = te.document
          .getText()
          .replace(/((?:src|href)=['"])((?!http|\/).*?)(['"])/gim, (_, s, src, e) => {
            const fpath = path.join(path.dirname(te.document.fileName), src);
            const wvPath = panel.webview.asWebviewUri(vscode.Uri.file(fpath));
            return [s, wvPath, `?ts=${Date.now()}`, e].join('');
          });
        clog('WebView panel updated !!');
      };

      panel.updateHTML();
      
      function clog(msg) {
        return console.log(Date.now() + ' ' + ts_path + ' : ' + msg);
      }


      //context.subscriptions.push(
        //  vscode.window.onDidChangeActiveTextEditor((event) => {    // works only (un)focus, close for all textEditorTabs
        //vscode.workspace.onDidChangeTextDocument((event) => {   // works for all textEditorDocs on window
        //ts_doc.onDidChangeTextDocument((event) => {   // Not Working
        //
        //

        //example - item.onDidChange(function(event) { console.log("Event happened: " + event); });
        //vscode.workspace.onDidChangeTextDocument(function(event) { console.log("Event happened: " + event); })


        vscode.workspace.onDidChangeTextDocument((event) => {   // works for all textEditorDocs on window
          //clog(event.contentChanges.length);
          //clog(event.document.fileName);
          //clog(event.document.fileName());  // Wrong XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
          if (ts_doc.fileName == event.document.fileName && event.contentChanges.length > 0) {
            fullText2 = ts_doc.getText();
            vscode.window.showInformationMessage(ts_path + ' len=' + fullText2.length + ' ' + Date.now());
            clog('Changed! len=' + fullText2.length);
            if (panel) panel.updateHTML();
            fs.appendFileSync('c:\\message.txt', ts_path + ' ' + 'Source Changed' + count + ' ' + Date.now() + '\n', function (err) {
              if (err) {
                clog('log appendError');
              }
              clog('log Saved!');
            });
          } else {
            // Single active editor. Editors have a `.document` property
            //clog(vscode.window.activeTextEditor);
            // All showing text editors. For a split view, there are two active editors 
            //clog(vscode.window.visibleTextEditors);
            // All open documents that vscode knows about. Do not have to be showing
            //clog(vscode.workspace.textDocuments);
          }

        })

      //);
      /*
          const subscriptions = [];
          subscriptions.push(vscode_1.window.onDidChangeVisibleTextEditors(system_1.Functions.debounce(this._onVisibleTextEditorsChanged, 100), this));
          subscriptions.push(vscode_1.window.onDidChangeTextEditorViewColumn(this._onTextEditorViewColumnChanged, this));
          subscriptions.push(vscode_1.workspace.onDidCloseTextDocument(this._onTextDocumentClosed, this));
          subscriptions.push(this.blameabilityTracker.onDidChange(this._onBlameabilityChanged, this));
          this._blameAnnotationsDisposable = vscode_1.Disposable.from(...subscriptions);
       */

    })
  );



  /* old but respond for all docs in workspace
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      var fullText2 = ts_doc.getText();
      vscode.window.showInformationMessage(ts_path+' len='+fullText2.length+' '+Date.now());
      clog('Changed! len='+fullText2.length);
      if (panel) panel.updateHTML();
    })
  );
  */

  //context.subscriptions.push(disposable);  

}
function deactivate() {
  vscode.window.showInformationMessage( 'deactivated ' + Date.now());
  vscode.workspace.onDidChangeTextDocument((event) => {   // works for all textEditorDocs on window
  //         clog('ignored');
    
  })
  console.log('deactivated');
}
exports.activate = activate;
exports.deactivate = deactivate;
//module.exports = {
//  activate,
//  deactivate
//}




// for later use
/*
export function createRandomFile(contents = '', dir: string = os.tmpdir()): Thenable<vscode.Uri> {
  return new Promise((resolve, reject) => {
    const tmpFile = join(dir, rndName());
    fs.writeFile(tmpFile, contents, (error) => {
      if (error) {
        return reject(error);
      }
 
      resolve(vscode.Uri.file(tmpFile));
    });
  });
}
 
export function pathEquals(path1: string, path2: string): boolean {
  if (process.platform !== 'linux') {
    path1 = path1.toLowerCase();
    path2 = path2.toLowerCase();
  }
 
  return path1 === path2;
}
 
export function deleteFile(file: vscode.Uri): Thenable<boolean> {
  return new Promise((resolve, reject) => {
    fs.unlink(file.fsPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
 
 
// In your webview script
const vscode = acquireVsCodeApi();
 
document.addEventListener('click', event => {
    let node = event && event.target;
    while (node) {
        if (node.tagName && node.tagName === 'A' && node.href) {
            // Handle click here by posting data back to VS Code
            // for your extension to handle
            vscode.postMessage({ ... });
            event.preventDefault();
            return;
        }
        node = node.parentNode;
    }
}, true);
 
 
 
 
*/


function closeAllEditors() {
  return vscode.commands.executeCommand('workbench.action.closeAllEditors');

}

