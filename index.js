const express = require('express')
const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");
const fs = require('fs');
const app = express()
const env = require('dotenv');
app.get('/', (req, res) => {
    res.send({message:"on the home page"})
})

app.get('/test' , (req, res) => {
    (async()=>{
        browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            args: ['--window-size=1920,1080'],
            defaultViewport: {
              width:1080,
              height:1920,
            }
          });
        let page = await browser.newPage();
        await page.setViewport({
            width: 1520,
            height: 720,
            deviceScaleFactor: 2,
        });
        const recorder = new PuppeteerScreenRecorder(page);
        await page.goto('https://65e6e13a8f1f1c75e28d875d--clinquant-begonia-b30443.netlify.app/');
        await recorder.start("video.mp4");
        await animate(page);
        await recorder.stop();
        await browser.close();
    })()
    
    const animate = async (page) => {
        await wait(15000);
        await page.evaluate(() => {
            window.scrollBy({ top: 500, left: 0, behavior: "smooth" });
        });
        await wait(15000);
        await page.evaluate(() => {
            window.scrollBy({ top: 1000, left: 0, behavior: "smooth" });
        });
        await wait(1000);
    };
    
    const wait = (ms) => new Promise((res) => setTimeout(res, ms));
    res.send({status:"done"})
})
let port = process.env.PORT
app.listen(port, ()=>{
    console.log('listening on port 3200')
})