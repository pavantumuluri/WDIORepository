describe('Firs test suite',async()=>{

    xit('First test case ', async()=> {
   
        await browser.url("https://demoqa.com/droppable")
        const elem = await $('#draggable')
        const target = await $('#droppable')
        await elem.dragAndDrop(target)

    })

})