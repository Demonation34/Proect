var pdfDoc = null,
pageNum = 3,
pageRend = false,
scale = 1.5,
pageNumP = null;

function renderPage(num, canvas){
    var ctx = canvas.getContext('2d')
    pageRend = true
    pdfDoc.getPage(num).then((page)=>{
        var viewport = page.getViewport({scale:scale});
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderCtx = {
            canvasContext: ctx,
            viewport: viewport
        }
        var renderTask = page.render(renderCtx)
        renderTask.promise.then(()=>{
            pageRend = false;
            if (pageNumP !== null){
                renderPage(pageNumP)
                pageNumP = null;
            }
        })
    })
}

pdfjsLib.getDocument('sample.pdf').promise.then((doc)=> {
    pdfDoc = doc;
    var 
    canvas1 = document.getElementById("canvas1"),
    canvas2 = document.getElementById("canvas2"),
    canvas3 = document.getElementById("canvas3");
    renderPage(pageNum, canvas1);
    renderPage(pageNum, canvas2);
    renderPage(pageNum, canvas3);
})